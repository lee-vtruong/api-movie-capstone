import React, { useEffect } from 'react';
import { Progress, Rate, Tabs, Spin } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import moment from 'moment';
import { NavLink } from 'react-router-dom';
import { layThongTinChiTietPhim } from '../../redux/actions/QuanLyRapAction';

const { TabPane } = Tabs;

export default function Detail() {
    const { filmDetail } = useSelector(state => state.QuanLyPhimReducer);
    const { id } = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(layThongTinChiTietPhim(id));
    }, [id, dispatch]);

    if (!filmDetail || Object.keys(filmDetail).length === 0) {
        return (
            <div className="flex justify-center items-center w-full h-screen bg-gray-900">
                <Spin size="large" tip="Đang tải dữ liệu phim..." />
            </div>
        );
    }

    const renderLichChieuTabs = () => (
        <Tabs
            tabPosition="left"
            className="lich-chieu-tabs"
            items={filmDetail.heThongRapChieu?.map(htr => ({
                key: htr.maHeThongRap,
                label: (
                    <div className="flex items-center p-3 w-full transition-all duration-300">
                        <img src={htr.logo} alt={htr.tenHeThongRap} className="w-12 h-12" />
                        <span className="text-sm font-semibold ml-3 hidden xl:block">{htr.tenHeThongRap}</span>
                    </div>
                ),
                children: (
                    <div className="space-y-6 max-h-[600px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 pr-4">
                        {htr.cumRapChieu?.map(cumRap => (
                            <div key={cumRap.maCumRap}>
                                <div className="flex items-start gap-4 mb-3">
                                    <div className="flex-grow">
                                        <p className="font-semibold text-lg text-cyan-400">{cumRap.tenCumRap}</p>
                                        <p className="text-sm text-gray-400">{cumRap.diaChi}</p>
                                    </div>
                                </div>
                                <div className="flex flex-wrap gap-3">
                                    {cumRap.lichChieuPhim?.slice(0, 12).map(lichChieu => (
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
                            </div>
                        ))}
                    </div>
                )
            }))}
        />
    );

    const renderThongTinTab = () => (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-8 pt-6 text-base text-gray-200">
            <div className="space-y-4">
                <div className="flex border-b border-gray-800 pb-3">
                    <p className="w-1/3 font-semibold text-white">Ngày công chiếu</p>
                    <p className="w-2/3">{moment(filmDetail.ngayKhoiChieu).format('DD.MM.YYYY')}</p>
                </div>
                <div className="flex border-b border-gray-800 pb-3">
                    <p className="w-1/3 font-semibold text-white">Đạo diễn</p>
                    <p className="w-2/3">N/A</p>
                </div>
                <div className="flex border-b border-gray-800 pb-3">
                    <p className="w-1/3 font-semibold text-white">Diễn viên</p>
                    <p className="w-2/3">N/A</p>
                </div>
                <div className="flex border-b border-gray-800 pb-3">
                    <p className="w-1/3 font-semibold text-white">Định dạng</p>
                    <p className="w-2/3">2D/Digital</p>
                </div>
            </div>
            <div>
                <h4 className="font-semibold text-white text-lg mb-2">Nội dung</h4>
                <p className="leading-relaxed">{filmDetail.moTa}</p>
            </div>
        </div>
    );
    
    return (
        <div className="relative bg-gray-900 text-white">
            <div className="relative h-[60vh] md:h-[70vh]">
                <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url(${filmDetail.hinhAnh})` }}></div>
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/80 to-transparent"></div>
                <div className="relative z-10 container mx-auto h-full flex items-end px-4 pb-16">
                    <div className="flex flex-col md:flex-row items-center gap-8">
                        <img src={filmDetail.hinhAnh} alt={filmDetail.tenPhim} className="w-48 md:w-60 rounded-lg shadow-2xl shadow-cyan-500/20 transform -translate-y-10 md:-translate-y-16" />
                        <div className="flex-grow text-center md:text-left">
                            <p className="text-sm text-gray-300">{moment(filmDetail.ngayKhoiChieu).format('DD.MM.YYYY')}</p>
                            <h1 className="text-4xl lg:text-5xl font-extrabold mt-1">{filmDetail.tenPhim}</h1>
                            <p className="text-cyan-400 mt-2 text-lg font-medium">120 phút - 2D Digital</p>
                        </div>
                        <div className="flex flex-col items-center justify-center flex-shrink-0">
                            <Progress
                                type="circle"
                                percent={filmDetail.danhGia * 10}
                                format={percent => <span className="text-3xl font-bold text-white">{percent / 10}</span>}
                                strokeColor={{ '0%': '#22d3ee', '100%': '#0891b2' }}
                                trailColor="rgba(255, 255, 255, 0.2)"
                                width={140}
                            />
                            <Rate className="mt-4 text-xl" allowHalf disabled value={filmDetail.danhGia / 2} />
                            <p className="text-sm text-gray-400 mt-1">{filmDetail.danhGia} điểm đánh giá</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-16 -mt-16 relative z-20">
                <div className="bg-gray-900/70 backdrop-blur-lg border border-gray-800 rounded-xl p-6 md:p-8">
                    <Tabs defaultActiveKey="lichChieu" centered className="main-detail-tabs">
                        <TabPane tab="Lịch Chiếu" key="lichChieu">
                            {filmDetail.heThongRapChieu?.length > 0 ? renderLichChieuTabs() : <p className="text-center text-gray-400 py-10">Hiện chưa có lịch chiếu cho phim này.</p>}
                        </TabPane>
                        <TabPane tab="Thông Tin" key="thongTin">
                            {renderThongTinTab()}
                        </TabPane>
                        <TabPane tab="Đánh Giá" key="danhGia">
                            <div className="pt-6 text-center text-gray-300">
                                <p className="mb-4 text-lg">Bạn nghĩ gì về phim này?</p>
                                <textarea
                                    className="w-full max-w-2xl p-3 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all"
                                    rows="4"
                                    placeholder="Viết cảm nhận của bạn..."
                                ></textarea>
                                <div className="mt-4">
                                    <button className="bg-cyan-500 hover:bg-cyan-600 text-white font-semibold py-2.5 px-8 rounded-lg shadow-lg shadow-cyan-500/20 transition-colors">
                                        Gửi
                                    </button>
                                </div>
                            </div>
                        </TabPane>
                    </Tabs>
                </div>
            </div>
        </div>
    );
}