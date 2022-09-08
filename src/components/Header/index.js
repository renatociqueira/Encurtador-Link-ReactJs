import { useContext } from 'react';
import './header.css';
import { AuthContext } from '../../contexts/auth';

import { Link } from 'react-router-dom';
import { FiHome, FiSettings, FiUser, FiUsers, FiLink } from "react-icons/fi";


export default function Header() {
    const { user } = useContext(AuthContext);

    return (
        <div className="sidebar">
            <div>
                {/* Imagem do Header */}
            </div>

            {/* <Link to="/BemVindo" style={{ color: 'white' }}>
                <FiHome style={{ color: '#BF0404' }} size={27} />
                Dashboard
            </Link> */}

            {user.tipoperfil === 'SysAdmin'
                ?
                <Link to="/Aluno" style={{ color: 'white' }}>
                    <FiUser style={{ color: '#BF0404' }} size={27} />
                    Aluno
                </Link>
                :
                <></>
            }

            {user.tipoperfil === 'SysAdmin'
                ?
                <Link to="/Professor-CoordenadorEnex" style={{ color: 'white' }}>
                    <FiUsers style={{ color: '#BF0404' }} size={27} />
                    Professor
                </Link>
                :
                <></>
            }

            { user.tipoperfil === 'SysAdmin' || user.tipoperfil === 'Usuario'
                ?
                <Link to="/Encurtar-link" style={{ color: 'white' }}>
                    <FiLink style={{ color: '#BF0404' }} size={27} />
                    Encurtador
                </Link>
                :
                <></>
            }

            <Link to="/profile" style={{ color: 'white' }}>
                <FiSettings style={{ color: '#BF0404' }} size={27} />
                Configurações
            </Link>
            
        </div>
    )

}