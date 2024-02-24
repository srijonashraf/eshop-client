import React, { useEffect, useState } from 'react';
import ProductStore from '../../store/ProductStore';
import { Link, NavLink, useParams } from 'react-router-dom';
import StarRatings from 'react-star-ratings';
import UserSubmitButton from './../user/UserSubmitButton';
import toast from 'react-hot-toast';
import { DeleteAlert } from '../../utility/utility';


const AllProduct = () => {
    const { AllProduct, DeleteProductRequest, AllProductRequest, SetSearchKeyword, SearchKeyword } = ProductStore();
    const [change, setChange] = useState('');

    const { keyword } = useParams();

    useEffect(() => {
        (async () => {
            await AllProductRequest();
        })()
    }, [change]);


    return (
        <div className="container mt-4">
            <div className="row">
                <div className="col-md-3">
                    <div className="card p-3 shadow-sm">
                        <h5 className="fw-bold mb-3">eShop</h5>
                        <div className="input-group mb-3">
                            <input onChange={(e) => SetSearchKeyword(e.target.value)} className="form-control" type="search" placeholder="Search" aria-label="Search" />
                            <Link to={SearchKeyword.length > 0 ? `/product-search/${SearchKeyword}` : `/`} className="btn btn-outline-dark" type="submit">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ width: 24, height: 24 }}>
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </Link>
                        </div>
                        <ul className="list-group">
                            <li className='list-group-item'><NavLink to={'/newProduct'} className="nav-link">New Product</NavLink></li>
                            <li className='list-group-item'>Category</li>
                            <li className='list-group-item'>Brand</li>
                        </ul>
                    </div>
                </div>

                <div className="col-md-9">
                    <div className="row">
                        {AllProduct?.map((item) => (
                            <div key={item._id} className="col-md-4 mb-3">
                                <div className="card shadow-sm h-100 rounded-3 bg-white text-decoration-none position-relative">
                                    <img className="card-img-top rounded-top-2" style={{ width: "100%", height: "100%" }} src={item.image} alt={item.title} />
                                    <div className="card-body">
                                        <h5 className="card-title mb-2 nav-link">{item.title}</h5>
                                        <p className="card-text text-muted mb-2">
                                            {item.discount ? (
                                                <>
                                                    <strike>${item.price}</strike> ${item.discountPrice}
                                                </>
                                            ) : (
                                                `$${item.price}`
                                            )}
                                        </p>
                                        <div className="d-flex align-items-center">
                                            <StarRatings rating={parseFloat(item.star)} starRatedColor="red" starDimension="20px" starSpacing="2px" />
                                            <span className="ms-2">{item.star}</span>
                                        </div>
                                        <Link to={`/editProduct/${item._id}`} className="">
                                            <UserSubmitButton className="btn mt-3 me-3 btn-success" text="Edit" />
                                        </Link>
                                        <UserSubmitButton
                                            onClick={async () => {
                                                const confirmed = await DeleteAlert();
                                                if (confirmed) {
                                                    if (DeleteProductRequest(item._id)) {
                                                        toast.success("Product Deleted");
                                                        setChange(Date.now());
                                                    } else {
                                                        toast.error("Something Went Wrong");
                                                    }
                                                }
                                            }}
                                            className="btn mt-3 btn-danger"
                                            text="Delete"
                                        />

                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AllProduct;
