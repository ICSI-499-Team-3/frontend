// Auth template from https://github.com/LucasGarcez/react-native-auth-flow

import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useState } from 'react';
import User from '../graphql/types/User';

type AuthContextData = {
    authData?: User;
    loading: boolean;
    updateAuthData(userData: User): Promise<void>;
    signOut(): void;
};

//Create the Auth Context with the data type specified
//and a empty object
const AuthContext = createContext<AuthContextData>({} as AuthContextData);

/**
 * @author Habib Affinnih
 */
const AuthProvider: React.FC = ({ children }) => {
    const [authData, setAuthData] = useState<User>();

    //the AuthContext start with loading equals true
    //and stay like this, until the data be load from Async Storage
    const [loadingStorage, setLoadingStorage] = useState(true);

    useEffect(() => {
        //Every time the App is opened, this provider is rendered
        //and call de loadStorage function.
        loadStorageData();
    }, []);

    async function loadStorageData(): Promise<void> {
        try {
            //Try get the data from Async Storage
            const authDataSerialized = await AsyncStorage.getItem('@AuthData');
            if (authDataSerialized) {
                //If there are data, it's converted to an Object and the state is updated.
                const _authData: User = JSON.parse(authDataSerialized);
                setAuthData(_authData);
            }
        } catch (error) {
            console.log(error);
        } finally {
            //loading finished
            setLoadingStorage(false);
        }
    }

    const updateAuthData = async (userData: User) => {
        //Set the data in the context, so the App can be notified
        //and send the user to the AuthStack
        setAuthData(userData);

        //Persist the data in the Async Storage
        //to be recovered in the next user session.
        AsyncStorage.setItem('@AuthData', JSON.stringify(userData));
    };

    const signOut = async () => {
        //Remove data from context, so the App can be notified
        //and send the user to the AuthStack
        setAuthData(undefined);

        //Remove the data from Async Storage
        //to NOT be recoverede in next session.
        await AsyncStorage.removeItem('@AuthData');
    };

    return (
        //This component will be used to encapsulate the whole App,
        //so all components will have access to the Context
        <AuthContext.Provider value={{ authData, loading: loadingStorage, updateAuthData, signOut }}>
            {children}
        </AuthContext.Provider>
    );
};

//A simple hooks to facilitate the access to the AuthContext
// and permit components to subscribe to AuthContext updates
function useAuth(): AuthContextData {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }

    return context;
}

export { AuthContext, AuthProvider, useAuth };
