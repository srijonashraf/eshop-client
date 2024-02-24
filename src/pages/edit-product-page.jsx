import { Layout } from 'antd';
import React, { useEffect } from 'react';
import EditProduct from './../components/product/edit-product';
import { useParams } from 'react-router-dom';
import ProductStore from '../store/ProductStore';
import AppNavBar from '../components/layout/AppNavBar';

const EditProductPage = () => {
    const { DetailsRequest } = ProductStore();

    const { id } = useParams();
    useEffect(() => {
        (async () => {
            await DetailsRequest(id)
        })()
    }, [id]);
    return (
        <div>
            <AppNavBar />
            <EditProduct />
        </div>

    );
};

export default EditProductPage;