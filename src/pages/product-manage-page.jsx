import Layout from "../components/layout/layout.jsx";
import { useParams } from "react-router-dom";
import ProductStore from "../store/ProductStore.js";
import { useEffect } from "react";
import AllProduct from "../components/product/AllProduct.jsx";
const ProductManagement = () => {
    const { AllProductRequest, ListByKeywordRequest } = ProductStore();

    const { keyword } = useParams(); 3

    useEffect(() => {
        const fetchData = async () => {
            try {
                await AllProductRequest();
            } catch (error) {
                console.error("Error fetching all products:", error);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (keyword) {
                    await ListByKeywordRequest(keyword);
                } else {
                    await AllProductRequest();
                }
            } catch (error) {
                console.error("Error fetching products by keyword:", error);
            }
        };
        fetchData();
    }, [keyword]);

    return (
        <Layout>
            <AllProduct />
        </Layout>
    );
};
export default ProductManagement;