import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import { selectProduct } from '../redux/slices/productsSlice';
import "../css/productDetails.css"
import { CiCirclePlus } from "react-icons/ci";
import { CiCircleMinus } from "react-icons/ci";
import { addToBasket, calculateBasket } from '../redux/slices/basketSlice';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';

function ProductDetails() {

    const { products, selectedProduct } = useSelector((store) => store.products);
    const { title, image, description, price } = selectedProduct;
    const { id } = useParams();
    const dispatch = useDispatch();

    const [count, setCount] = useState(0);

    useEffect(() => {
        GetElementById();
    }, [])

    const GetElementById = () => {
        products && products.map((product) => {
            if (product.id == id) {
                dispatch(selectProduct(product));
            }
        })
    }

    const increaseCount = () => {
        setCount(count + 1);
    }
    const decreaseCount = () => {
        if (count > 0) {
            setCount(count - 1);
        }
    }

    const addtoBasket = (event) => {
        if (count > 0) {
            const payload = {
                id,
                title,
                image,
                description,
                price,
                count
            }
            dispatch(addToBasket(payload));
            dispatch(calculateBasket());

            //popup
            setAnchorEl(event.currentTarget);
        }

    }


    /* POP UP */
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);

    return (
        <div className='flex-row' style={{ justifyContent: "normal", alignItems: "normal", marginTop: "20px" }}>
            <div className='imageDetailDiv'>
                <img src={image} className='detailImage' />
            </div>
            <div>
                <div className='flex-column' style={{ justifyContent: "normal", padding: "20px", gap: "20px" }}>
                    <h2>{title}</h2>
                    <p>{description}</p>
                </div>
                <h1 className='price' >{price}₺</h1>

                <div className='amountProduct'>
                    <CiCircleMinus className='icon' onClick={() => decreaseCount()} /> {count} <CiCirclePlus className='icon' onClick={() => increaseCount()} />
                </div>

                <button className="addToBasket" onClick={(e) => addtoBasket(e)}>Sepete Ekle</button>

                {
                    //POPUP
                }
                <Popover
                    id={id}
                    open={open}
                    anchorEl={anchorEl}
                    onClose={handleClose}
                    anchorOrigin={{
                        vertical: 'center',
                        horizontal: 'right',
                    }}
                    transformOrigin={{
                        vertical: 'center',
                        horizontal: 'left',
                    }}
                >
                    <Typography sx={{ p: 2 }}>Ürün Başarıyla Sepete Eklendi.</Typography>
                </Popover>

            </div>
        </div>
    )
}

export default ProductDetails