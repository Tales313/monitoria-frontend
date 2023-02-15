import Menu from "../../Componentes/Menu";
import {Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography} from "@mui/material";
import {useEffect, useState} from "react";
import IEdital from "../../Interfaces/IEdital";
import {getEditalAtivo, getResultados} from "../../Http";
import {useAuth} from "../../Contexts/AuthContext";
import {useNavigate} from "react-router-dom";
import IResultado from "../../Interfaces/IResultado";

const Resultados = () => {

    const {token} = useAuth()
    const navigate = useNavigate()

    const [edital, setEdital] = useState<IEdital>()
    const [inscricoes, setInscricoes] = useState<IResultado[]>([])

    const procedimentoDeErro = (e: any) => {
        if (e.response.data.status === 500) {
            alert("Erro desconhecido, entre em contato com o Administrador ou tente novamente")
            navigate("/")
        } else
            alert(e.response.data.message)
    }

    useEffect(() => {

        const chamarEditalEResultados = async () => {
            try {
                const respostaEdital = await getEditalAtivo(token)
                setEdital(respostaEdital.data)

                const respostaResultados = await getResultados(token, respostaEdital.data.id)
                setInscricoes(respostaResultados.data)
            } catch (e: any) {
                procedimentoDeErro(e)
            }
        }

        chamarEditalEResultados()
    })

    const definirCorDaLinha = (resultado: string) => {
        let cor = '#EEE' // cinza = nao classificado

        if(resultado === 'CLASSIFICADO')
            cor = '#72BF44' // verde

        if(resultado === 'IMPEDIDO')
            cor = '#FFF200' // amarelo

        return cor
    }

    const renderizarResultado = (resultado: string) => {
        let resultadoRender = 'Não classificado'

        if(resultado === 'CLASSIFICADO')
            resultadoRender = 'Classificado'

        if(resultado === 'IMPEDIDO')
            resultadoRender = 'Impedido por se classificar em 1ª opção'

        return resultadoRender
    }

    return (
        <>
            <Menu />
            <Typography sx={{fontWeight: 'bold', textAlign: 'center', mb: 5, mt: 5}}>
                RESULTADO FINAL PARA O EDITAL {edital?.semestre}
            </Typography>
            <Container component="main" maxWidth="xl">
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Nome</TableCell>
                                <TableCell>Nota</TableCell>
                                <TableCell>CRE</TableCell>
                                <TableCell>Média</TableCell>
                                <TableCell>Disciplina</TableCell>
                                <TableCell>Opção</TableCell>
                                <TableCell>Resultado</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {inscricoes.map((item, index) =>
                                <TableRow
                                    id={'inscricao-'+index}
                                    sx={{backgroundColor: definirCorDaLinha(item.resultado)}}
                                    key={index}>
                                    <TableCell>{item.nomeAluno}</TableCell>
                                    <TableCell>{item.nota}</TableCell>
                                    <TableCell>{item.cre}</TableCell>
                                    <TableCell>{item.media}</TableCell>
                                    <TableCell>{item.disciplina}</TableCell>
                                    <TableCell>{item.opcao}</TableCell>
                                    <TableCell>{renderizarResultado(item.resultado)}</TableCell>
                                </TableRow>)}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Container>
        </>
    )
}

export default Resultados