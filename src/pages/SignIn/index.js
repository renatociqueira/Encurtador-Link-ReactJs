import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/auth';
import './signin.css';
import { FiLogIn, FiLink } from 'react-icons/fi';
// verifica se as variaveis incluidas no arquivo .env estão acessiveis (só funcionou com dotenv-webpack)
// console.log(process.env);

function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { signIn, loadingAuth } = useContext(AuthContext);

  function handleSubmit(e) {
    e.preventDefault();
    if (email !== '' && password !== '') {
      signIn(email, password)
    }
  }

  return (
    <div className="container-center">
      <div className="login">
        <div className="login-area">
          <h2 style={{ color: 'white', marginTop: '40px', marginBottom: '40px' }}><FiLink /> Sistema<strong style={{ color: 'white' }}> Encurtador de Link</strong></h2>
        </div>

        <form onSubmit={handleSubmit}>
          <p>E-mail:</p>
          <input type="text" placeholder="email@dominio.com" value={email} onChange={(e) => setEmail(e.target.value)} />
          <p>Senha:</p>
          <input type="password" placeholder="*************" value={password} onChange={(e) => setPassword(e.target.value)} />
          <button type="submit"><FiLogIn /> {loadingAuth ? 'Carregando...' : 'Login'}</button>
        </form>


        <Link to="/register">
          <p>Ainda não tem uma conta? Clique aqui e, <strong style={{ color: 'blue' }}>CADASTRE-SE.</strong></p>
        </Link>
        <Link to="/" style={{ justifyContent: 'center', display: 'flex', flexDirection: 'column', marginBottom: '0px', marginTop: '0px' }}>
          <p>Desenvolvido Por Renato Ciqueira.</p>
        </Link>
        <a href="https://github.com/renatociqueira" target="_blank" rel="noreferrer" style={{ justifyContent: 'center', display: 'flex', flexDirection: 'column', marginTop: '0px' }}><p>©2022 Todos os direitos reservados - RenatoCiqueira</p></a>
      </div>
    </div>
  );
}

export default SignIn;
