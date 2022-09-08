import { useState, createContext, useEffect } from 'react';
import firebase from '../services/firebaseConnection';
import { toast } from 'react-toastify';

export const AuthContext = createContext({});

function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loadingAuth, setLoandingAuth] = useState(false);
    const [loading, setLoanding] = useState(true);

    useEffect(() => {

        function loadStorage() {

            // Localstorage vai manter a sessão ativa
            // Sessionstorage vai fechar a sessão quando a navegação for encerrada
            const storageUser = sessionStorage.getItem('SistemaUser')

            if (storageUser) {
                setUser(JSON.parse(storageUser));
                setLoanding(false);
            }

            setLoanding(false);

        }

        loadStorage();

    }, []);

    // Fazendo Login do usuario
    async function signIn(email, password) {
        setLoandingAuth(true);

        await firebase.auth().signInWithEmailAndPassword(email, password)
            .then(async (value) => {
                let uid = value.user.uid;

                const userProfile = await firebase.firestore().collection('users')
                    .doc(uid).get();

                let data = {
                    uid: uid,
                    nome: userProfile.data().nome,
                    email: value.user.email,
                    tipoperfil: userProfile.data().tipoperfil,
                    emailprincipal: userProfile.data().emailprincipal,
                };

                setUser(data);
                storageUser(data);
                setLoandingAuth(false);
                toast.success('Bem vindo! ' + userProfile.data().nome);

            })
            .catch((error) => {
                console.log(error);
                toast.error('Verifique se os dados estão corretos, ou se já possui uma conta, caso não tenha uma conta cadastre-se!');
                setLoandingAuth(false);
            })
    }


    // Cadastrando um novo Usuario
    async function signUp(email, password, nome, tipoperfil) {
        setLoandingAuth(true);
        await firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(async (value) => {
                let uid = value.user.uid;

                await firebase.firestore().collection('users')
                    .doc(uid).set({
                        nome: nome,
                        status: 1,
                        tipoperfil: tipoperfil,
                        created: new Date(),
                        email: value.user.email,
                    })
                    .then(() => {
                        let data = {
                            uid: uid,
                            nome: nome,
                            email: value.user.email,
                            status: 1,
                            tipoperfil: tipoperfil,
                            created: new Date(),
                        };

                        setUser(data);
                        storageUser(data);
                        setLoandingAuth(false);
                        toast.success('Bem vindo a plataforma!');

                    })

            })
            .catch((error) => {
                console.log(error);
                toast.error('Ops algo deu errado!');
                setLoandingAuth(false);

            })
    }

    function storageUser(data) {
        // Localstorage vai manter a sessão ativa
        sessionStorage.setItem('SistemaUser', JSON.stringify(data));
    }

    // Logout do Usuario
    async function signOut() {
        await firebase.auth().signOut();
        // Localstorage vai manter a sessão ativa
        sessionStorage.removeItem('SistemaUser');
        setUser(null);
    }

    return (
        <AuthContext.Provider
            value={{
                signed: !!user,
                user,
                loading,
                signUp,
                signOut,
                signIn,
                loadingAuth,
                setUser,
                storageUser
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;