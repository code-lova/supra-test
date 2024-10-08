import { createContext, useContext, useState, useEffect } from "react";
import { getCurrentUser } from "../lib/appwrite";

const GlobalContext = createContext()
export const useGlobalContext = () => useContext(GlobalContext);

export const GlobalProvider = ({ children }) => {

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        (async () => {
            try {
                const res = await getCurrentUser();
                if (res) {
                    setIsLoggedIn(true);
                    setUser(res);
                } else {
                    setIsLoggedIn(false);
                    setUser(null);
                }
            } catch (error) {
                console.log('Error fetching user:', error);
                setIsLoggedIn(false);
                setUser(null);
            } finally {
                setIsLoading(false);
            }
        })();
    }, []);
    

    return (
        <GlobalContext.Provider
            value={{ 
                isLoggedIn,
                setIsLoggedIn,
                user,
                setUser,
                isLoading,
             }}
        >
            { children  }
        </GlobalContext.Provider>
    )
}