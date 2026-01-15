import { createContext } from "react";

interface AuthContextType {
    username: String,
    setUsername: (username: String) => void,
}
export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
    return (
        <AuthContext.Provider value={{
            username: "",
            setUsername: () => { }
        }}>
            {children}
        </AuthContext.Provider>
    );
};