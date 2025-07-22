import React, { useEffect } from 'react'
import { Carousel } from 'antd';
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { getCarouselAction } from '../../../redux/actions/CarouselActions';

export default function CarouselLayout() {
    const { arrCarouselImg } = useSelector(state => state.CarouselReducer)

    const contentStyle = {
        height: '600px',
        color: '#fff',
        lineHeight: '160px',
        textAlign: 'center',
        background: '#364d79',
        backgroundPosition: 'center',
        backgroundSize: 'center',
    };

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCarouselAction);
    }, []);


    const renderImg = () => {
        return arrCarouselImg.map((item, index) => {
            return (
                <div key={index}>
                    <img
                        src={item.hinhAnh}
                        alt={`banner-${index}`}
                        className="w-full h-[550px] object-cover"
                    />
                </div>
            );
        });
    };


    return (
        <Carousel effect="fade">
            {renderImg()}
        </Carousel>
    )
}
