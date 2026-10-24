import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import { store } from './redux/slices/store.jsx'
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        { //Normal Kullanım        <BrowserRouter basename="/">
        }
        <BrowserRouter basename="/Websitelerim/React_Projelerim/E_Commerce">
            <App />
        </BrowserRouter>
    </Provider >

)
