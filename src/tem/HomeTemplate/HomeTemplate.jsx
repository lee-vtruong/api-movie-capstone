import React, { Fragment, useEffect } from 'react';
import { Outlet } from 'react-router-dom'; // Import Outlet
import { useDispatch } from 'react-redux';
import HeaderLayout from './Header/HeaderLayout';
import FooterLayout from './Footer/FooterLayout';
import CarouselLayout from './Carousel/CarouselLayout';
import { layDanhSachHeThongRapAction } from '../../redux/actions/QuanLyRapAction';

export const HomeTemplate = () => { 
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(layDanhSachHeThongRapAction());
    }, [dispatch]);
    return (
        <Fragment>
            <HeaderLayout/> 
            <hr />
            <Outlet /> 
            <hr />
            <FooterLayout/>
        </Fragment>
    );
};