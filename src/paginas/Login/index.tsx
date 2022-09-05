import {
    Avatar,
    Box,
    Button,
    Checkbox,
    Container,
    CssBaseline,
    FormControlLabel,
    Grid,
    Link,
    TextField,
    Typography
} from "@mui/material"
import {Fragment, useState} from "react";
import http from "../../http";
import { createTheme, ThemeProvider } from '@mui/material/styles';

const Login = () => {

    const [login, setLogin] = useState('')
    const [senha, setSenha] = useState('')

    const logar = (evento: React.FormEvent<HTMLFormElement>) => {
        evento.preventDefault()

        http.post('/auth', {login, senha})
            .then(resposta => {
                console.log('Tipo: ' + resposta.data.tipo)
                console.log('Token: ' + resposta.data.token)
            }).catch(erro => {
                console.log('ERRO')
                console.log(erro)
            })
    }

    const theme = createTheme();

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <img src="/imagens/ifpb.png" alt="Logo do IFPB" />
                    <Typography mt={5} sx={{'font-weight': 'bold'}}>Acesso ao sistema de monitoria do IFPB</Typography>
                    <Box component="form" onSubmit={logar} noValidate sx={{ mt: 3 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email"
                            onChange={evento => setLogin(evento.target.value)}
                            name="login"
                            value={login}
                            autoComplete="email"
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="password"
                            label="Senha"
                            onChange={evento => setSenha(evento.target.value)}
                            name="senha"
                            value={senha}
                            type="password"
                            autoComplete="current-password"
                        />
                        {/*<FormControlLabel*/}
                        {/*    control={<Checkbox value="remember" color="primary" />}*/}
                        {/*    label="Remember me"*/}
                        {/*/>*/}
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Login
                        </Button>
                        {/*<Grid container>*/}
                        {/*    <Grid item xs>*/}
                        {/*        <Link href="#" variant="body2">*/}
                        {/*            Esqueci minha senha*/}
                        {/*        </Link>*/}
                        {/*    </Grid>*/}
                        {/*    <Grid item>*/}
                        {/*        <Link href="#" variant="body2">*/}
                        {/*            {"Cadastre-se"}*/}
                        {/*        </Link>*/}
                        {/*    </Grid>*/}
                        {/*</Grid>*/}
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );

}

export default Login