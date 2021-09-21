import { createContext, useEffect, useState } from "react";
import { auth, db_firestore } from "../lib/firebase";

export const AuthContext = createContext({})

export function AuthProvider({children}) {
    const [ user, setUser ] = useState()

    useEffect(() => {

        auth.onAuthStateChanged( async (user) => {
            if(user) {
                const { uid } = user
    
                const userName = await db_firestore.collection('users').doc(uid).get()
    
                setUser({
                    uid: uid,
                    name: userName.data().userName
                })
            }
        })

    }, [])

    const logOut = ( ) => {
        try {
            auth.signOut()
            setUser(null)
            console.log('deslogado', user)
        } catch(error) {
            console.log(error)
        }
    }

    const singInEmailPassword = async (email, senha) => {
        try {
            const response = await auth.signInWithEmailAndPassword(email, senha)

            if(response.user) {
                const { uid } = response.user

                const userName = await db_firestore.collection('users').doc(uid).get()

                setUser({
                    uid: uid,
                    name: userName.data().userName
                })

                return {
                    sucess: true
                }
            }

        } catch ( error ) {

            if ( error.code === 'auth/user-not-found' ) {
                return {
                    code: 'email',
                    message: 'Usuário não encontrado!'
                }
            } else if ( error.code === 'auth/wrong-password') {
                return {
                    code: 'password',
                    message: 'Senha incorreta!'
                }
            }
        }
    }

    const createAcount = async (username, email, senha) => {

        try {
            const response = await auth.createUserWithEmailAndPassword(email, senha)
            console.log(response)

            if (response.user.uid) {
                const { uid } = response.user 

                await db_firestore.collection('users').doc(uid).set({userName: username})

                const userName = await db_firestore.collection('users').doc(uid).get()

                setUser({
                    uid: uid,
                    name: userName.data().userName
                })

                return {
                    sucess: true
                }
            } 
        } catch (erro) {
            console.log(erro)
            if (erro.code === 'auth/email-already-in-use') {
                return {
                    code: 'email' ,
                    message: 'Usuário existente!'
                }
            } else if (erro.code === 'auth/weak-password') {
                return {
                    code: 'senha' ,
                    message: 'Senha muito curta!'
                }
            }
        }
    }

    return (<AuthContext.Provider value={{singInEmailPassword, createAcount, logOut, user}}>
        {children}
    </AuthContext.Provider>)
}