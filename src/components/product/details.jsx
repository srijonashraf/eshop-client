import ProductImages from "./ProductImages.jsx";
import ProductStore from "../../store/ProductStore.js";
import DetailsSkeleton from "../../skeleton/details-skeleton.jsx";
import parse from 'html-react-parser';
import { useState } from "react";
import toast from "react-hot-toast";


const Details = () => {

    const { Details } = ProductStore();



    if (Details === null) {
        return <DetailsSkeleton />
    }
    else {
        return (
            <div>
                <div className="container mt-2">
                    <div className="row">
                        <div className="col-md-7 p-3">
                            <ProductImages />
                        </div>
                        <div className="col-md-5 p-3">
                            <h4>{Details[0]['title']}</h4>
                            <p className="text-muted bodySmal my-1">Category: {Details[0]['category']['categoryName']}</p>
                            <p className="text-muted bodySmal my-1">Brand: {Details[0]['brand']['brandName']}</p>
                            <p className="bodySmal mb-2 mt-1">{Details[0]['shortDes']}</p>
                            {
                                Details[0]['discount'] ? (
                                    <span className="bodyXLarge">Price: <strike class="text-secondary">{Details[0]['price']}</strike> {Details[0]['discountPrice']} </span>
                                ) : (
                                    <span className="bodyXLarge">Price: {Details[0]['price']}</span>
                                )
                            }
                            <div className="row">
                                <div className="col-4 p-2">
                                    <label className="bodySmal">Size</label>
                                    <select className="form-control my-2 form-select">
                                        <option key={Details[0]._id} value="">Size</option>
                                        {
                                            Details[0]['details']['size'].split(",").map((item, i) => {
                                                return <option key={i} value={item}>{item}</option>
                                            })
                                        }
                                    </select>
                                </div>
                                <div className="col-4  p-2">
                                    <label className="bodySmal">Color</label>
                                    <select className="form-control my-2 form-select">
                                        <option key={Details[0]._id} value="">Color</option>
                                        {
                                            Details[0]['details']['color'].split(",").map((item, i) => {
                                                return <option value={item}>{item}</option>
                                            })
                                        }
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row mt-3">
                        <ul className="nav nav-tabs" id="myTab" role="tablist">
                            <li className="nav-item" role="presentation">
                                <button className="nav-link active" id="Speci-tab" data-bs-toggle="tab" data-bs-target="#Speci-tab-pane" type="button" role="tab" aria-controls="Speci-tab-pane" aria-selected="true">Specifications</button>
                            </li>
                            <li className="nav-item" role="presentation">
                                <button className="nav-link" id="Review-tab" data-bs-toggle="tab" data-bs-target="#Review-tab-pane" type="button" role="tab" aria-controls="Review-tab-pane" aria-selected="false">Review</button>
                            </li>
                        </ul>
                        <div className="tab-content" id="myTabContent">
                            <div className="tab-pane fade show active" id="Speci-tab-pane" role="tabpanel" aria-labelledby="Speci-tab" tabIndex="0">
                                {
                                    parse(Details[0]['details']['des'])
                                }
                            </div>
                            <div className="tab-pane fade" id="Review-tab-pane" role="tabpanel" aria-labelledby="Review-tab" tabIndex="0">
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        );
    }

};
export default Details;