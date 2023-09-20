import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import Logo from '../../olx-logo.png';
import './Login.css';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { AuthContext } from '../../store/Context';



function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isValid, setIsValid] = useState(false)
  const [hasError, setHasError] = useState(false)
  // const user = useContext(AuthContext)
  const navigate = useNavigate()

  // useEffect(() => {
  //   if (user) {
  //     navigate('/')
  //   }
  // }, [user, navigate])

  const loginSubmitHandler = async (e) => {
    e.preventDefault()
    const auth = getAuth();
    try {
      await signInWithEmailAndPassword(auth, email, password)
      navigate('/')
    } catch (error) {
      setHasError(true)
    }

  }
  return (

    <div>
      <div className="loginParentDiv">
        <img width="200px" height="200px" src={Logo} alt=''></img>
        <form onSubmit={loginSubmitHandler}>
          <label htmlFor="email">Email</label>
          <br />
          <input
            className="input"
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value)
              setIsValid((e.target.value.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/)) && password.length > 5)
            }}
          />
          <br />
          <label htmlFor="password">Password</label>
          <br />
          <input
            className="input"
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value)
              setIsValid((e.target.value.trim().length > 5) && email.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/))
            }}
          />
          <br />
          {hasError && <span style={{ margin: '4px', color: 'red' }}>Invalid Credentials</span>}
          <br />
          <button className={!isValid ? 'invalid' : ''} disabled={!isValid} > Login</button>
        </form>
        {/* <a>Signup</a> */}
        <Link to='/signup'>Signup</Link>
      </div>
    </div >
  );
}

export default Login;
