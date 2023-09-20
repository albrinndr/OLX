import React, { useContext, useEffect } from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import SignupPage from './Pages/Signup';
import LoginPage from './Pages/Login';
import { AuthContext } from './store/Context';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import CreatePage from './Pages/Create';
import ViewPost from './Pages/ViewPost';
import PostContextProvider from './store/PostContext';


function App() {
  const { user, setUser } = useContext(AuthContext)
  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) setUser(user)
      console.log(user);
    });
  }, [setUser])
  return (
    <div>
      <PostContextProvider>
        <Routes>
          <Route path='/' element={<Home />} />

          {!user && <Route path='/signup' element={<SignupPage />} />}
          <Route path='/login' element={<LoginPage />} />

          {user && <Route path='/create' element={<CreatePage />} />}
          <Route path='/view' element={<ViewPost />} />
        </Routes>
      </PostContextProvider>

    </div>
  );
}

export default App;
