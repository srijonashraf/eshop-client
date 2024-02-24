import React, { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import AddCategory from './../components/category/addCategory';
import Categories from './../components/category/categories';
import Layout from './../components/layout/layout';
import ProductStore from '../store/ProductStore';

const Category = () => {
    const [searchKeyword, setSearchKeyword] = useState('');
    const { CategoryListRequest } = ProductStore();

    useEffect(() => {
        (async () => {
            await CategoryListRequest();
        })();
    }, []);

    return (
        <Layout>
            <div className="container mt-4">
                <div className="row">
                    <div className="col-md-3">
                        <div className="card p-3 shadow-sm">
                            <h5 className="fw-bold mb-3">eShop</h5>
                            <ul className="list-group">
                                <li className='list-group-item'><NavLink to={'/product'} className="nav-link">All Products</NavLink></li>
                                <li className='list-group-item'><NavLink to={'/category'} className="nav-link">Category List</NavLink></li>
                                <li className='list-group-item'><NavLink to={'/brand'} className="nav-link">Brand List</NavLink></li>
                            </ul>
                        </div>
                    </div>

                    <div className="col-md-9">
                        <AddCategory />
                        <Categories />
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Category;
