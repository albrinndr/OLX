import { createContext, useState } from "react";
import 'firebase/storage'

export const FirebaseContext = createContext(null)

export const AuthContext = createContext(null)

export default function AuthContextProvider(props) {
    const [user, setUser] = useState(null)
    return (
        <AuthContext.Provider value={{ user, setUser }}>
            {props.children}
        </AuthContext.Provider>
    )
}