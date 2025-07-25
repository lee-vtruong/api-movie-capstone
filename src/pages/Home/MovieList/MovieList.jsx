import React, { useEffect, useRef, useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';
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

    const ITEM_WIDTH = 260 + 24;

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
            <div key={phim.maPhim || index} className="w-[260px] flex-shrink-0">
                <Film phim={phim} />
            </div>
        ));
    };

    const getTabClass = (tabName) => {
        return `px-5 py-2.5 text-base font-semibold rounded-full cursor-pointer transition-all duration-300 ease-in-out ${
            activeTab === tabName
                ? 'bg-cyan-500 text-white shadow-lg shadow-cyan-500/30'
                : 'text-gray-400 hover:text-white'
        }`;
    };

    const NavButton = ({ onClick, direction }) => (
        <button
            onClick={onClick}
            className={`absolute top-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-black/40 backdrop-blur-sm border border-white/20 text-white
                       flex items-center justify-center z-20
                       opacity-0 group-hover:opacity-100 transition-all duration-300
                       hover:bg-cyan-500/80 hover:border-cyan-400 hover:scale-110
                       ${direction === 'left' ? 'left-0 -translate-x-1/2' : 'right-0 translate-x-1/2'}`}
        >
            {direction === 'left' ? <ChevronLeftIcon className="w-8 h-8" /> : <ChevronRightIcon className="w-8 h-8" />}
        </button>
    );

    return (
        <div className="bg-gray-900 text-white py-16">
            <div className="container mx-auto px-4">
                <div className="flex flex-col sm:flex-row justify-between items-center mb-10">
                    <h2 className="text-4xl font-bold mb-4 sm:mb-0">
                        Phim <span className="text-cyan-400">Hot</span>
                    </h2>
                    <div className="inline-flex bg-gray-800 p-1.5 rounded-full space-x-2">
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
                </div>

                <div className="relative group">
                    <NavButton onClick={scrollLeft} direction="left" />
                    <NavButton onClick={scrollRight} direction="right" />
                    
                    <div className="absolute top-0 bottom-0 -left-3 w-24 bg-gradient-to-r from-gray-900 to-transparent z-10 pointer-events-none"></div>
                    <div className="absolute top-0 bottom-0 -right-3 w-24 bg-gradient-to-l from-gray-900 to-transparent z-10 pointer-events-none"></div>

                    <div
                        ref={scrollRef}
                        className="flex overflow-x-scroll scroll-smooth scrollbar-hide -mx-3"
                    >
                        <div className="flex gap-6 px-3">
                            {renderPhim()}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}