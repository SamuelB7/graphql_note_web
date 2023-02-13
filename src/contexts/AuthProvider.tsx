import React, { useEffect } from "react";
import { useCookies } from "react-cookie";
import { AuthContext } from "./AuthContext";
import { useRouter } from "next/router";
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [cookie, setCookie, removeCookie] = useCookies(["jwt"]);
  const [accessToken, setAccessToken] = React.useState<string | null>(
    cookie?.jwt
  );

  const router = useRouter();

  useEffect(() => {
    if (!accessToken) {
      router.push("/");
    }
  }, [accessToken]);

  const logIn = (token: string) => {
    setCookie("jwt", token, { path: "/" });
    setAccessToken(token);
  };

  const logOut = () => {
    removeCookie("jwt", { path: "/" });
    setAccessToken(null);
  };

  return (
    <AuthContext.Provider
      value={{
        accessToken,
        logIn,
        logOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
