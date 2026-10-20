import './App.css'
import { Container } from "@mui/material";
import Header from './components/Header';
import RouterConfig from './Config/RouterConfig';
import Loading from './components/Loading';
import Drawer from '@mui/material/Drawer';
import { useDispatch, useSelector } from 'react-redux';
import { setDrawer, deleteToBasket, calculateBasket } from "./redux/slices/basketSlice";
import { useEffect, useState } from 'react';

function App() {
  const { products } = useSelector((store) => (store.basket))
  const dispatch = useDispatch();
  const { drawer, totalPrice } = useSelector((store) => (store.basket));
  const { isDarkTheme } = useSelector((store) => store.app)
  const [backgroundColor, setbackgroundColor] = useState("white");
  const [cardColor, setcardColor] = useState("white");
  const [textcolor, settextcolor] = useState("black");

  useEffect(() => {
    dispatch(calculateBasket());

    if (isDarkTheme) {
      setbackgroundColor("rgb(28, 28, 28)");
      settextcolor("white");
      setcardColor("rgb(41, 41, 41)");
    }
    else {
      setbackgroundColor("white");
      settextcolor("black");
      setcardColor("rgb(238, 234, 230)");
    }
  }, [isDarkTheme])

  return (
    <div>
      <Container maxWidth="lg">
        <Header />
        <RouterConfig />
        <Loading />

        <Drawer open={drawer} className='flex-row' sx={{
          '& .MuiDrawer-paper': {
            backgroundColor: backgroundColor + ' !important',
            height: '100% !important',
            minHeight: '100vh !important',
          }
        }} anchor='right' onClose={() => dispatch(setDrawer())}>
          <div style={{
            backgroundColor: backgroundColor, color: textcolor, minHeight: "100vh", minWidth: "100%"
          }}>
            {
              products && products.map((product) => {
                const characterLimit = 54;
                let newProductTitle = "";
                if (product.title.length > characterLimit) {
                  newProductTitle = product.title.slice(0, characterLimit) + "...";
                }
                else {
                  newProductTitle = product.title;
                }
                return (
                  <div key={product.id} className='flex-row' style={{ justifyContent: "normal", margin: "3px", maxWidth: "350px", padding: "3px", backgroundColor: cardColor }}>
                    <img src={product.image} height={63} />
                    <div style={{ marginLeft: "5px" }} >

                      <h4>{newProductTitle}</h4>
                      <p style={{ color: "red" }}>{product.price}₺</p>
                      <div style={{ display: "flex", gap: "10px" }}>
                        <p>{product.count}x</p>
                        <button style={{ width: "40px", backgroundColor: "red", color: "white", border: "none", borderRadius: "5px", }} onClick={() => { dispatch(deleteToBasket(product)); dispatch(calculateBasket()); }}>Sil</button>
                      </div>

                    </div>

                  </div>
                );
              })
            }
            <div style={{ margin: "auto", minWidth: "200px", textAlign: "center" }}> Toplam Tutar: <span style={{ color: "red" }}>{totalPrice.toFixed(2)}₺</span></div>
          </div>
        </Drawer>
      </Container>
    </div>
  )
}

export default App
