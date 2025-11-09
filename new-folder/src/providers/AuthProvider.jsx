import { useContext } from "react";
import { useState } from "react";
import { createContext } from "react";

// step 1: create empty context
export const AuthContext = createContext({})

// step 2: context provider to provide context to all its children
function AuthProvider(props) {
    const [user, setUser] = useState()
    return <AuthContext.Provider value={{user, setUser}}>
        {props.children}
    </AuthContext.Provider>
}

export default AuthProvider

// step 3: use the context wherever required (custom hook)
export function useAuth() {
    const auth = useContext(AuthContext)
    return auth
}

