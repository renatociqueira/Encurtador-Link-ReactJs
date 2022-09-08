import './profile.css';
import Header from '../../components/Header';
import Title from '../../components/Title';
import { FiSettings, FiLogOut} from 'react-icons/fi';
import { useState, useContext } from 'react';
import { AuthContext } from '../../contexts/auth';


export default function Profile() {
    const { user, signOut } = useContext(AuthContext);

    const [nome, setNome] = useState(user && user.nome);
    const [email, setEmail] = useState(user && user.email);



    return (
        <div>
            <Header />

            <div className="content">
                <Title name="Meu Perfil">
                    <FiSettings size={25} style={{ color: '#BF0404' }} />
                </Title>

                <div className="container">
                    <form className="form-profile" >

                        <label>Nome</label>
                        <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} disabled={true} />

                        <label>E-mail</label>
                        <input type="text" value={email} disabled={true} />

                    </form>
                </div>

                <div className="container">
                    <button style={{ color: 'white', backgroundColor: '#BF0404' }} className="logout-btn" onClick={() => signOut()}>
                        <FiLogOut /> Sair
                    </button>
                </div>

            </div>
        </div>
    )
}