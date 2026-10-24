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
import logo from "../images/LogoLight.png";

function Header() {
  const navigate = useNavigate();
  const { products } = useSelector((store) => store.basket);
  const { isDarkTheme } = useSelector((store) => store.app);
  const dispatch = useDispatch();

  //isDarkTheme değişkeni her değiştiğinde çalışacak
  useEffect(() => {
    console.log(isDarkTheme)
    if (isDarkTheme) {
      document.body.style.backgroundColor = "black";
      document.body.style.color = "white";
    }
    else {
      document.body.style.backgroundColor = "white";
      document.body.style.color = "black";
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
        <img className='logo' src={logo} onClick={() => navigate("/")} />
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