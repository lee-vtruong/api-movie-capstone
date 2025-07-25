import React, { useEffect } from 'react';
import { Carousel } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getCarouselAction } from '../../../redux/actions/CarouselActions';
import './CarouselLayout.css'; 

export default function CarouselLayout() {
    const { arrCarouselImg } = useSelector(state => state.CarouselReducer);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCarouselAction);
    }, [dispatch]); 

    const renderCarouselItems = () => {
        return arrCarouselImg.map((item, index) => {
            return (
                <div key={index} className="relative h-[70vh] md:h-[80vh] lg:h-[90vh]">
                    <img
                        src={item.hinhAnh}
                        alt={`banner-${index}`}
                        className="w-full h-full object-cover"
                    />
                    
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent"></div>

                    <div className="absolute inset-0 flex items-center justify-center">
                        <button 
                            className="group w-20 h-20 md:w-24 md:h-24 rounded-full bg-white/10 backdrop-blur-sm border-2 border-white/50 flex items-center justify-center
                                       transform transition-all duration-300 ease-in-out
                                       hover:bg-cyan-500/50 hover:border-cyan-400 hover:scale-110"
                            aria-label="Play Trailer"
                        >
                            <svg className="w-8 h-8 md:w-10 md:h-10 text-white transition-transform duration-300 group-hover:scale-125" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
                                <path d="M10.804 8 5 4.633v6.734L10.804 8z"/>
                                <path d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm15 0A7 7 0 1 0 1 8a7 7 0 0 0 14 0z"/>
                            </svg>
                        </button>
                    </div>
                </div>
            );
        });
    };

    return (
        <div className="home-carousel-wrapper">
            <Carousel effect="fade" autoplay dots={{ className: 'custom-dots' }}>
                {renderCarouselItems()}
            </Carousel>
        </div>
    );
}