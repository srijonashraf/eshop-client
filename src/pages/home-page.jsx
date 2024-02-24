import React, { useEffect } from 'react';
import Layout from "../components/layout/layout.jsx";
import Brands from "../components/product/brands.jsx";
import ProductStore from "../store/ProductStore.js";
import Categories from "../components/product/categories.jsx";
import Products from "../components/product/products.jsx";

const HomePage = () => {

    const { BrandListRequest, CategoryListRequest, ListByRemarkRequest } = ProductStore();


    useEffect(() => {
        (async () => {
            await CategoryListRequest();
            await ListByRemarkRequest("new");
            await BrandListRequest()
        })()
    }, []);


    return (
        <Layout>
            <Products />
            <Categories />
            <Brands />
        </Layout>
    );
};

export default HomePage;