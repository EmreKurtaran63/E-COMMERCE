import { createSlice } from '@reduxjs/toolkit'


const getProductsFromStorge = () => {
    if (localStorage.getItem("basket")) {
        return JSON.parse(localStorage.getItem("basket"));
    }
    return [];
}


const setProductstoStorge = (basket) => {
    localStorage.setItem("basket", JSON.stringify(basket))
}


const initialState = {
    products: getProductsFromStorge(),
    drawer: false,
    totalPrice: 0
}

export const basketSlice = createSlice({
    name: "basket",
    initialState,
    reducers: {
        addToBasket: (state, action) => {
            const findproduct = state.products && state.products.find((product) => product.id === action.payload.id);

            //eğerki bu ürün sepette var ise
            if (findproduct) {
                //var olan ürünün olmadığı bir liste oluşturdum.
                const extractedProductsList = state.products.filter((product) => product.id != action.payload.id);

                //sepette önceden var olan ürnün adetini arttırıyoruz.
                findproduct.count += action.payload.count;

                //listemizi güncelliyoruz
                state.products = [...extractedProductsList, findproduct];
            }
            else {
                state.products = [...state.products, action.payload];
            }
            setProductstoStorge(state.products);
        },

        deleteToBasket: (state, action) => {
            const findproduct = state.products && state.products.find((product) => product.id === action.payload.id);

            //eğerki bu ürün sepette var ise
            if (findproduct) {
                //var olan ürünün olmadığı bir liste oluşturdum.
                const extractedProductsList = state.products.filter((product) => product.id != action.payload.id);

                if (findproduct.count > 1) {
                    //sepette fazla var olan ürnün adetini azaltıyoruz.
                    findproduct.count--;
                    //listemizi güncelliyoruz
                    state.products = [...extractedProductsList, findproduct];
                }
                else if (findproduct.count >= 0) {
                    //Eğerki ürünun adeti 1 den küçükse
                    state.products = [...extractedProductsList];
                }
                setProductstoStorge(state.products);
            }

            if (!state.products || state.products <=0) {
                state.drawer = false;
            }
        },

        setDrawer: (state) => {
            state.drawer = !state.drawer
        },

        calculateBasket: (state) => {
            state.totalPrice = 0;

            state.products && state.products.map((product) => {
                state.totalPrice += product.count * product.price;
            });
        }
    }
})

export const { addToBasket, setDrawer, deleteToBasket, calculateBasket } = basketSlice.actions
export default basketSlice.reducer