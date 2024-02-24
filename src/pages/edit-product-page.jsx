import React, { useEffect } from 'react';
import EditProduct from './../components/product/edit-product';
import { useParams } from 'react-router-dom';
import ProductStore from '../store/ProductStore';
import Layout from '../components/layout/layout';

const EditProductPage = () => {
    const { DetailsRequest } = ProductStore();

    const { id } = useParams();
    useEffect(() => {
        (async () => {
            await DetailsRequest(id)
        })()
    }, [id]);
    return (
        <Layout>
            <EditProduct />
        </Layout>

    );
};

export default EditProductPage;