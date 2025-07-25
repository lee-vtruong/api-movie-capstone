import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import moment from 'moment';
import { useSelector, useDispatch } from 'react-redux';
import { FilmIcon } from '@heroicons/react/24/outline';
import { layDanhSachHeThongRapAction } from '../../../redux/actions/QuanLyRapAction';

export default function HomeMenu(props) { 
    const { heThongRapChieu } = useSelector(state => state.QuanLyRapReducer);
    const dispatch = useDispatch();

    useEffect(() => {
        if (!heThongRapChieu || heThongRapChieu.length === 0) {
            dispatch(layDanhSachHeThongRapAction());
        }
    }, [dispatch, heThongRapChieu]); 

    const [selectedHeThong, setSelectedHeThong] = useState('');
    const [selectedCumRap, setSelectedCumRap] = useState('');

    useEffect(() => {
        if (heThongRapChieu.length > 0 && !selectedHeThong) {
            const firstHeThong = heThongRapChieu[0];
            setSelectedHeThong(firstHeThong.maHeThongRap);
            if (firstHeThong.lstCumRap.length > 0) {
                setSelectedCumRap(firstHeThong.lstCumRap[0].maCumRap);
            }
        }
    }, [heThongRapChieu, selectedHeThong]);

    const activeHeThong = heThongRapChieu.find(ht => ht.maHeThongRap === selectedHeThong);
    const activeCumRap = activeHeThong?.lstCumRap.find(cr => cr.maCumRap === selectedCumRap);

    if (heThongRapChieu.length === 0) {
        return <div className="text-center p-10 bg-gray-900 text-white">Đang tải dữ liệu rạp chiếu...</div>;
    }

    return (
        <div className="bg-black py-16">
            <div className="container mx-auto px-4">
                <h2 className="text-4xl font-bold text-center text-white mb-12">
                    Lịch Chiếu <span className="text-cyan-400">Hôm Nay</span>
                </h2>
                <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl shadow-2xl shadow-cyan-500/10 h-[700px] flex overflow-hidden">
                    {/* Cột 1: Hệ Thống Rạp */}
                    <div className="w-24 border-r border-gray-800 p-2 space-y-2 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700">
                        {heThongRapChieu.map(ht => (
                            <div
                                key={ht.maHeThongRap}
                                className={`relative p-3 rounded-lg cursor-pointer transition-all duration-300
                                            ${selectedHeThong === ht.maHeThongRap ? 'bg-gray-800' : 'opacity-60 hover:opacity-100 hover:bg-gray-800/50'}`}
                                onClick={() => {
                                    setSelectedHeThong(ht.maHeThongRap);
                                    setSelectedCumRap(ht.lstCumRap[0]?.maCumRap || '');
                                }}
                            >
                                <img src={ht.logo} alt={ht.tenHeThongRap} className="w-12 h-12 mx-auto" />
                                {selectedHeThong === ht.maHeThongRap && (
                                    <span className="absolute left-0 top-1/2 -translate-y-1/2 h-8 w-1 bg-cyan-400 rounded-r-full"></span>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Cột 2: Cụm Rạp */}
                    <div className="w-1/3 border-r border-gray-800 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700">
                        {activeHeThong?.lstCumRap.map(cr => (
                            <div
                                key={cr.maCumRap}
                                className={`flex items-start gap-4 p-4 cursor-pointer transition-colors duration-200 border-b border-gray-800 
                                            ${selectedCumRap === cr.maCumRap ? 'bg-gray-800' : 'hover:bg-gray-800/50'}`}
                                onClick={() => setSelectedCumRap(cr.maCumRap)}
                            >
                                <img
                                    src={cr.hinhAnh}
                                    alt={cr.tenCumRap}
                                    className="w-16 h-16 object-cover rounded-lg flex-shrink-0"
                                    onError={(e) => { e.target.onerror = null; e.target.src = `https://picsum.photos/seed/${cr.maCumRap}/100/100` }}
                                />
                                <div className="text-white">
                                    <p className={`font-semibold transition-colors ${selectedCumRap === cr.maCumRap ? 'text-cyan-400' : 'text-white'}`}>{cr.tenCumRap}</p>
                                    <p className="text-sm text-gray-400 truncate w-full max-w-xs">{cr.diaChi}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Cột 3: Lịch Chiếu Phim */}
                    <div className="flex-1 overflow-y-auto p-6 scrollbar-thin scrollbar-thumb-gray-700">
                        {activeCumRap ? (
                            activeCumRap.danhSachPhim.map(phim => (
                                <div key={phim.maPhim} className="mb-8 last:mb-0">
                                    <div className="flex items-start gap-5 mb-4">
                                        <img
                                            src={phim.hinhAnh}
                                            alt={phim.tenPhim}
                                            className="w-24 h-36 object-cover rounded-lg shadow-lg"
                                            onError={(e) => { e.target.onerror = null; e.target.src = `https://picsum.photos/seed/${phim.maPhim}/96/144` }}
                                        />
                                        <div className="text-white">
                                            <h3 className="font-bold text-xl mb-1">{phim.tenPhim}</h3>
                                            <div className="flex gap-2 mt-1">
                                                {phim.hot && <span className="bg-red-600/80 text-white text-xs px-2.5 py-1 rounded-full font-semibold">HOT</span>}
                                            </div>
                                            <p className="text-sm text-gray-400 mt-2">120 phút - 2D Digital</p>
                                        </div>
                                    </div>
                                    
                                    <div className="flex flex-wrap gap-3">
                                        {phim.lstLichChieuTheoPhim.slice(0, 10).map(lichChieu => (
                                            <NavLink
                                                to={`/checkout/${lichChieu.maLichChieu}`}
                                                key={lichChieu.maLichChieu}
                                                className="bg-white/10 text-cyan-300 font-bold py-2 px-4 rounded-lg 
                                                           hover:bg-cyan-500 hover:text-white transition-all duration-300"
                                            >
                                                {moment(lichChieu.ngayChieuGioChieu).format('HH:mm')}
                                            </NavLink>
                                        ))}
                                    </div>
                                    <hr className="mt-8 border-gray-800"/>
                                </div>
                            ))
                        ) : (
                            <div className="flex flex-col items-center justify-center h-full text-gray-600">
                                <FilmIcon className="w-24 h-24 mb-4" />
                                <p className="text-lg">Vui lòng chọn cụm rạp để xem lịch chiếu.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}