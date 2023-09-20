import React, { useEffect, useState, useContext } from 'react';

import './View.css';
import { PostContext } from '../../store/PostContext';
import { collection, getDocs, getFirestore, query, where } from 'firebase/firestore';
import Firebase from '../../firebase/config'
import { useNavigate } from 'react-router-dom';
function View() {
  const { postDetails } = useContext(PostContext)
  const [userData, setUserData] = useState()
  const navigate = useNavigate()

  useEffect(() => {
    if (!postDetails) {
      navigate('/')
      return; // Exit early to prevent further execution of code below
    }

    const getUserData = async () => {
      const db = getFirestore(Firebase)
      const prodCollection = collection(db, 'users')
      try {
        const userArray = await getDocs(query(prodCollection, where('id', '==', postDetails.userId)));
        await userArray.forEach(doc => {
          setUserData(doc.data())
        })
      } catch (error) {
        console.log(error.message);
      }
    }
    getUserData()
  }, [postDetails, navigate])

  return (
    <div className="viewParentDiv">
      {postDetails ?
        <>
          <div className="imageShowDiv">
            <img
              src={postDetails.url}
              alt=""
            />
          </div>
          <div className="rightSection">
            <div className="productDetails">
              <p>&#x20B9;{postDetails.price}</p>
              <span>{postDetails.name}</span>
              <p>{postDetails.category}</p>
              <span>{postDetails.createdAt}</span>
            </div>
            {userData && <div className="contactDetails">
              <p>Seller details</p>
              <p>{userData.username}</p>
              <p>{userData.phone}</p>
            </div>}
          </div>
        </>
        : navigate('/')
      }
    </div>
  );
}
export default View;
