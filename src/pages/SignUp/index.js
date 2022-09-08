import { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiLink } from 'react-icons/fi';
import { AuthContext } from '../../contexts/auth';


function SignUp() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [tipoperfil, setTipoPerfil] = useState('Usuario');

  const { signUp, loadingAuth } = useContext(AuthContext);

  useEffect(() => {


  }, []);


  function handleSubmit(e) {
    e.preventDefault();
    if (nome !== '' && email !== '' && password !== '' && tipoperfil !== '') {
      signUp(email, password, nome, tipoperfil)
    } else {
      alert('Verifique se todos os campos OBRIGATÓRIOS foram preenchidos!')
    }

  }

  return (
    <div className="container-center">
      <div className="login">
        <div className="login-area">
          <h2 style={{ color: 'white', marginTop: '40px', marginBottom: '40px' }}><FiLink /> Sistema<strong style={{ color: 'white' }}> Encurtador de Link</strong></h2>
        </div>

        <form onSubmit={handleSubmit}>
          <h1>Cadastre-se</h1>
          
          <label>Nome Completo<span style={{ color: 'red' }}>*</span>:</label>
          <input type="text" placeholder="Nome" value={nome} onChange={(e) => setNome(e.target.value)} />
      
          <label>E-mail<span style={{ color: 'red' }}>*</span>:</label>
          <input type="text" placeholder="email@email.com" value={email} onChange={(e) => setEmail(e.target.value)} />
         
          <label>Senha<span style={{ color: 'red' }}>*</span>:</label>
          <input type="password" placeholder="*************" value={password} onChange={(e) => setPassword(e.target.value)} />

          <button type="submit">{loadingAuth ? 'Carregando...' : 'Cadastrar'}</button>
        </form>

        <Link to="/">Já tem uma conta? Faça Login.</Link>
      </div>
    </div>
  );
}

export default SignUp;
