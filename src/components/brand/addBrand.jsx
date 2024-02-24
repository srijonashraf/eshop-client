import React, { useState } from 'react';
import ProductStore from '../../store/ProductStore';
import toast from 'react-hot-toast';

const AddBrand = () => {
    const [formData, setFormData] = useState({
        brandName: '',
        brandImg: ''
    })


    const { CreateBrandRequest, BrandListRequest } = ProductStore();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            if (file.size > 200 * 1024) {
                toast.error('Image size exceeds 200 KB!');
                event.target.value = '';
                return;
            }

            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData({
                    ...formData,
                    brandImg: reader.result
                });
            };
            reader.readAsDataURL(file);
        }
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.brandName === '' || formData.brandImg === '') {
            toast.error('Please fill all the fields');
            return;
        }
        await CreateBrandRequest(formData);
        await BrandListRequest();
        setFormData({
            brandName: '',
            brandImg: ''
        })

        document.getElementById('brandImg').value = '';
        toast.success('Brand Added');
    }

    return (

        <div>
            <form className='d-flex align-items-start gap-3 mt-2' onSubmit={handleSubmit}>
                <div>
                    <label className='form-label' htmlFor="brandName">Brand Name</label>
                    <input
                        type="text"
                        name="brandName"
                        value={formData.brandName}
                        onChange={handleChange}
                        className="form-control form-control-sm"
                        id="brandName"
                    />
                </div>
                <div className="d-flex flex-column">
                    <label className='form-label' htmlFor="brandImg">Brand Image</label>
                    <div className="d-flex align-items-center">
                        <input
                            type="file"
                            accept="image/*"
                            name="brandImg"
                            onChange={handleImageChange}
                            className="form-control form-control-sm me-2"
                            id="brandImg"
                        />
                        <button type='submit' className='btn btn-success btn-sm'>Submit</button>
                    </div>
                    <small className="text-muted">
                        JPEG or PNG images only. Maximum file size: 200KB.
                    </small>
                </div>
            </form>

        </div>
    );
};

export default AddBrand;