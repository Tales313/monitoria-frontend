import React, {createContext, ReactNode, useCallback, useState, useContext} from 'react'
import http from "../http";

type UserContextProps = {
    children: ReactNode;
};

interface User {
    login: string;
}

interface AuthState {
    token: string;
    user: User;
}

interface SignInCredentials {
    login: string;
    senha: string;
}

interface AuthContextData {
    user: User;
    token: string;
    signIn(credentials: SignInCredentials): Promise<void>;
    signOut(): void;
}

export const AuthContext = createContext<AuthContextData>(
    {} as AuthContextData,
);

//Componente Provider para passar os valores para os Childrens
export const AuthContextProvider = ({children}: UserContextProps) => {
    const [data, setData] = useState<AuthState>(() => {
        const token = localStorage.getItem('@Monitoria:token');
        const user = localStorage.getItem('@Monitoria:user');

        if (token && user) {
            return { token, user: JSON.parse(user) };
        }
        return {} as AuthState;
    });

    const signIn = useCallback(async ({ login, senha }: SignInCredentials) => {
        await http
            .post('/auth', {
                login,
                senha,
            })
            .then(response => {
                const { token } = response.data;
                const user = {login};
                localStorage.setItem('@Monitoria:token', token);
                localStorage.setItem('@Monitoria:user', JSON.stringify(user));
                setData({ token, user });
            })
            .catch(err => {
                console.log(err.response.data);
            });
    }, []);

    const signOut = useCallback(() => {
        localStorage.removeItem('@Monitoria:token');
        localStorage.removeItem('@Monitoria:user');
        setData({} as AuthState);
    }, []);

    return (
        <AuthContext.Provider
            value={{
                user: data.user,
                token: data.token,
                signIn,
                signOut
            }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth(): AuthContextData {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }

    return context;
}