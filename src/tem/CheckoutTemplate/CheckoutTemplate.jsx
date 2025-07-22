import React, { Fragment, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { USER_LOGIN } from '../../util/settings/config';

const CheckoutTemplate = () => {
    const navigate = useNavigate();

    const isUserLoggedIn = !!localStorage.getItem(USER_LOGIN);

    useEffect(() => {
        if (!isUserLoggedIn) {
            navigate('/login', { replace: true });
        }
    }, [isUserLoggedIn, navigate]);

    if (!isUserLoggedIn) {
        return null;
    }

    return(
        <Fragment>
            hello
            {/* <Outlet /> nếu muốn render nested route */}
        </Fragment>
    );
};

export default CheckoutTemplate;