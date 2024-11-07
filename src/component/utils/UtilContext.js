import React, { createContext, useState, useEffect } from 'react'
import { jwtDecode } from 'jwt-decode';

export const UserContext = createContext();

const UtilContext = ({children}) => {
    const [user, setUser] = useState({});

    useEffect(() => {
      const token = localStorage.getItem('fitplanUserToken');

        if(token){
          try {
            const decodedToken = jwtDecode(token);

            setUser({
                user_id: decodedToken.user_id,
                username: decodedToken.username,
            });
            
          } catch (error) {
              console.error('Invalid token:', error);
              clearUser();
          }
        }

    }, [])


    const setAndStoreUser = (fitplanUserToken) => {
      try {
        const decodedToken = jwtDecode(fitplanUserToken);

        setUser({
            user_id: decodedToken.user_id,
            username: decodedToken.username,
        });

        localStorage.setItem('fitplanUserToken', fitplanUserToken);
      } catch (error) {
          console.error('Failed to set user:', error);
      }
    }


    const clearUser = () => {
      setUser({})

      localStorage.removeItem('fitplanUserToken');
    }


  return (
    <UserContext.Provider value={{user, setAndStoreUser, clearUser}}>
      {children}
    </UserContext.Provider>
  )
}

export default UtilContext
