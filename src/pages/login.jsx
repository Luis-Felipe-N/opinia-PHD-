import Head from 'next/head'
import Link from 'next/link'
import Router from 'next/router'

import Sing from '../components/Sing'
import { Button } from '../components/Button'
import {  useState } from "react";
import useAuth from '../hooks/useAuth'


export default function Login() {
    const [ email, setEmail ] = useState()
    const [ senha, setSenha ] = useState()
    const [ errorEmail, setErrorEmail ] = useState()
    const [ errorSenha, setErrorSenha ] = useState()
    const [ loading, setLoaging ] = useState()


    const {singInEmailPassword} = useAuth()

    async function handleSingIn(e) {
        e.preventDefault()

        setLoaging(true)
        if (senha.lenght < 6) {
            setErrorSenha('Senha muito curta!')
            setLoaging(false)
            return
        }
        const response = await singInEmailPassword(email, senha)
        
        if ( response.sucess ) {
            Router.push('/')
            return
        } else {
            if( response.code === 'password' ) {
                setErrorSenha(response.message)
                setLoaging(false)
                return
            }

            if( response.code === 'email' ) {
                setErrorEmail(response.message)
                setLoaging(false)
                return
            }
        }

        setLoaging(false)

    }


    return (
       <Sing>
           <Head>
                <title>
                    BlogTech | Login
                </title>
           </Head>
           <h1>Entrar</h1>
            <form onSubmit={handleSingIn}>
                <label>
                    Email: 
                    <input
                        className={errorEmail && 'errorInput'}
                        onChange={({target})=>{
                        setEmail(target.value)
                        setErrorEmail('')
                        }
                        }
                        value={email}
                        placeholder="email@gmail.com"
                        type="email"
                    />
                    {errorEmail && <span className="errorText">{errorEmail}</span>}
                </label>

                <label>
                    Senha: 
                    <input
                    className={errorSenha && 'errorInput'}
                        onChange={({target})=>{
                            setSenha(target.value)
                            setErrorSenha('')
                        }} 
                        value={senha} 
                        placeholder="Senha123" 
                        type="password"
                    />
                    {errorSenha && <span className="errorText">{errorSenha}</span>}
                </label>
                <Button>{loading ? 'Carregando...' : 'Entrar'}</Button>
                <p>Não tem uma conta?<Link href="/singup"> Cadastre-se</Link></p>
            </form>
       </Sing>
    )
}