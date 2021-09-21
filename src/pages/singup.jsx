import { useState } from 'react'

import Head from 'next/head'
import Link from 'next/link'

import Sing from '../components/Sing'
import { Button } from '../components/Button'
import useAuth from '../hooks/useAuth'
import Router from 'next/router'


export default function Singup() {
    const [ email, setEmail ] = useState()
    const [ senha, setSenha ] = useState()
    const [ userName, setUserName ] = useState()
    const [ errorEmail, setErrorEmail ] = useState()
    const [ errorSenha, setErrorSenha ] = useState()
    const [ loading, setLoaging ] = useState()
    
    const {createAcount} = useAuth()

    async function handleCreatAcount(e) {
        e.preventDefault()
        setLoaging(true)

        const response = await createAcount(userName, email, senha)
        console.log(response)

        if ( !response?.code ) {
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
                    BlogTech | Cadastrar
                </title>
           </Head>
           <h1>Cadastrar-se</h1>
            <form onSubmit={handleCreatAcount}>
                <label>
                    Nome: 
                    <input
                        onChange={({target})=>setUserName(target.value)} 
                        value={userName}
                        placeholder="Luis"
                        type="text"
                    />
                </label>
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
                <Button>{loading ? 'Caregando...' : 'Cadastrar'}</Button>
                <p>Já tem uma conta?<Link href="/login"> Faça login.</Link></p>
            </form>
       </Sing>
    )
}