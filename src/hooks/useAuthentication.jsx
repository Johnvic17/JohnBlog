import { db } from '../firebase/config';

import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile,
    signOut
} from 'firebase/auth';

import {useState, useEffect} from 'react'

export const useAuthentication = () => {
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(null)

    // cleanup 
    // deal with memory leak
    const [cancelled, setCancelled] = useState(false)

    const auth = getAuth();

    function checkIfIsCancelled() {
        if (cancelled) {
            return;
        }
    }

    //register
    const createUser = async (data) => {
        checkIfIsCancelled()

        setLoading(true)
        setError(null)

        try {
            
            const {user} = await createUserWithEmailAndPassword(
                auth,
                data.email,
                data.password
            )

            await updateProfile(user, {
                displayName: data.displayName
            })

            setLoading(false);

            return user;

        } catch (error) {
            
            console.log(error.message);
            console.log(typeof error.message);

            let systemErrorMessage

            if(error.message.includes("Password")) {
                systemErrorMessage = "Password should be at least 6 characters."
            } else if(error.message.includes("email-already")) {
                systemErrorMessage = "E-mail already registered."
            } else {
                systemErrorMessage = "An error has occurred, please try again later"
            }

            setLoading(false);
            setError(systemErrorMessage)
        }

        
    };

    // login - sign in

    const login = async (data) => {
        checkIfIsCancelled();

        setLoading(true)
        setError(false);

        try {
            
            const { user } = await signInWithEmailAndPassword(auth, data.email, data.password);

       } catch (error) {      
            console.log(error.message);
            console.log(typeof error.message);

            let systemErrorMessage;

            if (error.message.includes("auth/invalid-credential")) { 
                systemErrorMessage = "Sorry, but your password or email is wrong, please check and try again.";
            } else {
                systemErrorMessage = "Something is wrong, please try again later";
            }

            setError(systemErrorMessage)
                       
        }   

        console.log(error);

        setLoading(false);

    }

    // logout - sign out
    const logout = () => {

        checkIfIsCancelled();

        signOut(auth);

    }

    useEffect(() => {
        return () => setCancelled(true);
    }, []);

    return {
        auth,
        createUser,
        error,
        loading,
        logout,
        login
    };
};