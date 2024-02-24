import React, { useRef, useState } from 'react';
import toast from 'react-hot-toast';
import ProductStore from '../../store/ProductStore';

const AddCategory = () => {

    const [formData, setFormData] = useState({
        categoryName: '',
        categoryImg: ''
    })


    const { CreateCatagoryRequest, CategoryListRequest } = ProductStore();

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
                    categoryImg: reader.result
                });
            };
            reader.readAsDataURL(file);
        }
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.categoryName === '' || formData.categoryImg === '') {
            toast.error('Please fill all the fields');
            return;
        }
        await CreateCatagoryRequest(formData);
        toast.success('Category Added');
        await CategoryListRequest();
    }

    return (
        <div>
            <form className='d-flex align-items-start gap-3 mt-2' onSubmit={handleSubmit}>
                <div>
                    <label className='form-label' htmlFor="categoryName">Category Name</label>
                    <input
                        type="text"
                        name="categoryName"
                        value={formData.categoryName}
                        onChange={handleChange}
                        className="form-control form-control-sm"
                        id="categoryName"
                    />
                </div>
                <div className="d-flex flex-column">
                    <label className='form-label' htmlFor="categoryImg">Category Image</label>
                    <div className="d-flex align-items-center">
                        <input
                            type="file"
                            accept="image/*"
                            name="categoryImg"
                            onChange={handleImageChange}
                            className="form-control form-control-sm me-2"
                            id="categoryImg"
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

export default AddCategory;