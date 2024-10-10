import { useContext, createContext, useState, useEffect } from "react";
import type { AuthResponse, User } from "../types/types";
import requestNewAccessToken from "./requestNewAccessToken";
//import { API_URL } from "./authConstants";
import useInactivityTimeout from '../hooks/useInactivityTimeout';

const AuthContext = createContext({
  isAuthenticated: false,
  getAccessToken: () => {},
  setAccessTokenAndRefreshToken: (
    _accessToken: string,
    _refreshToken: string
  ) => {},
  getRefreshToken: () => {},
  saveUser: (_userData: AuthResponse) => {},
  getUser: () => ({} as User | undefined),
  setUser: (_user: User) => {},
  signout: () => {},
});

interface AuthProviderProps {
  children: React.ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  useInactivityTimeout(300000, signout);
  useEffect(() => {
    const storedAccessToken = localStorage.getItem('accessToken');
    const storedRefreshToken = localStorage.getItem('refreshToken');
    const storedUserData = localStorage.getItem('userData');
  
    if (storedAccessToken && storedRefreshToken && storedUserData) {
      setAccessToken(storedAccessToken);
      setRefreshToken(storedRefreshToken);
      setUser(JSON.parse(storedUserData)); 
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false); //revisado
    }
    setIsLoading(false);
  }, []);
  
  
  const [user, setUser] = useState<User | undefined>();
  const [accessToken, setAccessToken] = useState<string>("");
  const [refreshToken, setRefreshToken] = useState<string>("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isloading, setIsLoading] = useState(true);

  function getAccessToken() {
    return accessToken;
  }

  function saveUser(userData: AuthResponse) {
    setAccessTokenAndRefreshToken(
      userData.access,
      userData.refresh
    );
    setUser(userData.user);
    setIsAuthenticated(true);
    localStorage.setItem('accessToken', userData.access);
    localStorage.setItem('refreshToken', userData.refresh);
    localStorage.setItem('userData', JSON.stringify(userData.user))
  }

  function setAccessTokenAndRefreshToken(
    accessToken: string,
    refreshToken: string
  ) {
    // console.log("setAccessTokenAndRefreshToken", accessToken, refreshToken);
    setAccessToken(accessToken);
    setRefreshToken(refreshToken);

    localStorage.setItem("token", JSON.stringify({ refreshToken }));
  }

  function getRefreshToken() {
    if (!!refreshToken) {
      return refreshToken;
    }
    const token = localStorage.getItem("token");
    if (token) {
      const { refreshToken } = JSON.parse(token);
      setRefreshToken(refreshToken);
      return refreshToken;
    }
    return null;
  }

  async function getNewAccessToken(refreshToken: string) {
    const token = await requestNewAccessToken(refreshToken);
    // console.log(token);
    if (token) {
      return token;
    }
  }

  function getUser(): User | undefined {
    return user;
  }

  function signout() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('userData');
    setAccessToken("");
    setRefreshToken("");
    setUser(undefined);
    setIsAuthenticated(false); //revisado
  }

  async function checkAuth() {
    try {
      if (accessToken) {
        // Existe un access token
        const userInfo = await retrieveUserInfo(accessToken);
        if (userInfo) {
          // console.log(userInfo);
          setUser(userInfo);
          setIsAuthenticated(true);
        } else {
          // Si no se obtiene información del usuario, maneja el caso aquí
          console.error('No se pudo obtener información del usuario');
          setIsAuthenticated(false); //revisado
        }
        setAccessToken(accessToken);
      } else {
        // No existe un access token
        const token = localStorage.getItem("token");
        if (token) {
          // console.log("useEffect: token", token);
          const refreshToken = JSON.parse(token).refreshToken;
          
          try {
            // console.log("refreshToken");
            // console.log(refreshToken);
            const newToken = await getNewAccessToken(refreshToken);
            // console.log("newToken");
            // console.log(newToken);
            
            if (newToken) {
              setAccessToken(newToken);
              // Considera obtener información del usuario con el nuevo token
              // const userInfo = await retrieveUserInfo(newToken);
              // if (userInfo) {
              //   setUser(userInfo);
              // }
              setIsAuthenticated(true);
            } else {
              // Maneja el caso en que no se obtiene un nuevo token
              console.error('No se pudo obtener un nuevo token');
              setIsAuthenticated(false); //causa problemas
            }
          } catch (error) {
            // console.log('Error obteniendo un nuevo token:', error);
            setIsAuthenticated(false); //revisado
          }
        } else {
          setIsAuthenticated(false); //revisado
        }
      }
      setIsLoading(false);
    } catch (error) {
      console.error('Error en checkAuth:', error);
      setIsLoading(false);
    }
  }

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        getAccessToken,
        setAccessTokenAndRefreshToken,
        getRefreshToken,
        saveUser,
        getUser,
        setUser,
        signout,
      }}
    >
      {isloading ? <div>Loading...</div> : children}
    </AuthContext.Provider>
  );
}

// async function retrieveUserInfo(accessToken: string) {
//   try {
//     const API_URL = process.env.REACT_APP_API_URL_1;
//     const response = await fetch(`${API_URL}/user`, {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${accessToken}`,
//       },
//     });

//     if (response.ok) {
//       const json = await response.json();
//       console.log(json);
//       return json.body;
//     }
//   } catch (error) {}
// }

async function retrieveUserInfo(accessToken: string) {
  try {
    const API_URL = process.env.REACT_APP_API_URL_1;
    const response = await fetch(`${API_URL}/user`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (response.ok) {
      const json = await response.json();
      // console.log(`json ${json}`); // Verifica que `json.body` contiene `is_staff`
      return json.body; 
    }
  } catch (error) {
    console.error('Error retrieving user info:', error);
  }
}

export const useAuth = () => useContext(AuthContext);