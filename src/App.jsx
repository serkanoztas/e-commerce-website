import { useEffect, useState } from 'react'
import './App.css'
import Auth from './pages/Auth';
import SignUp from './pages/SignUp';
import { Routes, Route, Router, useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import { ToastContainer } from 'react-toastify';
import Home from './pages/Home';
import Details from './pages/Details';
import Drawer from '@mui/material/Drawer';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromBasket, setDrawer } from './redux/slices/BasketSlice';
import BackDrop from './components/BackDrop';
import { CiCircleMinus } from "react-icons/ci";
import { CiCirclePlus } from "react-icons/ci";


function App() {
  const { drawer, BasketProducts } = useSelector((store) => store.basket);
  const dispatch = useDispatch();

  const DeleteControl = (id) => {
    dispatch(removeFromBasket(id));
  }



  return (
    <div>
      <Navbar />
      <Routes>
        <Route path='/signin' element={<Auth />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/' element={<Home />} />
        <Route path="/details/:id" element={<Details />} />
      </Routes>
      <BackDrop />
      <Drawer open={drawer} onClose={() => dispatch(setDrawer())} anchor='right' >

        {
          BasketProducts && BasketProducts.map((product) => {

            return (
              <div div className='Drawer-main '>
                <div>
                  <img className='Drawer-img' src={product.image} />
                </div>
                <div className='Drawer-details'>
                  <h4 style={{ marginBottom: "30px" }}> {product.title} </h4>
                  <p style={{ fontSize: "13px" }}>{product.description}</p>
                  <h4 className='count'> Piece: {product.count}  </h4>
                  <h4 style={{ marginTop: "30px" }}>{(product.price) * (product.count)}$</h4>
                  <button className='Drawer-button' onClick={() => DeleteControl(product.id)}>Delete</button>
                </div>
              </div>
            )
          }
          )
        }
      </Drawer >
      <ToastContainer position='top-center' autoClose={2000} />
    </div >
  )
}

export default App
