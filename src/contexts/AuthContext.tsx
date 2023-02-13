import { createContext, useContext } from "react";

interface AuthContext {
  accessToken?: string | null;
  logIn: (token: string) => void;
  logOut: () => void;
}

export const AuthContext = createContext<AuthContext>({
  accessToken: null,
  logIn: () => null,
  logOut: () => null,
});

export const useAuthContext = () => useContext(AuthContext);
