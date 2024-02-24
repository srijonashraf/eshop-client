import React, { useState } from 'react';
import ProductStore from '../../store/ProductStore';
import { Space, Table, Input, Button } from "antd";
import toast from 'react-hot-toast';
import { DeleteAlert } from '../../utility/Utility.js';

const Brands = () => {
    const { BrandList, UpdateBrandRequest, BrandListRequest, DeleteBrandRequest } = ProductStore();
    const [formValue, setFormValue] = useState({
        brandName: '',
        brandImg: '',
        editBrandId: null,
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
                brandImg: reader.result
            });
        };
        reader.readAsDataURL(file);
    };

    const handleSave = async (id) => {
        if (formValue.brandName === '' || formValue.brandImg === '') {
            toast.error('Please enter all the fields');
            return;
        }
        const { editBrandId, ...value } = formValue;
        try {
            await UpdateBrandRequest(id, value);
            await BrandListRequest();
            setFormValue({
                brandName: '',
                brandImg: '',
                editBrandId: null,
            });
            toast.success('Brand updated successfully');
        } catch (error) {
            console.error('Error occurred while updating brand:', error);
        }
    };

    const handleEdit = (record) => {
        setFormValue({
            brandName: record.brandName,
            brandImg: record.brandImg,
            editBrandId: record.key,
        });
    };

    const columns = [
        {
            title: "Brand Image",
            dataIndex: "image",
            key: "image",
            render: (image, record) => {
                if (record.key === formValue.editBrandId) {
                    return (
                        <input className='form-control form-control-sm rounded-2' type="file" accept="image/*" onChange={handleImageChange} />
                    );
                } else {
                    return <img src={image} alt="Brand" style={{ width: 50, height: 50 }} />;
                }
            }
        },
        {
            title: "Brand Name",
            dataIndex: "brandName",
            key: "brandName",
            render: (text, record) => {
                if (record.key === formValue.editBrandId) {
                    return (
                        <Input
                            name="brandName"
                            value={formValue.brandName}
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
                    {record.key === formValue.editBrandId ? (
                        <>
                            <Button onClick={() => handleSave(record.key)}>Save</Button>
                            <Button onClick={() => setFormValue({
                                brandName: '',
                                brandImg: '',
                                editBrandId: null,
                            })}>Cancel</Button>
                        </>
                    ) : (
                        <>
                            <Button onClick={() => handleEdit(record)}>Edit</Button>
                            <Button onClick={async () => {
                                const confirmed = await DeleteAlert();
                                if (confirmed) {
                                    if (DeleteBrandRequest(record.key)) {
                                        await BrandListRequest();
                                        toast.success("Brand Deleted");
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

    const dataSource = BrandList?.map(brand => ({
        key: brand._id,
        image: brand.brandImg,
        brandName: brand.brandName
    }));

    return (
        <div>
            <Table columns={columns} dataSource={dataSource} />
        </div>
    );
};

export default Brands;
