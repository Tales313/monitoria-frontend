import {Box, Button, TextField} from "@mui/material"
import {Fragment, useEffect, useState} from "react";

const Login = () => {

    const [login, setLogin] = useState('')
    const [senha, setSenha] = useState('')

    const logar = (evento: React.FormEvent<HTMLFormElement>) => {
        evento.preventDefault()

        console.log('Logando com as credenciais\n' + login + '\n' + senha)

    }

    return (
        <Fragment>
            <Box component="form" sx={{width: '100%'}} onSubmit={logar}>
                <img src="/imagens/ifpb.png" alt="Logo do IFPB" />
                <TextField
                    value={login}
                    onChange={evento => setLogin(evento.target.value)}
                    label='Email'
                    variant='standard'
                    fullWidth
                    required
                />
                <TextField
                    value={senha}
                    onChange={evento => setSenha(evento.target.value)}
                    label='Senha'
                    variant='standard'
                    fullWidth
                    required
                />
                <Button sx={{marginTop: 1}} type='submit' fullWidth variant='outlined'>Login</Button>
            </Box>
        </Fragment>
    )
}

export default Login