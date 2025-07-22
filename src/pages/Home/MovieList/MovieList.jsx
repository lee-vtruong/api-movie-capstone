import React, { useEffect, useRef, useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Film from '../../../componets/Film/Film';
import { layDanhSachPhimAction } from '../../../redux/actions/QuanLyPhimAction';

export default function MovieList() {
    const { arrFilm } = useSelector(state => state.QuanLyPhimReducer);
    const scrollRef = useRef(null);
    const dispatch = useDispatch();

    const [activeTab, setActiveTab] = useState('dangChieu');

    useEffect(() => {
        dispatch(layDanhSachPhimAction());
    }, [dispatch]);

    const filteredFilms = useMemo(() => {
        if (activeTab === 'dangChieu') {
            return arrFilm.filter(phim => phim.dangChieu === true);
        }
        if (activeTab === 'sapChieu') {
            return arrFilm.filter(phim => phim.sapChieu === true);
        }
        return arrFilm; 
    }, [arrFilm, activeTab]);

 
    const ITEM_WIDTH = 260 + 16; 

    const scrollLeft = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({ left: -ITEM_WIDTH * 2, behavior: 'smooth' });
        }
    };

    const scrollRight = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({ left: ITEM_WIDTH * 2, behavior: 'smooth' });
        }
    };

    const renderPhim = () => {
        return filteredFilms.map((phim, index) => (
            <div
                key={phim.maPhim || index} 
                className="min-w-[260px] max-w-[260px] flex-shrink-0"
            >
                <Film phim={phim} />
            </div>
        ));
    };
    
    const getTabClass = (tabName) => {
        return `px-6 py-2 text-lg font-semibold rounded-lg cursor-pointer transition-all duration-300 ${
            activeTab === tabName
                ? 'bg-red-600 text-white shadow-lg'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
        }`;
    };

    return (
        <div className="py-10 container mx-auto">
            <div className="flex justify-center items-center gap-4 mb-8">
                <button
                    onClick={() => setActiveTab('dangChieu')}
                    className={getTabClass('dangChieu')}
                >
                    Đang Chiếu
                </button>
                <button
                    onClick={() => setActiveTab('sapChieu')}
                    className={getTabClass('sapChieu')}
                >
                    Sắp Chiếu
                </button>
            </div>

            <div className="relative px-6">
                <button
                    onClick={scrollLeft}
                    className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white shadow-md rounded-full p-3 z-10 hover:bg-gray-200"
                >
                    <i className="fa-solid fa-chevron-left text-gray-700 text-lg"></i>
                </button>

                <button
                    onClick={scrollRight}
                    className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white shadow-md rounded-full p-3 z-10 hover:bg-gray-200"
                >
                    <i className="fa-solid fa-chevron-right text-gray-700 text-lg"></i>
                </button>

                <div
                    ref={scrollRef}
                    className="flex overflow-x-scroll scroll-smooth scrollbar-hide" 
                >
                    <div className="flex gap-4 py-6">
                        {renderPhim()}
                    </div>
                </div>
            </div>
        </div>
    );
}