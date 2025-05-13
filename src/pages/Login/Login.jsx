import styles from './Login.module.css'

import { useState, useEffect } from 'react'

import { useAuthentication } from '../../hooks/useAuthentication';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error,setError] = useState("");
  
  const {createUser, error: authError, loading, login} = useAuthentication();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    setError("");
  
    const user = {
      email,
      password 
    }
  
    const res = await login(user);
  
    console.log(res);
  };
  
  useEffect(() => {
    if(authError){
      setError(authError);
    }
  }, [authError]);
  
  return (
    <div className={styles.login}>
      <h1>Enter</h1>
      <p>Login with your email/password</p>
      <form onSubmit={handleSubmit}>
        <label>
          <span>E-mail:</span>
          <input
            type="text"
            name="displayName"
            required
            placeholder="Email Adress"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label>
          <span>Password:</span>
          <input
            type="password"
            name="password"
            required
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        {!loading && <button className="btn">Login</button>}
        {loading && (
          <button className="btn" disabled>
            await...
          </button>
        )}
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
}

export default Login