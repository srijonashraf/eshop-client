import React, { useState } from 'react';
import ProductStore from '../../store/ProductStore';
import { Space, Table, Input, Button } from "antd";
import toast from 'react-hot-toast';
import { DeleteAlert } from '../../utility/Utility.js';

const Categories = () => {
    const { CategoryList, UpdateCategoryRequest, CategoryListRequest, DeleteCategoryRequest } = ProductStore();
    const [formValue, setFormValue] = useState({
        categoryName: '',
        categoryImg: '',
        editCategoryId: null,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValue({
            ...formValue,
            [name]: value
        });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file.size > 200 * 1024) {
            toast.error('Image size exceeds 200 KB!');
            return;
        }
        const reader = new FileReader();
        reader.onload = () => {
            setFormValue({
                ...formValue,
                categoryImg: reader.result
            });
        };
        reader.readAsDataURL(file);
    };

    const handleSave = async (id) => {
        if (formValue.categoryName === '' || formValue.categoryImg === '') {
            toast.error('Please enter all the fields');
            return;
        }
        const { editCategoryId, ...value } = formValue;
        try {
            await UpdateCategoryRequest(id, value);
            await CategoryListRequest();
            setFormValue({
                categoryName: '',
                categoryImg: '',
                editCategoryId: null,
            });
            document.getElementById('categoryImg').value = '';
            toast.success('Category updated successfully');
        } catch (error) {
            console.error('Error occurred while updating category:', error);
        }
    };

    const handleEdit = (record) => {
        setFormValue({
            categoryName: record.categoryName,
            categoryImg: record.image,
            editCategoryId: record.key,
        });
    };

    const columns = [
        {
            title: "Category Image",
            dataIndex: "image",
            key: "image",
            render: (image, record) => {
                if (record.key === formValue.editCategoryId) {
                    return (
                        <input className='form-control form-control-sm rounded-2' type="file" accept="image/*" onChange={handleImageChange} />
                    );
                } else {
                    return <img src={image} alt="Category" style={{ width: 50, height: 50 }} />;
                }
            }
        },
        {
            title: "Category Name",
            dataIndex: "categoryName",
            key: "categoryName",
            render: (text, record) => {
                if (record.key === formValue.editCategoryId) {
                    return (
                        <Input
                            name="categoryName"
                            value={formValue.categoryName}
                            onChange={handleChange}
                        />
                    );
                }
                return text;
            }
        },
        {
            title: "Action",
            key: "action",
            render: (_, record) => (
                <Space size="middle">
                    {record.key === formValue.editCategoryId ? (
                        <>
                            <Button onClick={() => handleSave(record.key)}>Save</Button>
                            <Button onClick={() => setFormValue({
                                categoryName: '',
                                categoryImg: '',
                                editCategoryId: null,
                            })}>Cancel</Button>
                        </>
                    ) : (
                        <>
                            <Button onClick={() => handleEdit(record)}>Edit</Button>
                            <Button onClick={async () => {
                                const confirmed = await DeleteAlert();
                                if (confirmed) {
                                    if (DeleteCategoryRequest(record.key)) {
                                        await CategoryListRequest();
                                        toast.success("Categoty Deleted");
                                    } else {
                                        toast.error("Something Went Wrong");
                                    }
                                }
                            }}>Delete</Button>
                        </>
                    )}
                </Space>
            )
        }
    ];

    const dataSource = CategoryList?.map(category => ({
        key: category._id,
        image: category.categoryImg,
        categoryName: category.categoryName
    }));

    return (
        <div>
            <Table columns={columns} dataSource={dataSource} />
        </div>
    );
};

export default Categories;
