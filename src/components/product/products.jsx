import React from 'react';
import ProductStore from "../../store/ProductStore.js";
import { Link } from "react-router-dom";
import ProductsSkeleton from "../../skeleton/products-skeleton.jsx";
import StarRatings from 'react-star-ratings';

const Products = () => {
    const { ListByRemark, ListByRemarkRequest } = ProductStore();

    const renderProducts = () => {
        return (
            <div className="container">
                <div className="row">
                    {ListByRemark.map((item) => (
                        <div key={item._id} className="col-md-3 p-2 col-lg-3 col-sm-6 col-12">
                            <Link to={`/details/${item._id}`} className="card shadow-sm h-100 rounded-3 bg-white">
                                <img className="rounded-top-2" style={{ width: "100%", height: "100%" }} src={item.image} alt={item.title} />
                                <div className="card-body">
                                    <p className="bodySmal text-secondary my-1">{item.title}</p>
                                    <p className="bodyMedium  text-dark my-1">
                                        Price: {item.discount ? (
                                            <>
                                                <strike>${item.price}</strike> ${item.discountPrice}
                                            </>
                                        ) : (
                                            `$${item.price}`
                                        )}
                                    </p>
                                    <StarRatings rating={parseFloat(item['star'])} starRatedColor="red" starDimension="15px" starSpacing="2px" />
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    return (
        <div className="section">
            <div className="container-fluid">
                <div className="row">
                    <h1 className="headline-4 text-center my-2 p-0">Our Products</h1>
                    <span className="bodySmal mb-3 text-center">Explore a World of Choices Across Our Most Popular</span>
                    <div className="col-12">
                        <ul className="nav nav-pills  p-3  justify-content-center mb-3" id="pills-tab" role="tablist">
                            <li className="nav-item" role="presentation">
                                <button onClick={() => { ListByRemarkRequest("new") }} className="nav-link active" id="pills-new-tab" data-bs-toggle="pill" data-bs-target="#pills-new" type="button" role="tab" aria-controls="pills-new" aria-selected="true">New</button>
                            </li>
                            <li className="nav-item" role="presentation">
                                <button onClick={() => { ListByRemarkRequest("trending") }} className="nav-link" id="pills-trending-tab" data-bs-toggle="pill" data-bs-target="#pills-trending" type="button" role="tab" aria-controls="pills-trending" aria-selected="false">Trending</button>
                            </li>
                            <li className="nav-item" role="presentation">
                                <button onClick={() => { ListByRemarkRequest("popular") }} className="nav-link" id="pills-popular-tab" data-bs-toggle="pill" data-bs-target="#pills-popular" type="button" role="tab" aria-controls="pills-popular" aria-selected="false">Popular</button>
                            </li>
                            <li className="nav-item" role="presentation">
                                <button onClick={() => { ListByRemarkRequest("top") }} className="nav-link" id="pills-top-tab" data-bs-toggle="pill" data-bs-target="#pills-top" type="button" role="tab" aria-controls="pills-top" aria-selected="false">Top</button>
                            </li>
                            <li className="nav-item" role="presentation">
                                <button onClick={() => { ListByRemarkRequest("special") }} className="nav-link" id="pills-special-tab" data-bs-toggle="pill" data-bs-target="#pills-special" type="button" role="tab" aria-controls="pills-special" aria-selected="false">Special</button>
                            </li>
                        </ul>
                        <div className="tab-content" id="pills-tabContent">
                            <div className="tab-pane fade show active" id="pills-new" role="tabpanel" aria-labelledby="pills-new-tab">
                                {ListByRemark ? renderProducts() : <ProductsSkeleton />}
                            </div>
                            <div className="tab-pane fade" id="pills-trending" role="tabpanel" aria-labelledby="pills-trending-tab">
                                {ListByRemark ? renderProducts() : <ProductsSkeleton />}
                            </div>
                            <div className="tab-pane fade" id="pills-popular" role="tabpanel" aria-labelledby="pills-popular-tab">
                                {ListByRemark ? renderProducts() : <ProductsSkeleton />}
                            </div>
                            <div className="tab-pane fade" id="pills-top" role="tabpanel" aria-labelledby="pills-top-tab">
                                {ListByRemark ? renderProducts() : <ProductsSkeleton />}
                            </div>
                            <div className="tab-pane fade" id="pills-special" role="tabpanel" aria-labelledby="pills-special-tab">
                                {ListByRemark ? renderProducts() : <ProductsSkeleton />}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Products;
