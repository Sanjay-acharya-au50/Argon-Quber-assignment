import { createContext, useState } from "react";

 export  const  Context = createContext(null);

export function ContextProvider ({children}) {
    const [state,setState] = useState();
    const [edit,setEdit] = useState(false);
    const val = {state,setState,edit,setEdit}  
    return(
        <>
            <Context.Provider value = {val}>

                    {children}

            </Context.Provider>
        </>
    )
}