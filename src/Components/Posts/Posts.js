import React, { useContext, useEffect, useState } from 'react';

import Heart from '../../assets/Heart';
import './Post.css';
import { collection, getDocs, getFirestore } from 'firebase/firestore';
// import { getAuth } from 'firebase/auth';
import Firebase from '../../firebase/config'
import { PostContext } from '../../store/PostContext';
import { useNavigate } from 'react-router-dom';


function Posts() {
  const [products, setProducts] = useState([])

  useEffect(() => {
    async function getAllPosts() {
      const db = getFirestore(Firebase)
      const prodCollection = collection(db, 'products')

      try {
        const prodSnapshot = await getDocs(prodCollection)
        const allProducts = []
        prodSnapshot.forEach((prod) => {
          allProducts.push({ ...prod.data(), id: prod.id })
        });
        setProducts(allProducts);
      } catch (error) {
        console.log(error.message);
      }
    }
    getAllPosts()
  }, [])

  const { setPostDetails } = useContext(PostContext)
  const navigate = useNavigate()

  return (
    <div className="postParentDiv">
      <div className="moreView">
        <div className="heading">
          <span>Quick Menu</span>
          <span>View more</span>
        </div>
        <div className="cards">
          {
            products.map(prod => (
              <div className="card" key={prod.id} onClick={() => {
                setPostDetails(prod)
                navigate('/view')
              }}>
                <div className="favorite">
                  <Heart></Heart>
                </div>
                <div className="image">
                  <img src={prod.url} alt="" />
                </div>
                <div className="content">
                  <p className="rate">&#x20B9; {prod.price}</p>
                  <span className="kilometer">{prod.category}</span>
                  <p className="name">{prod.name}</p>
                </div>
                <div className="date">
                  <span>{prod.createdAt}</span>
                </div>
              </div>
            ))
          }

        </div>
      </div>
      <div className="recommendations">
        <div className="heading">
          <span>Fresh recommendations</span>
        </div>
        <div className="cards">
          <div className="card">
            <div className="favorite">
              <Heart></Heart>
            </div>
            <div className="image">
              <img src="../../../Images/R15V3.jpg" alt="" />
            </div>
            <div className="content">
              <p className="rate">&#x20B9; 250000</p>
              <span className="kilometer">Two Wheeler</span>
              <p className="name"> YAMAHA R15V3</p>
            </div>
            <div className="date">
              <span>10/5/2021</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Posts;
