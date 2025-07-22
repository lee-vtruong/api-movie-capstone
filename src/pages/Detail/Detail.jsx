import React, { useEffect } from 'react';
import { Progress, Rate, Tabs } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import moment from 'moment';
import { NavLink } from 'react-router-dom';
import { layThongTinChiTietPhim } from '../../redux/actions/QuanLyRapAction';

export default function Detail() {
    // Lấy dữ liệu từ Redux store và URL params
    const { filmDetail } = useSelector(state => state.QuanLyPhimReducer);
    const { id } = useParams();
    const dispatch = useDispatch();

    // Gọi API để lấy chi tiết phim khi component được mount hoặc id thay đổi
    useEffect(() => {
        dispatch(layThongTinChiTietPhim(id));
    }, [id, dispatch]);

    // Hiển thị trạng thái loading nếu chưa có dữ liệu
    if (!filmDetail || Object.keys(filmDetail).length === 0) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-gray-900">
                <p className="text-2xl text-white">Đang tải dữ liệu phim...</p>
            </div>
        );
    }

    // Xử lý dữ liệu cho Tabs Lịch Chiếu
    const lichChieuItems = filmDetail.heThongRapChieu?.map((htr) => {
        return {
            key: htr.maHeThongRap,
            label: (
                <div className="flex flex-col items-center justify-center h-full p-2 text-center">
                    <img
                        src={htr.logo}
                        alt={htr.tenHeThongRap}
                        className="w-12 h-12 object-contain justify-center text-center"
                    />
                    <span className="text-xs mt-2 text-gray-400 hidden md:block justify-center text-center">
                        {htr.tenHeThongRap}
                    </span>
                </div>
            ),
            children: (
                <div className="space-y-4 max-h-[500px] overflow-y-auto">
                    {htr.cumRapChieu?.map((cumRap, index) => (
                        <div key={index} className="border-b border-gray-700 pb-4">
                            <p className="font-semibold text-lg text-green-400">{cumRap.tenCumRap}</p>
                            <p className="text-sm text-white mb-2">{cumRap.diaChi}</p>
                            <div className="flex flex-wrap gap-2">
                                {cumRap.lichChieuPhim?.slice(0, 10).map((lichChieu, index) => (
                                    <NavLink
                                        to={`/checkout/${lichChieu.maLichChieu}`}
                                        key={index}
                                        className="bg-gray-700 hover:bg-green-600 text-white font-semibold py-2 px-3 rounded-md transition-colors"
                                    >
                                        {moment(lichChieu.ngayChieuGioChieu).format('HH:mm A')}
                                    </NavLink>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            )
        };
    });

    return (
        <div className="relative min-h-screen">
            <div className="bg-opacity-60 absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${filmDetail.hinhAnh})` }}></div>

            <div className="bg-opacity-10 backdrop-blur-lg rounded-2xl border border-white border-opacity-20 shadow-xl text-white p-6 md:p-8">
                <div className="relative z-10 container mx-auto px-20 py-24 md:py-32">
                    <div className="flex flex-col md:flex-row gap-8">
                        <div className="flex-shrink-0 mx-auto md:mx-0">
                            <img src={filmDetail.hinhAnh} alt={filmDetail.tenPhim} className="w-48 md:w-60 rounded-lg shadow-lg" />
                        </div>
                        <div className="flex-grow text-center md:text-left">
                            <p className="text-sm text-white">{moment(filmDetail.ngayKhoiChieu).format('DD.MM.YYYY')}</p>
                            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-1">{filmDetail.tenPhim}</h1>
                            <p className="text-white mt-2">2D/Digital</p>
                        </div>
                        <div className="flex flex-col items-center justify-center flex-shrink-0">
                            <Progress
                                type="circle"
                                percent={filmDetail.danhGia * 10}
                                format={(percent) => <span className="text-2xl font-bold text-white">{percent / 10}</span>}
                                strokeColor={{ '0%': '#108ee9', '100%': '#87d068' }}
                                trailColor="rgba(255, 255, 255, 0.2)"
                                width={130}
                            />
                            <Rate className="mt-2 text-lg" allowHalf disabled value={filmDetail.danhGia / 2} />
                            <p className="text-sm text-white mt-1">{filmDetail.danhGia} điểm đánh giá</p>
                        </div>
                    </div>

                    <div className="mt-12 bg-black bg-opacity-30 rounded-lg p-5">
                        <Tabs defaultActiveKey="1" centered>
                            <Tabs.TabPane
                                tab={<span className="text-xl font-semibold text-gray-300 hover:text-white">Lịch Chiếu</span>}
                                key="1"
                            >
                                <Tabs
                                    tabPosition="left"
                                    items={lichChieuItems}
                                />
                            </Tabs.TabPane>

                            <Tabs.TabPane
                                tab={<span className="text-xl font-semibold text-gray-300 hover:text-white">Thông Tin</span>}
                                key="2"
                            >
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-6 pt-4 text-base">
                                    <div className="space-y-4">
                                        <div className="flex">
                                            <p className="w-1/3 font-semibold text-white">Ngày công chiếu</p>
                                            <p className="w-2/3  text-gray-300">{moment(filmDetail.ngayKhoiChieu).format('DD.MM.YYYY')}</p>
                                        </div>
                                        <div className="flex">
                                            <p className="w-1/3 font-semibold text-gray-300">Đạo diễn</p>
                                            <p className="w-2/3   text-gray-300">N/A</p>
                                        </div>
                                        <div className="flex">
                                            <p className="w-1/3 font-semibold text-gray-300">Diễn viên</p>
                                            <p className="w-2/3   text-gray-300">N/A</p>
                                        </div>
                                        <div className="flex">
                                            <p className="w-1/3 font-semibold text-gray-300">Định dạng</p>
                                            <p className="w-2/3   text-gray-300">2D/Digital</p>
                                        </div>
                                    </div>

                                    <div>
                                        <p className="font-semibold text-white mb-2">Nội dung</p>
                                        <p className="text-gray-300">{filmDetail.moTa}</p>
                                    </div>
                                </div>
                            </Tabs.TabPane>

                            <Tabs.TabPane
                                tab={<span className="text-xl font-semibold text-gray-300 hover:text-white">Đánh Giá</span>}
                                key="3"
                            >
                                <div className="pt-4 text-center text-gray-300">
                                    <p className="mb-4">Bạn nghĩ gì về phim này?</p>
                                    <textarea
                                        className="w-full max-w-lg p-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                                        rows="4"
                                        placeholder="Để lại bình luận của bạn..."
                                    ></textarea>
                                    <div>
                                        <button className="mt-5 bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-6 rounded transition-colors">
                                            Gửi đánh giá
                                        </button>
                                    </div>
                                </div>
                            </Tabs.TabPane>
                        </Tabs>
                    </div>
                </div>
            </div>
        </div>
    );
}