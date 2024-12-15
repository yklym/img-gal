import { createContext, useContext, useMemo, useState } from "react";

interface IAuthContext {
  isAuthenticated: boolean;
  username: string | null;
  isLoading: boolean;
  onLogin: (username: string, password: string) => void;
  onLogout: () => void;
}

const INITIAL_STATE: IAuthContext = {
  isAuthenticated: false,
  username: null,
  isLoading: false,
  onLogin: () => {},
  onLogout: () => {},
};

const AuthContext = createContext<IAuthContext>(INITIAL_STATE);

export const AuthContextWrapper = ({ children }: { children: JSX.Element }) => {
  const [isAuthenticated, setAuthenticated] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [username, setUsername] = useState<string | null>(null);

  const onLogin = (username: string, password: string) => {
    setLoading(true);
    //

    setTimeout(() => {
      setLoading(false);
      setAuthenticated(true);
      setUsername(username);
    }, 1500);
  };

  const onLogout = () => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setAuthenticated(false);
      setUsername(null);
    }, 1500);
  };

  const ctxValue = useMemo<IAuthContext>(
    () => ({
      isAuthenticated,
      username,
      isLoading,
      onLogin,
      onLogout,
    }),
    [isAuthenticated, username, isLoading]
  );

  return (
    <AuthContext.Provider value={ctxValue}>{children}</AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
