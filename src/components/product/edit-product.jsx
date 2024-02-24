import React, { useEffect, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import ProductStore from '../../store/ProductStore';
import toast from "react-hot-toast";

const EditProduct = () => {
    const { Details, DetailsRequest, UpdateProductRequest, CreateProductRequest, BrandList, BrandListRequest, CategoryList, CategoryListRequest } = ProductStore();
    const { id } = useParams();
    const [formData, setFormData] = useState({
        title: '',
        shortDes: '',
        price: '',
        discount: '',
        discountPrice: '',
        image: '',
        star: '',
        stock: '',
        remark: '',
        brandID: '',
        categoryID: '',
        img1: '',
        img2: '',
        img3: '',
        img4: '',
        img5: '',
        img6: '',
        img7: '',
        img8: '',
        des: '',
        color: '',
        size: ''
    });

    useEffect(() => {
        const fetchProductDetails = async () => {
            if (Details === null) {
                await DetailsRequest(id);
            }
        };
        fetchProductDetails();
    }, []);

    useEffect(() => {
        const fetchBrandCategory = async () => {
            if (BrandList === null) {
                await BrandListRequest();
            }
            if (CategoryList === null) {
                await CategoryListRequest();
            }
        };
        fetchBrandCategory();
    }, []);

    useEffect(() => {
        if (Details !== null) {
            setFormData({
                title: Details[0].title,
                shortDes: Details[0].shortDes,
                price: Details[0].price,
                discount: Details[0].discount,
                discountPrice: Details[0].discountPrice,
                image: Details[0].image,
                star: Details[0].star,
                stock: Details[0].stock,
                remark: Details[0].remark,
                brandID: Details[0].brandID,
                categoryID: Details[0].categoryID,
                img1: Details[0].details.img1,
                img2: Details[0].details.img2,
                img3: Details[0].details.img3,
                img4: Details[0].details.img4,
                img5: Details[0].details.img5,
                img6: Details[0].details.img6,
                img7: Details[0].details.img7,
                img8: Details[0].details.img8,
                des: Details[0].details.des,
                color: Details[0].details.color,
                size: Details[0].details.size
            });
        }

        else {
            setFormData({
                title: '',
                shortDes: '',
                price: '',
                discount: '',
                discountPrice: '',
                image: '',
                star: '',
                stock: '',
                remark: '',
                brandID: '',
                categoryID: '',
                img1: '',
                img2: '',
                img3: '',
                img4: '',
                img5: '',
                img6: '',
                img7: '',
                img8: '',
                des: '',
                color: '',
                size: ''
            })
        }
    }, [Details]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    // const handleImageChange = (event, imageName) => {
    //     const file = event.target.files[0];
    //     if (file) {
    //         const reader = new FileReader();
    //         reader.onloadend = () => {
    //             setFormData(prevState => ({
    //                 ...prevState,
    //                 [imageName]: reader.result
    //             }));
    //         };
    //         reader.readAsDataURL(file);
    //     }
    // };


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!id) {
            if (!formData.title ||
                !formData.shortDes ||
                !formData.price ||
                !formData.discount ||
                !formData.discountPrice ||
                !formData.image ||
                !formData.star ||
                !formData.stock ||
                !formData.remark ||
                !formData.brandID ||
                !formData.categoryID ||
                !formData.img1 ||
                !formData.img2 ||
                !formData.img3 ||
                !formData.img4 ||
                !formData.img5 ||
                !formData.img6 ||
                !formData.img7 ||
                !formData.img8 ||
                !formData.des ||
                !formData.color ||
                !formData.size
            ) {
                toast.error('Please fill all the fields');
                return;
            }
            await CreateProductRequest(formData);
            setFormData({
                title: '',
                shortDes: '',
                price: '',
                discount: '',
                discountPrice: '',
                image: '',
                star: '',
                stock: '',
                remark: '',
                brandID: '',
                categoryID: '',
                img1: '',
                img2: '',
                img3: '',
                img4: '',
                img5: '',
                img6: '',
                img7: '',
                img8: '',
                des: '',
                color: '',
                size: ''
            })

        }
        await UpdateProductRequest(id, formData);
        toast.success('Product updated successfully');
    };

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-3">
                    <div className="card p-3 shadow-sm">
                        <h5 className="fw-bold mb-3">eShop</h5>
                        <ul className="list-group">
                            <li className='list-group-item'><NavLink to={'/product'} className="nav-link">Product</NavLink></li>
                            <li className='list-group-item'>Category</li>
                            <li className='list-group-item'>Brand</li>
                        </ul>
                    </div>
                </div>
                <div className="col-md-9">
                    <div className="card p-5 rounded-3">

                        <form onSubmit={handleSubmit}>
                            <label htmlFor="title">Title</label>
                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                className="form-control mb-3"
                                id="title"
                            />
                            <label htmlFor="shortDes">Short Description</label>
                            <input
                                type="text"
                                name="shortDes"
                                value={formData.shortDes}
                                onChange={handleChange}
                                className="form-control mb-3"
                                id="shortDes"
                            />

                            <label htmlFor="des">Description</label>
                            <textarea
                                type="text"
                                name="des"
                                value={formData.des}
                                onChange={handleChange}
                                className="form-control mb-3"
                                id="des"
                            />

                            <label htmlFor="price">Price</label>
                            <input
                                type="text"
                                name="price"
                                value={formData.price}
                                onChange={handleChange}
                                className="form-control mb-3"
                                id="price"
                            />
                            <label htmlFor="stock">Stock</label>
                            <input
                                type="text"
                                name="stock"
                                value={formData.stock}
                                onChange={handleChange}
                                className="form-control mb-3"
                                id="stock"
                            />
                            <label htmlFor="discount">Discount</label>
                            <select
                                name="discount"
                                value={formData.discount}
                                onChange={handleChange}
                                className="form-control mb-3"
                                id="discount"
                            >
                                <option value="">Select...</option>
                                <option value="true">True</option>
                                <option value="false">False</option>
                            </select>
                            <label htmlFor="discountPrice">Discount Price</label>
                            <input
                                type="text"
                                name="discountPrice"
                                value={formData.discountPrice}
                                onChange={handleChange}
                                className="form-control mb-3"
                                id="discountPrice"
                            />
                            <label htmlFor="star">Star</label>
                            <select
                                name="star"
                                value={formData.star}
                                onChange={handleChange}
                                className="form-control mb-3"
                                id="star"
                            >
                                <option value="">Select...</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                            </select>
                            <label htmlFor="remark">Remark</label>
                            <select
                                name="remark"
                                value={formData.remark}
                                onChange={handleChange}
                                className="form-control mb-3"
                                id="remark"
                            >
                                <option value="">Select...</option>
                                <option value="top">Top</option>
                                <option value="trending">Trending</option>
                                <option value="new">New</option>
                                <option value="popular">Popular</option>
                                <option value="special">Special</option>
                            </select>

                            <label htmlFor="color">Color</label>
                            <input
                                value={formData.color}
                                onChange={handleChange}
                                type="text"
                                name="color"
                                className="form-control mb-3"
                                id="color"
                            />

                            <label htmlFor="size">Size</label>
                            <input
                                value={formData.size}
                                onChange={handleChange}
                                type="text"
                                name="size"
                                className="form-control mb-3"
                                id="size"
                            />


                            {/* <label htmlFor="mainImage">Main Image</label>
                            <input
                                accept="image/*"
                                onChange={(event) => handleImageChange(event, 'image')}
                                type="file"
                                name="mainImage"
                                className="form-control mb-3"
                                id="mainImage"
                            />

                            <label htmlFor="image1">Image-1</label>
                            <input
                                accept="image/*"
                                onChange={(event) => handleImageChange(event, 'img1')}
                                type="file"
                                name="image1"
                                className="form-control mb-3"
                                id="image1"
                            />

                            <label htmlFor="image2">Image-2</label>
                            <input
                                accept="image/*"
                                onChange={(event) => handleImageChange(event, 'img2')}
                                type="file"
                                name="image2"
                                className="form-control mb-3"
                                id="image2"
                            />

                            <label htmlFor="image3">Image-3</label>
                            <input
                                accept="image/*"
                                onChange={(event) => handleImageChange(event, 'img3')}
                                type="file"
                                name="image3"
                                className="form-control mb-3"
                                id="image3"
                            />

                            <label htmlFor="img4">Image-4</label>
                            <input
                                accept="image/*"
                                onChange={(event) => handleImageChange(event, 'img4')}
                                type="file"
                                name="img4"
                                className="form-control mb-3"
                                id="img4"
                            />

                            <label htmlFor="img5">Image-5</label>
                            <input
                                accept="image/*"
                                onChange={(event) => handleImageChange(event, 'img5')}
                                type="file"
                                name="img5"
                                className="form-control mb-3"
                                id="img5"
                            />

                            <label htmlFor="img6">Image-6</label>
                            <input
                                accept="image/*"
                                onChange={(event) => handleImageChange(event, 'img6')}
                                type="file"
                                name="img6"
                                className="form-control mb-3"
                                id="img6"
                            />

                            <label htmlFor="img7">Image-7</label>
                            <input
                                accept="image/*"
                                onChange={(event) => handleImageChange(event, 'img7')}
                                type="file"
                                name="img7"
                                className="form-control mb-3"
                                id="img7"
                            />

                            <label htmlFor="img8">Image-8</label>
                            <input
                                accept="image/*"
                                onChange={(event) => handleImageChange(event, 'img8')}
                                type="file"
                                name="img8"
                                className="form-control mb-3"
                                id="img8"
                            /> */}

                            <label htmlFor="image">Main Image</label>
                            <input
                                type="text"
                                value={formData.image}
                                onChange={handleChange}
                                name="image"
                                className="form-control mb-3"
                                id="image"
                            />

                            <label htmlFor="img1">Image-1</label>
                            <input
                                type="text"
                                value={formData.img1}
                                onChange={handleChange}
                                name="img1"
                                className="form-control mb-3"
                                id="img1"
                            />

                            <label htmlFor="img2">Image-2</label>
                            <input
                                type="text"
                                value={formData.img2}
                                onChange={handleChange}
                                name="img2"
                                className="form-control mb-3"
                                id="img2"
                            />

                            <label htmlFor="img3">Image-3</label>
                            <input
                                type="text"
                                value={formData.img3}
                                onChange={handleChange}
                                name="img3"
                                className="form-control mb-3"
                                id="img3"
                            />

                            <label htmlFor="img4">Image-4</label>
                            <input
                                type="text"
                                value={formData.img4}
                                onChange={handleChange}
                                name="img4"
                                className="form-control mb-3"
                                id="img4"
                            />

                            <label htmlFor="img5">Image-5</label>
                            <input
                                type="text"
                                value={formData.img5}
                                onChange={handleChange}
                                name="img5"
                                className="form-control mb-3"
                                id="img5"
                            />

                            <label htmlFor="img6">Image-6</label>
                            <input
                                type="text"
                                value={formData.img6}
                                onChange={handleChange}
                                name="img6"
                                className="form-control mb-3"
                                id="img6"
                            />

                            <label htmlFor="img7">Image-7</label>
                            <input
                                type="text"
                                value={formData.img7}
                                onChange={handleChange}
                                name="img7"
                                className="form-control mb-3"
                                id="img7"
                            />

                            <label htmlFor="img8">Image-8</label>
                            <input
                                type="text"
                                value={formData.img8}
                                onChange={handleChange}
                                name="img8"
                                className="form-control mb-3"
                                id="img8"
                            />

                            <label htmlFor="brandID">Brand</label>
                            <select
                                name="brandID"
                                value={formData.brandID}
                                onChange={handleChange}
                                className="form-control mb-3"
                                id="brandID"
                            >
                                <option value="">Select...</option>
                                {BrandList && Array.isArray(BrandList) && BrandList.length > 0 && (
                                    BrandList.map((brand) => (
                                        <option key={brand._id} value={brand._id}>{brand.brandName}</option>
                                    ))
                                )}
                            </select>

                            <label htmlFor="brandID">Category</label>
                            <select
                                name="categoryID"
                                value={formData.categoryID}
                                onChange={handleChange}
                                className="form-control mb-3"
                                id="categoryID"
                            >
                                <option value="">Select...</option>
                                {CategoryList && Array.isArray(CategoryList) && CategoryList.length > 0 && (
                                    CategoryList.map((category) => (
                                        <option key={category._id} value={category._id}>{category.categoryName}</option>
                                    ))
                                )}
                            </select>




                            <button type="submit" className="btn btn-success">Save</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default EditProduct;
