import React, { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import AddBrand from './../components/brand/addBrand';
import Brands from './../components/brand/brands';
import Layout from './../components/layout/layout';
import ProductStore from '../store/ProductStore';

const Brand = () => {
    const [searchKeyword, setSearchKeyword] = useState('');
    const { BrandListRequest } = ProductStore();

    useEffect(() => {
        (async () => {
            await BrandListRequest();
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
                        <AddBrand />
                        <Brands />
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Brand;
