import React, { useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { getAllProducts } from '../redux/slices/productsSlice';
import Product from "../components/Product";

function ProductsList() {

    const dispatch = useDispatch();

    const { products, filterText } = useSelector((store) => (store.products));

    useEffect(() => {
        dispatch(getAllProducts());
    }, [])

    return (
        <div className='flex-row' style={{ flexWrap: "wrap", gap: "30px" }}>
            {
                products && products.filter((product) => product.title.toLowerCase().includes(filterText.toLowerCase().trim())).map((product) => {
                    return <Product key={product.id} product={product} />
                })
            }
        </div>
    )
}

export default ProductsList