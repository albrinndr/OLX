import React, { Fragment, useContext, useState } from 'react';
import './Create.css';
import Header from '../Header/Header';
import { FirebaseContext, AuthContext } from '../../store/Context'
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { addDoc, collection, getFirestore } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const Create = () => {
  const [name, setName] = useState('')
  const [category, setCategory] = useState('')
  const [price, setPrice] = useState('')
  const [image, setImage] = useState(null)
  const [isValid, setIsValid] = useState(false)
  const navigate = useNavigate()

  const { firebase } = useContext(FirebaseContext)
  const { user } = useContext(AuthContext)
  const date = new Date()

  const submitHandler = async () => {
    const storage = getStorage();
    const storageRef = ref(storage, 'image/' + image.name);

    try {
      await uploadBytes(storageRef, image)
      console.log('image uploaded');

      const url = await getDownloadURL(storageRef)

      const db = getFirestore()
      await addDoc(collection(db, 'products'), {
        name,
        category,
        price,
        url,
        userId: user.uid,
        createdAt: date.toDateString()
      })
      navigate('/')
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <Fragment>
      <Header />
      <card>
        <div className="centerDiv">

          <label htmlFor="name">Name</label>
          <br />
          <input
            className="input"
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={e => {
              setName(e.target.value)
              setIsValid(e.target.value.trim().length > 0 &&
                category.trim().length > 0 &&
                price.trim().length > 0 && price.trim() > 0 && image)
            }}
          />
          <br />
          <br />

          <label htmlFor="category">Category</label>
          <br />
          <input
            className="input"
            type="text"
            id="category"
            name="category"
            value={category}
            onChange={e => {
              setCategory(e.target.value)
              setIsValid(name.trim().length > 0 &&
                e.target.value.trim().length > 0 &&
                price.trim().length > 0 && price.trim() > 0 && image)
            }}
          />
          <br />
          <br />

          <label htmlFor="price">Price</label>
          <br />
          <input className="input" type="number" id="price" name="Price" value={price}
            onChange={e => {
              setPrice(e.target.value)
              setIsValid(name.trim().length > 0 &&
                category.trim().length > 0 &&
                e.target.value.trim().length > 0 && e.target.value.trim() > 0 && image)
            }} />
          <br />
          {price.trim().length > 0 && price.trim() <= 0 ? <small style={{ color: 'red' }}>Price should be above 0 </small> : ''}



          <br />
          <img alt="Posts" width="200px" height="200px" src={image ? URL.createObjectURL(image) : ''}></img>
          <br />

          <input type="file" onChange={(e) => {
            setImage(e.target.files[0])
            setIsValid(name.trim().length > 0 &&
              category.trim().length > 0 &&
              price.trim().length > 0 && price.trim() > 0 && e.target.files.length > 0)
          }} />
          <br />

          <button onClick={submitHandler} className={!isValid ? 'uploadBtn invalid' : 'uploadBtn'} disabled={!isValid}>upload and Submit</button>

        </div>
      </card>
    </Fragment>
  );
};

export default Create;
