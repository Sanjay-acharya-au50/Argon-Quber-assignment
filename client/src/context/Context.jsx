import { createContext, useState } from "react";

 export  const  Context = createContext(null);

export function ContextProvider ({children}) {
    const [state,setState] = useState();
    const [edit,setEdit] = useState(false);
    const [NUser,setNUser] = useState()
    const [post,setPost] = useState()    

    const val = {state,setState,edit,setEdit,NUser,setNUser,post,setPost}  
    return(
        <>
            <Context.Provider value = {val}>

                    {children}

            </Context.Provider>
        </>
    )
}