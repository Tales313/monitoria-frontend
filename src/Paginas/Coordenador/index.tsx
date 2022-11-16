import Menu from "../../Componentes/Menu";
import {Box, Button, Container, TextField} from "@mui/material";
import {useEffect, useState} from "react";
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {DesktopDatePicker} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import styles from './Coordenador.module.scss'
import {Dayjs} from "dayjs";
import IEdital from "../../Interfaces/IEdital";
import {useAuth} from "../../Contexts/AuthContext";
import {useNavigate} from "react-router-dom";
import {getEditalAtivo, postEdital, postVaga} from "../../Http";
import IEditalResponse from "../../Interfaces/IEditalResponse";
import IEditalRequest from "../../Interfaces/IEditalRequest";
import IVagaRequest from "../../Interfaces/IVagaRequest";

const Coordenador = () => {

    const {token} = useAuth()
    const navigate = useNavigate()

    const [semestreEdital, setSemestreEdital] = useState<string>('')
    const [inicioInscricoesEdital, setInicioInscricoesEdital] = useState<Dayjs | null>()
    const [fimInscricoesEdital, setFimInscricoesEdital] = useState<Dayjs | null>()

    const [disciplinaVaga, setDisciplinaVaga] = useState<string>('')
    const [periodoVaga, setPeriodoVaga] = useState<string>('')
    const [quantidadeVaga, setQuantidadeVaga] = useState<string>()

    const [edital, setEdital] = useState<IEdital>()

    const procedimentoDeErro = (e: any) => {
        if (e.response.data.status === 500) {
            alert("Erro desconhecido, entre em contato com o Administrador ou tente novamente")
            navigate("/")
        } else
            alert(e.response.data.message)
    }

    const submeterNovoEdital = async (evento: React.FormEvent<HTMLFormElement>) => {
        evento.preventDefault()

        const body: IEditalRequest = {
            semestre: semestreEdital,
            inicioInscricoes: inicioInscricoesEdital!.toDate(),
            fimInscricoes: fimInscricoesEdital!.toDate()
        }
        try {
            const response = await postEdital(token, body)
            alert('Edital cadastrado com sucesso')
        } catch (e: any) {
            alert(e.response.data.message)
            return
        }
    }

    const submeterNovaVaga = async (evento: React.FormEvent<HTMLFormElement>) => {
        evento.preventDefault()

        const body: IVagaRequest = {
            disciplina: disciplinaVaga,
            periodo: periodoVaga,
            quantidade: Number.parseInt(quantidadeVaga!),
            editalId: edital!.id
        }
        try {
            const response = await postVaga(token, body)
            alert('Vaga cadastrada com sucesso')
        } catch (e: any) {
            alert(e.response.data.message)
            return
        }
    }

    useEffect(() => {
        const chamarEditalAtivo = async () => {
            try {
                const respostaEdital = await getEditalAtivo(token)
                setEdital(respostaEdital.data)
            } catch (e: any) {
                procedimentoDeErro(e)
            }
        }

        chamarEditalAtivo()
    }, [])

    return (
        <>
            <Menu/>
            <Container component="main" maxWidth="lg" className={styles.container}>
                <Box className={styles.box} component="form" onSubmit={submeterNovoEdital} noValidate>
                    <h2>Cadastro de Edital</h2>
                    <TextField
                        className={styles.campo}
                        margin="normal"
                        value={semestreEdital}
                        onChange={evento => setSemestreEdital(evento.target.value)}
                        label='Semestre do Edital (ex.: 2023.1)'
                        required
                    />
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DesktopDatePicker
                            className={styles.campo}
                            label="Inicio das inscrições"
                            inputFormat="MM/DD/YYYY"
                            value={inicioInscricoesEdital}
                            onChange={data => setInicioInscricoesEdital(data)}
                            renderInput={(params) => <TextField {...params} />}
                        />
                        <DesktopDatePicker
                            className={styles.campo}
                            label="Fim das inscrições"
                            inputFormat="MM/DD/YYYY"
                            value={fimInscricoesEdital}
                            onChange={data => setFimInscricoesEdital(data)}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </LocalizationProvider>
                    <Button type="submit" variant="contained" sx={{width: '130px'}}>Criar Edital</Button>
                </Box>

                <Box className={styles.box} component="form" onSubmit={submeterNovaVaga} noValidate>
                    <h2>Cadastro de Vaga</h2>
                    <TextField
                        className={styles.campo}
                        value={disciplinaVaga}
                        onChange={evento => setDisciplinaVaga(evento.target.value)}
                        label='Nome da Disciplina'
                        required
                    />
                    <TextField
                        className={styles.campo}
                        value={periodoVaga}
                        type={"number"}
                        onChange={evento => setPeriodoVaga(evento.target.value)}
                        label='Número do período da disciplina'
                        required
                    />
                    <TextField
                        className={styles.campo}
                        value={quantidadeVaga}
                        type={"number"}
                        onChange={evento => setQuantidadeVaga(evento.target.value)}
                        label='Quantidade de vagas'
                        required
                    />
                    <h4>Essa vaga será relacionada ao edital ativo: {edital?.semestre}</h4>
                    <Button type="submit" variant="contained" sx={{width: '130px'}}>Criar Vaga</Button>
                </Box>
            </Container>
        </>
    )
}

export default Coordenador