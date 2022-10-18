import {Navigate} from "react-router-dom";
import {useAuth} from "../../Contexts/AuthContext";
import IVaga from "../../Interfaces/IVaga";
import {useEffect, useState} from "react";
import http from "../../Http";
import IEdital from "../../Interfaces/IEdital";
import styles from './ListarVagas.module.scss';
import {
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow, TextField
} from "@mui/material";

const ListarVagas = () => {

    const { user, token } = useAuth()
    const [edital, setEdital] = useState<IEdital>()
    const [vagas, setVagas] = useState<IVaga[]>([])
    const [idVaga, setIdVaga] = useState<Number>()
    const [notaDisciplina, setNotaDisciplina] = useState<String>()
    const [cre, setCre] = useState<String>()

    useEffect(() => {
        http().get('/editais/ativo', token)
            .then(respostaEdital => {
                setEdital(respostaEdital.data)
                http().get('/vagas/' + respostaEdital.data.id, token)
                    .then(respostaVagas => {
                        setVagas(respostaVagas.data)
                    }).catch(erro => {
                        console.log(erro)
                    })
            }).catch(erro => {
                console.log(erro)
            })
    }, [])

    const selecionarDisciplina = (idVaga: number) => {
        let vagas = Array.from(document.getElementsByClassName(styles.vaga) as HTMLCollectionOf<HTMLElement>)
        vagas.forEach(vaga => vaga.style.backgroundColor = 'white')

        let vaga = document.getElementById('vaga-' + idVaga);
        if(vaga)
            vaga.style.backgroundColor = '#2e9d46'

        setIdVaga(idVaga)
    }

    const inscrever = () => {
        const body = {
            opcao: 1,
            notaDisciplina,
            cre,
            idVaga,
        }
        http().post('/inscricoes', token, body)
            .then(resposta => {
                alert('Inscrito com sucesso')
            }).catch(erro => {
                console.log(erro)
            })
    }

    if (!user || !token) {
        return <Navigate replace to="/"/>
    } else {
        return (
            <>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>DISCIPLINA</TableCell>
                                <TableCell>PERIODO</TableCell>
                                <TableCell>QTD DE VAGAS</TableCell>
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

                <TextField
                    value={notaDisciplina}
                    onChange={evento => setNotaDisciplina(evento.target.value)}
                    label='Nota na Disciplina'
                    variant='standard'
                    required
                    type='number'
                />

                <TextField
                    value={cre}
                    onChange={evento => setCre(evento.target.value)}
                    label='CRE do Aluno'
                    variant='standard'
                    required
                    type='number'
                />

                <Button variant='contained' onClick={inscrever} >Inscrever-se</Button>
            </>
        );
    }
};

export default ListarVagas;