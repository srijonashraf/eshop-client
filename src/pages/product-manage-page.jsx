import Layout from "../components/layout/layout.jsx";
import { useParams } from "react-router-dom";
import ProductStore from "../store/ProductStore.js";
import { useEffect } from "react";
import AllProduct from "../components/product/AllProduct.jsx";
const ProductManagement = () => {
    const { AllProductRequest, ListByKeywordRequest } = ProductStore();

    useEffect(() => {
        (async () => {
            await AllProductRequest();
        })()
    }, []);

    const { keyword } = useParams();

    useEffect(() => {
        (async () => {
            await ListByKeywordRequest(keyword)
        })()
    }, [keyword]);


    return (
        <Layout>
            <AllProduct />
        </Layout>
    );
};
export default ProductManagement;