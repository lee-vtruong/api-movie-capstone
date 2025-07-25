// src/tem/CheckoutTemplate/CheckoutTemplate.jsx

import React, { Fragment, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { USER_LOGIN } from '../../util/settings/config';
import { toast } from 'react-toastify';

const CheckoutTemplate = () => {
    const navigate = useNavigate();

    useEffect(() => {
        if (!localStorage.getItem(USER_LOGIN)) {
            toast.error('Bạn cần đăng nhập để truy cập trang này!');
            navigate('/login', { replace: true });
        }
    }, []); 
    if (!localStorage.getItem(USER_LOGIN)) {
        return null;
    }

    return (
        <Fragment>
            <Outlet /> 
        </Fragment>
    );
};

export default CheckoutTemplate;