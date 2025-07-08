// import the Context packges
import { createContext, useContext, useState } from "react";

// create the context
const ThemeContext = createContext();

// create the context provider
export const ThemeProvider = ({ children }) => 
{
    const [ theme,setTheme ] = useState("light");

    const toggleTheme = ()=>{
        setTheme( (prevTheme) => (prevTheme === "light" ? "dark" : "light") );
    }

    return(
        <ThemeContext.Provider value={
            { theme, toggleTheme }
        }>
            {children}
        </ThemeContext.Provider>
    )
}

const useTheme = () => useContext(ThemeContext); // create the custom hook

export default useTheme;