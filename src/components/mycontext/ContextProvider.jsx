import { ThemeProvider } from './ThemeContext';
import { AuthProvider } from './AuthContext';

export const AppProviders = ({ children }) => {
  return (
    <ThemeProvider>
      <AuthProvider>
        {children}
      </AuthProvider>
    </ThemeProvider>
  );
};


