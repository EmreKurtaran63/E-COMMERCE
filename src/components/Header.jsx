import React, { useEffect } from 'react'
import "../css/Header.css";
import { BsBasket2Fill } from "react-icons/bs";
import { FaSun } from "react-icons/fa6";
import { FaMoon } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import Badge from '@mui/material/Badge';
import { useDispatch, useSelector } from 'react-redux';
import { setDrawer } from "../redux/slices/basketSlice";
import { setFilter } from '../redux/slices/productsSlice';
import { setTheme } from '../redux/slices/appSlice';

function Header() {
  const navigate = useNavigate();
  const { products } = useSelector((store) => store.basket);
  const { isDarkTheme } = useSelector((store) => store.app);
  const dispatch = useDispatch();

  //isDarkTheme değişkeni her değiştiğinde çalışacak
  useEffect(() => {
    console.log(isDarkTheme)
    if (isDarkTheme) {
      root.style.backgroundColor = "black";
      root.style.color = "white";
    }
    else {
      root.style.backgroundColor = "white";
      root.style.color = "black";
    }
    console.log(isDarkTheme)
  }, [isDarkTheme]);

  const ChangeTheme = () => {
    dispatch(setTheme());
  };


  const setDrawerr = () => {
    if (products.length > 0) {
      dispatch(setDrawer());
    }
  }

  const setTextFilter = (filter) => {
    dispatch(setFilter(filter));
  }


  return (
    <div className='flex-row-between'>

      <div className='flex-column'>
        <img className='logo' src="./src/images/LogoLight.png" onClick={() => navigate("/")} />
        <p className='logo-text'>Neşeli Bir Stüdyo A.Ş</p>
      </div>

      <div className='flex-row'>
        <input type='text' onChange={(e) => setTextFilter(e.target.value)} />

        <Badge badgeContent={products.length} color="error" className='headerIcon' onClick={() => setDrawerr()}>
          <BsBasket2Fill />
        </Badge>

        {
          isDarkTheme ? <FaSun className='headerIcon' onClick={() => ChangeTheme()} /> : <FaMoon className='headerIcon' onClick={() => ChangeTheme()} />
        }
      </div>


    </div>
  )
}

export default Header