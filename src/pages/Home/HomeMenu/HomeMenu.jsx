import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import moment from 'moment'; 

export default function HomeMenu(props) {
    const heThongRap = props.heThongRapChieu?.content || [];

    const [selectedHeThong, setSelectedHeThong] = useState('');
    const [selectedCumRap, setSelectedCumRap] = useState('');

    useEffect(() => {
        if (heThongRap.length > 0 && !selectedHeThong) {
            setSelectedHeThong(heThongRap[0].maHeThongRap);
        }
    }, [heThongRap, selectedHeThong]); 

    const activeHeThong = heThongRap.find(ht => ht.maHeThongRap === selectedHeThong);
    const activeCumRap = activeHeThong?.lstCumRap.find(cr => cr.maCumRap === selectedCumRap);

    if (heThongRap.length === 0) {
        return <div className="text-center p-10">Đang tải dữ liệu rạp chiếu...</div>;
    }

    return (
        <div className="container mx-auto my-10 border rounded-lg shadow-lg">
            <div className="flex h-[700px]">
                
                <div className="w-1/6 border-r overflow-y-auto">
                    {heThongRap.map(ht => (
                        <div
                            key={ht.maHeThongRap}
                            className={`p-4 cursor-pointer transition-all duration-300 ${selectedHeThong === ht.maHeThongRap ? 'bg-gray-200' : 'opacity-50 hover:opacity-100'}`}
                            onClick={() => {
                                setSelectedHeThong(ht.maHeThongRap);
                                setSelectedCumRap(''); 
                            }}
                        >
                            <img src={ht.logo} alt={ht.tenHeThongRap} className="w-12 h-12 mx-auto" />
                        </div>
                    ))}
                </div>

                <div className="w-2/6 border-r overflow-y-auto">
                    {activeHeThong?.lstCumRap.map(cr => (
                        <div
                            key={cr.maCumRap}
                            className={`flex items-start gap-4 p-4 cursor-pointer transition-all duration-200 border-b ${selectedCumRap === cr.maCumRap ? 'bg-white' : 'hover:bg-gray-50'}`}
                            onClick={() => setSelectedCumRap(cr.maCumRap)}
                        >
                            <img 
                                src={cr.hinhAnh} 
                                alt={cr.tenCumRap} 
                                className="w-16 h-16 rounded" 
                                onError={(e) => { e.target.onerror = null; e.target.src = `https://picsum.photos/seed/${cr.maCumRap}/100/100` }}
                            />
                            <div>
                                <p className={`font-semibold ${selectedCumRap === cr.maCumRap ? 'text-green-600' : ''}`}>{cr.tenCumRap}</p>
                                <p className="text-sm text-gray-500 truncate">{cr.diaChi}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="w-3/6 overflow-y-auto p-4">
                    {activeCumRap ? (
                        activeCumRap.danhSachPhim.map(phim => (
                            <div key={phim.maPhim} className="mb-6 border-b pb-4">
                                <div className="flex items-start gap-4 mb-3">
                                    <img 
                                        src={phim.hinhAnh} 
                                        alt={phim.tenPhim} 
                                        className="w-20 h-28 object-cover rounded" 
                                        onError={(e) => { e.target.onerror = null; e.target.src = `https://picsum.photos/seed/${phim.maPhim}/80/112` }}
                                    />
                                    <div>
                                        <h3 className="font-bold text-xl">{phim.tenPhim}</h3>
                                        <div className="flex gap-2 mt-1">
                                            {phim.hot && <span className="bg-red-500 text-white text-xs px-2 py-1 rounded">HOT</span>}
                                            {phim.dangChieu && <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded">Đang Chiếu</span>}
                                        </div>
                                    </div>
                                </div>
                                <h4 className="font-semibold mb-2">2D Digital</h4>
                                <div className="flex flex-wrap gap-2">
                                    {phim.lstLichChieuTheoPhim.slice(0, 6).map(lichChieu => (
                                        <NavLink
                                            to={`/checkout/${lichChieu.maLichChieu}`}
                                            key={lichChieu.maLichChieu}
                                            className="bg-gray-100 text-green-700 font-semibold py-2 px-3 rounded-md hover:bg-green-100 transition-colors"
                                        >
                                            {moment(lichChieu.ngayChieuGioChieu).format('HH:mm')}
                                        </NavLink>
                                    ))}
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="flex items-center justify-center h-full">
                            <p className="text-gray-500">Vui lòng chọn một cụm rạp để xem lịch chiếu.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}