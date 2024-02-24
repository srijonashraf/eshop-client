import React, { useEffect, useState } from 'react';
import ProfileSkeleton from "../../skeleton/profile-skeleton.jsx";
import toast from "react-hot-toast";
import UserStore from "../../store/UserStore.js";
import ValidationHelper from '../../utility/ValidationHelper.js';
import Avatar from 'react-avatar';

const ProfileForm = () => {
    const { ProfileDetails, ProfileForm, ProfileFormChange, ProfileDetailsRequest, ProfileSaveRequest } = UserStore();

    useEffect(() => {
        const fetchProfileDetails = async () => {
            await ProfileDetailsRequest();
        };
        fetchProfileDetails();
    }, []);

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                ProfileFormChange('avatar', reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const Save = async () => {
        if (ValidationHelper.IsMobile(ProfileForm.mobile)) {
            let res = await ProfileSaveRequest(ProfileForm);
            if (res) {
                toast.success("Profile Updated");
                await ProfileDetailsRequest();
            } else {
                toast.error("Something Went Wrong !");
            }
        } else {
            toast.error("Valid Mobile Number Required");
        }
    };

    if (ProfileDetails === null) {
        return <ProfileSkeleton />;
    } else {
        return (
            <div className="container mt-5">
                <div className="card p-5 rounded-3">
                    <Avatar value='' className='mb-2' src={ProfileForm.avatar} size="80" round={true} />
                    <hr />
                    <div className="row mb-4">
                        <div className="col-md-3 p-2">
                            <label className="form-label">Profile Picture </label>
                            <input type="file" accept="image/*" onChange={handleImageChange} className="form-control" />
                        </div>

                        <div className="col-md-3 p-2">
                            <label className="form-label">Name </label>
                            <input value={ProfileForm.name} onChange={(e) => ProfileFormChange('name', e.target.value)} type="text" className="form-control" />
                        </div>
                        <div className="col-md-3 p-2">
                            <label className="form-label">Phone </label>
                            <input value={ProfileForm.mobile} onChange={(e) => ProfileFormChange('mobile', e.target.value)} type="text" className="form-control" />
                        </div>
                        <div className="col-md-3 p-2">
                            <label className="form-label">Password </label>
                            <input value={ProfileForm.password} onChange={(e) => ProfileFormChange('password', e.target.value)} type="password" className="form-control" />
                        </div>
                    </div>

                    <div className="row mt-4">
                        <div className="col-md-3 p-2">
                            <button onClick={Save} className="btn btn-success">Save</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};

export default ProfileForm;
