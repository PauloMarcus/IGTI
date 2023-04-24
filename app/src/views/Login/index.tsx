import { Box, Button, Container, TextField } from "@material-ui/core";
import React, { FormEvent } from "react";
import { IUser, signInEndpoint } from "../../backend";
import { useNavigate } from "react-router-dom";

type Props = {
    user: (user: IUser) => void
}

export default function Login({ user }: Props) {

    const [email, setEmail] = React.useState('danilo@email.com')
    const [password, setPassword] = React.useState('1234')
    const [error, setError] = React.useState('')

    async function Auth(email: string, password: string, event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        signInEndpoint(email, password).then((x) => user(x), () => setError('Usuário ou senha não identificados'))

    }

    return (
        <><form onSubmit={(e) => Auth(email, password, e)}>
            <Container maxWidth='sm'>
                <h1>Faça o login para acessar</h1>
                <TextField
                    autoFocus
                    margin="normal"
                    id="date"
                    type="text"
                    label="Email"
                    fullWidth
                    variant="outlined"
                    value={email}
                    onChange={(x) => setEmail(x.target.value)}
                />
                <TextField
                    autoFocus
                    margin="normal"
                    id="date"
                    type="password"
                    label="Senha"
                    fullWidth
                    value={password}
                    variant="outlined"
                    onChange={(x) => setPassword(x.target.value)}

                />
                {error && (<p style={{color: 'red', }}>{error}</p> )}
            <Box style={{ display: 'flex', justifyContent: 'end' }}>
                <Button variant="contained" type="submit" color="primary">Login</Button>
            </Box>
            </Container>
        </form>
        </>
    )
}