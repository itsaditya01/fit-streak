import React, { useContext, useState, useEffect } from 'react'
import { auth } from '../Firebase'
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
const AuthContext = React.createContext();

const useAuth = () => {
    return useContext(AuthContext);
};

const AuthProvider = ({ children }) => {

    const [Loading, setLoading] = useState(true);

    const signup = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password);
    };
    const login = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    };
    const logout = () => {
        return signOut(auth);
    };
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
            setLoading(false);
        })
        return unsubscribe
    }, [])


    const [currentUser, setCurrentUser] = useState(null);
    const value = {
        currentUser,
        signup,
        login
    };
    return (
        <AuthContext.Provider value={value}>
            {!Loading && children}
        </AuthContext.Provider>
    )
}

export { useAuth }
export default AuthProvider