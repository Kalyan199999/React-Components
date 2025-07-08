import { createContext, useContext, useState, useEffect } from "react";

// Create the context
export const AuthContext = createContext();

// AuthProvider component
export const AuthProvider = ({ children }) => 
{
  const [user, setUser] = useState({ name:'', email:'', password:'' });

  // On mount, load from localStorage
  useEffect(() => 
    {
        const storedUser = JSON.parse( localStorage.getItem("authUser") );
        if (storedUser) setUser(storedUser);
  }, 

  []);

  // Login method
  const login = ({ name, email, password }) => {
    const userData = { name, email, password };
    localStorage.setItem("authUser", JSON.stringify(userData));
    setUser(userData);
  };

  // Logout method
  const logout = () => {
    localStorage.removeItem("authUser");
    setUser({ name:'', email:'', password:''});
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook
const useAuth = () => useContext(AuthContext);

export default useAuth;