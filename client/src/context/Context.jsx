import { createContext, useState } from "react";

 export  const  Context = createContext(null);

export function ContextProvider ({children}) {
    const [state,setState] = useState();
    const [edit,setEdit] = useState(false);
    const [NUser,setNUser] = useState()
    const [post,setPost] = useState()    
    const [userProtect,setUserProtect] = useState()    

    const val = {state,setState,edit,setEdit,NUser,setNUser,post,setPost,userProtect,setUserProtect}  
    return(
        <>
            <Context.Provider value = {val}>

                    {children}

            </Context.Provider>
        </>
    )
}