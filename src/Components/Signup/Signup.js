import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom'
import Logo from '../../olx-logo.png';
import './Signup.css';
import { FirebaseContext } from '../../store/Context'
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { addDoc, collection, getFirestore } from 'firebase/firestore'


export default function Signup() {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [isValid, setIsValid] = useState(false)
  const [hasError, setHasError] = useState(false)

  const navigate = useNavigate()

  const firebase = useContext(FirebaseContext)
  const db = getFirestore(firebase)
  const auth = getAuth();

  const formSubmitHandler = async (event) => {
    event.preventDefault()
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, { displayName: username })
      await addDoc(collection(db, 'users'), {
        id: userCredential.user.uid,
        username: username,
        phone: phone,
      });
      navigate('/login');
    } catch (error) {
      setHasError(true)
    }
  }

  return (
    <div>
      <div className="signupParentDiv">
        <img width="200px" height="200px" src={Logo} alt='' />
        <form onSubmit={formSubmitHandler}>
          <label htmlFor="name">Username <small>(min 3 characters)</small></label>
          <br />
          <input
            className="input"
            type="text"
            id="name"
            name="name"
            value={username}
            onChange={event => {
              setUsername(event.target.value)
              setIsValid(event.target.value.trim().length > 2 &&
                email.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/) &&
                phone.match(/^\d{10}$/) && password.length > 5)
            }} />

          <br />
          <br />

          <label htmlFor="email">Email</label>
          <br />
          <input
            className="input"
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={event => {
              setEmail(event.target.value)
              setIsValid(username.trim().length > 2 &&
                event.target.value.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/) &&
                phone.match(/^\d{10}$/) && password.length > 5)
            }}
          />
          {hasError && <small style={{ margin: '4px', color: 'red' }}>Email already taken!</small>}

          <br />
          <br />
          
          <label htmlFor="phone">Phone</label>
          <br />
          <input
            className="input"
            type="number"
            id="phone"
            name="phone"
            value={phone}
            onChange={event => {
              setPhone(event.target.value)
              setIsValid(username.trim().length > 2 &&
                email.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/) &&
                event.target.value.match(/^\d{10}$/) && password.length > 5)
            }}
          />
          {phone.length>10&& <small style={{color:'red'}}>Phone no. should be 10-digits</small>}
          <br />
          <br />

          <label htmlFor="password">Password <small>(min 6 characters)</small></label>
          <br />
          <input
            className="input"
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={event => {
              setPassword(event.target.value)
              setIsValid(username.trim().length > 2 &&
                email.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/) &&
                phone.match(/^\d{10}$/) && event.target.value.length > 5)
            }}
          />
          <br />
          <br />

          <br />
          <button className={!isValid ? 'invalid' : ''} disabled={!isValid}>Signup</button>
        </form>
        {/* <a href='###'>Login</a> */}
        <Link to='/login'>Login</Link>
      </div>
    </div>
  );
}
