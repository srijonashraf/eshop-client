import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/home-page.jsx";
import ProductByBrand from "./pages/product-by-brand.jsx";
import ProductByCategory from "./pages/product-by-category.jsx";
import ProductByKeyword from "./pages/product-by-keyword.jsx";
import LoginPage from "./pages/login-page.jsx";
import OtpPage from "./pages/otp-page.jsx";
import ProfilePage from "./pages/profile-page.jsx";
import ProductDetails from './pages/product-details.jsx';
import ProductManagement from './pages/product-manage-page.jsx';
import EditProductPage from './pages/edit-product-page.jsx';
import { Toaster } from 'react-hot-toast';
import AllProduct from './components/product/AllProduct.jsx';

const App = () => {


    return (
        <BrowserRouter>
            <Toaster position="bottom-center" />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/details/:id" element={<ProductDetails />} />
                <Route path="/by-brand/:id" element={<ProductByBrand />} />
                <Route path="/by-category/:id" element={<ProductByCategory />} />
                <Route path="/by-keyword/:keyword" element={<ProductByKeyword />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/otp" element={<OtpPage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/product" element={< ProductManagement />} />
                <Route path="/editProduct/:id" element={< EditProductPage />} />
                <Route path="/newProduct" element={< EditProductPage />} />
                <Route path="/product-search/:keyword" element={<ProductManagement />} />


            </Routes>
        </BrowserRouter>
    );
};
export default App;