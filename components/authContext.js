import { createContext , useEffect, useState } from "react"; 
import netlifyidentity from 'netlify-identity-widget';

export const authContext = createContext()

const  AuthProvdier=({children})=>{

    const [user, setUser] = useState(null)
    const [AuthReady , setAuthReady] = useState(false)

    useEffect(()=>{

        netlifyidentity.on('init' , (user)=>{
            setUser(user)
            setAuthReady(true)
        })
        
        netlifyidentity.init()

        

        netlifyidentity.on('login', (user)=>{
            setUser(user)
        })
        netlifyidentity.on('logout', ()=>{
            setUser(null)
            console.log('logout event')
        })
        netlifyidentity.close()
        
        return ()=>{
            netlifyidentity.off('login')
            netlifyidentity.off('logout')
        }
    },[])

    const login =()=>{
        netlifyidentity.open()
    }

    const context = {user , login , AuthReady}

    return (
        <authContext.Provider value={context}>
            {children}
        </authContext.Provider>
    );
}

export default AuthProvdier;