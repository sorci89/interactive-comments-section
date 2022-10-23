import React from 'react'
import { useContext, createContext, useState, useEffect } from "react";
import axios from 'axios'
import jwt from "jwt-decode"


const AuthContext = createContext();

const AuthProvider = ({children}) => {
    const [token, setToken] = useState(null)
    const [user, setUser] = useState(null)


    const login = async(code, provider, type) => {
        try{
            const response = await axios.post(`http://localhost:4000/api/user/login/${type}`, {
                code,
                provider
            })
            setToken(response.data.token)
            localStorage.setItem("token", response.data.token)
            setUser(jwt(response.data.token));
        } catch(error) {
            localStorage.removeItem("token")
            setToken(null)
            setUser(null)
        }
    }
    
    const logout = ()=>{
        localStorage.removeItem("token")
        setToken(null)
        setUser(null)
    };
    
    const signup = async(username, password)=> {
        const response = await axios.post("http://localhost:4000/api/users/signup", {
           username, password
        });

        if (response?.status === 200) {
            setToken(response.data.token)
            localStorage.setItem("token", response.data.token)
            setUser(jwt(response.data.token));
        }
    }

    const contextValue = {token, logout, login, user, signup};

    useEffect(() => {
        const tokenInStorage = localStorage.getItem("token")
        if (tokenInStorage) {
            setToken(tokenInStorage)
            setUser(jwt(tokenInStorage))
        }
    }, [])    

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
  )
}

const useAuth = () => {
    const context = useContext(AuthContext);
    if(!context) throw new Error("Add AuthProvider to root")
return context


}

export {AuthProvider,useAuth}