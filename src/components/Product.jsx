import React, { useEffect, useState } from 'react'
import "../css/product.css";
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Product({ product }) {
    const { id, title, image, description, price } = product;
    const navigate = useNavigate();
    const { isDarkTheme } = useSelector((store) => store.app)

    const [cardClass, setCardClass] = useState("card");

    useEffect(() => {
        if (isDarkTheme) {
            setCardClass("dark-card");
        }
        else {
            setCardClass("card");
        }

    }, [isDarkTheme]);

    return (
        <div className={cardClass} onClick={() => (navigate("/product-details/" + id))}>
            <div className='imagediv'>
                <img src={image} className='image' />
            </div>

            <p className='cardtitle'>{title}</p>
            <h3 >{price}₺</h3>

        </div>
    )
}

export default Product