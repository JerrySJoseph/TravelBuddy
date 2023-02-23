import React, { createContext, useContext, useState } from "react";
import { generateDummyUser } from "../../Utils/generateUser";
import User, { UserOverride } from "../models/user";
import {useTimeout} from 'usehooks-ts'

interface IAppContext{
    currentUser:User,
    updateUser:(user:User)=>any,
    updateUserAsync:(user:User)=>Promise<any>
}

const defaultAppContext:IAppContext={
    currentUser:generateDummyUser(),
    updateUser(user) {
        
    },
    updateUserAsync(user) {
        return Promise.resolve();
    },
}

const AppContext=createContext<IAppContext>(defaultAppContext)

interface IAppContextProviderProps{
    children?:React.ReactNode
    [key:string]:any
}

const AppContextProvider=({children}:IAppContextProviderProps)=>{

    const [currentUser,setcurrentUser]=useState(generateDummyUser());

    const value:IAppContext={
        currentUser,
        updateUser:setcurrentUser,
        updateUserAsync:async(user)=>{
            const timeout=setTimeout(()=>{
                setcurrentUser(user);
                clearTimeout(timeout);
            },2000);
        }
    }



    return <AppContext.Provider value={value}>
        {children}
    </AppContext.Provider>
}

export default AppContextProvider;

export const useAppContext=()=>useContext(AppContext);