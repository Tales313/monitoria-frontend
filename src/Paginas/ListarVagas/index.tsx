import {Navigate, useNavigate} from "react-router-dom";
import {useAuth} from "../../Contexts/AuthContext";
import IVaga from "../../Interfaces/IVaga";
import {useEffect, useState} from "react";
import http from "../../Http";
import IEdital from "../../Interfaces/IEdital";
import styles from './ListarVagas.module.scss';
import ReactCSSTransitionGroup from 'react-transition-group'; // ES6
import {
    Box,
    Button, Container, CssBaseline,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow, TextField
} from "@mui/material";
import {createTheme, ThemeProvider} from "@mui/material/styles";

const ListarVagas = () => {

    const { user, token } = useAuth()
    const [edital, setEdital] = useState<IEdital>()
    const [vagas, setVagas] = useState<IVaga[]>([])
    const [idVaga, setIdVaga] = useState<Number>()
    const [notaDisciplina, setNotaDisciplina] = useState<String>()
    const [cre, setCre] = useState<String>()
    const [proximaOpcao, setProximaOpcao] = useState<Number>()
    const navigate = useNavigate()

    useEffect(() => {

        const chamarEndpointProximaOpcao = async () => {
            const resposta = await http().get('/inscricoes/proxima_opcao', token)
            setProximaOpcao(resposta.data.opcao)
        }

        const chamarEditalEVagas = async () => {
            const respostaEdital = await http().get('/editais/ativo', token)
            const respostaVagas = await http().get('/vagas/' + respostaEdital.data.id, token)
            setEdital(respostaEdital.data)
            setVagas(respostaVagas.data)
        }

        chamarEndpointProximaOpcao()
        chamarEditalEVagas()

    }, [])

    const selecionarDisciplina = (idVaga: number) => {
        let vagas = Array.from(document.getElementsByClassName(styles.vaga) as HTMLCollectionOf<HTMLElement>)
        vagas.forEach(vaga => vaga.style.backgroundColor = 'white')

        let vaga = document.getElementById('vaga-' + idVaga);
        if(vaga)
            vaga.style.backgroundColor = '#2e9d46'

        setIdVaga(idVaga)
    }

    const inscrever = async (evento: React.FormEvent<HTMLFormElement>) => {
        evento.preventDefault()
        if(!idVaga) {
            alert('Escolha uma vaga para se inscrever')
            return
        }
        const body = {
            opcao: proximaOpcao,
            notaDisciplina,
            cre,
            idVaga,
        }

        const respostaInscricao = await http().post('/inscricoes', token, body)
        if(respostaInscricao.data.opcao === 1)
            alert('Inscrito na primeira opção com sucesso')
        else
            alert('Inscrito na segunda opção com sucesso')

        const respostaProximaOpcao = await http().get('/inscricoes/proxima_opcao', token)
        setProximaOpcao(respostaProximaOpcao.data.opcao)

        let vagas = Array.from(document.getElementsByClassName(styles.vaga) as HTMLCollectionOf<HTMLElement>)
        if(respostaProximaOpcao.data.opcao === -1) {
            let botao = document.getElementById('botaoSubmit') as HTMLButtonElement
            if (botao) {
                botao.remove()
                botao.classList.add(styles.botaoDesabilitado)
            }
            vagas.forEach(vaga => {
                vaga.classList.remove(styles.vaga)
                vaga.classList.add(styles.vagaFim)
            })
        } else {
            vagas.forEach(vaga => vaga.style.backgroundColor = 'white')
            setIdVaga(NaN)
        }
    }

    if (!user || !token) {
        return <Navigate replace to="/"/>
    } else if (proximaOpcao === -1) {
        return (
            <>
                <p>voce ja se inscreveu nas duas opções</p>
            </>
        )
    } else {
        return (
            <Container component="main" maxWidth="md">
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>DISCIPLINA</TableCell>
                                <TableCell>PERIODO</TableCell>
                                <TableCell>VAGAS</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {vagas.map(item =>
                                <TableRow id={'vaga-'+item.id} className={styles.vaga} key={item.id} onClick={() => selecionarDisciplina(item.id)}>
                                    <TableCell>{item.disciplina}</TableCell>
                                    <TableCell>{item.periodo}</TableCell>
                                    <TableCell>{item.quantidade}</TableCell>
                                </TableRow>)}
                        </TableBody>
                    </Table>
                </TableContainer>

                <Box component="form" onSubmit={inscrever} noValidate sx={{
                    height: 250,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-evenly',
                    alignItems: 'flex-start',
                }}>
                    <TextField
                        margin="normal"
                        value={notaDisciplina}
                        onChange={evento => setNotaDisciplina(evento.target.value)}
                        label='Nota na Disciplina'
                        required
                    />

                    <TextField
                        margin="normal"
                        value={cre}
                        onChange={evento => setCre(evento.target.value)}
                        label='CRE do Aluno'
                        required
                    />

                    <Button
                        type="submit"
                        sx={{alignSelf: 'center'}}
                        id='botaoSubmit'
                        variant='contained'
                        size='large'
                    >Inscrever-se</Button>
                </Box>
            </Container>
        );
    }
};

export default ListarVagas;