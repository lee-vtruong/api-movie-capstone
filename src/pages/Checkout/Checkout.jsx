import React, { useEffect, Fragment, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { layChiTietPhongVeAction, datVeAction } from '../../redux/actions/QuanLyDatVeAction';
import { DAT_GHE, SET_GHE_NGUOI_KHAC_DANG_DAT } from '../../redux/actions/types/QuanLyDatVeType';
import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import { ACCESS_TOKEN, DOMAIN } from '../../util/settings/config';
import { toast } from 'react-toastify';
import _ from 'lodash';
import { XMarkIcon, UserIcon, EnvelopeIcon, PhoneIcon } from '@heroicons/react/24/solid';
import { Spin } from 'antd';

export default function Checkout() {
    const { userLogin } = useSelector(state => state.QuanLyNguoiDungReducer);
    const { chiTietPhongVe, danhSachGheDangDat, danhSachGheNguoiKhacDat } = useSelector(state => state.QuanLyDatVeReducer);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();
    const [isBooking, setIsBooking] = useState(false);
    const connectionRef = useRef(null);

    // LOGIC GỐC CỦA BẠN - GIỮ NGUYÊN 100%
    useEffect(() => {
        dispatch(layChiTietPhongVeAction(id));

        const connection = new HubConnectionBuilder()
            .withUrl(`${DOMAIN}DatVeHub`, {
                headers: { "Authorization": `Bearer ${localStorage.getItem(ACCESS_TOKEN)}` }
            })
            .configureLogging(LogLevel.Information)
            .build();

        connectionRef.current = connection;

        connection.start().then(() => {
            console.log('SignalR Connected.');
            connection.invoke('loadDanhSachGhe', id).catch(err => console.error("'loadDanhSachGhe' invocation failed: ", err));
            
            connection.on('loadDanhSachGheDaDat', (dsGheNguoiKhacDangDat) => {
                const gheNguoiKhac = dsGheNguoiKhacDangDat.filter(item => item.taiKhoan !== userLogin.taiKhoan);
                dispatch({
                    type: SET_GHE_NGUOI_KHAC_DANG_DAT,
                    danhSachGheNguoiKhacDat: gheNguoiKhac.map(ghe => ghe.maGhe)
                });
            });

        }).catch(err => console.error('SignalR Connection Error: ', err));

        return () => {
            connectionRef.current?.stop();
            connectionRef.current = null;
        };
    }, [id, dispatch, userLogin.taiKhoan]);

    useEffect(() => {
        if (connectionRef.current?.state === 'Connected') {
            const danhSachGheDangDatString = JSON.stringify(danhSachGheDangDat);
            connectionRef.current.invoke('datGhe', userLogin.taiKhoan, danhSachGheDangDatString, id)
                .catch(err => console.error("'datGhe' invocation failed: ", err));
        }
    }, [danhSachGheDangDat, userLogin.taiKhoan, id]);
    
    // HẾT LOGIC GỐC

    if (!chiTietPhongVe.thongTinPhim) {
        return <div className="w-full h-screen bg-gray-900 flex justify-center items-center"><Spin size="large" tip="Đang tải sơ đồ phòng vé..." /></div>;
    }

    const { thongTinPhim, danhSachGhe } = chiTietPhongVe;

    const renderSeats = () => {
        return danhSachGhe?.map((ghe, index) => {
            const classGheVip = ghe.loaiGhe === 'Vip' ? 'gheVip' : '';
            const classGheDaDat = ghe.daDat ? 'gheDaDat' : '';
            const classGheDangDat = _.some(danhSachGheDangDat, { maGhe: ghe.maGhe }) ? 'gheDangDat' : '';
            const classGheDaDuocDatBoiMinh = userLogin.taiKhoan === ghe.taiKhoanNguoiDat ? 'gheDaDuocDatBoiMinh' : '';
            const classGheNguoiKhacDat = danhSachGheNguoiKhacDat.includes(ghe.maGhe) ? 'gheNguoiKhacDat' : '';

            return (
                <Fragment key={index}>
                    <button
                        onClick={() => {
                            dispatch({ type: DAT_GHE, gheDuocChon: ghe });
                            // Logic invoke('datVe') không có trong code gốc của bạn, nên tôi sẽ không thêm vào.
                        }}
                        disabled={ghe.daDat || classGheNguoiKhacDat !== ''}
                        className={`ghe ${classGheVip} ${classGheDaDat} ${classGheDangDat} ${classGheNguoiKhacDat} ${classGheDaDuocDatBoiMinh} text-center`}
                    >
                        {ghe.daDat ? <XMarkIcon className="w-5 h-5" /> : (classGheDaDuocDatBoiMinh ? <UserIcon className="w-5 h-5" /> : ghe.stt)}
                    </button>
                    {(index + 1) % 16 === 0 && <br />}
                </Fragment>
            );
        });
    };

    const handleBookTickets = async () => {
        if (danhSachGheDangDat.length === 0) {
            toast.warn('Vui lòng chọn ít nhất một ghế!');
            return;
        }
        setIsBooking(true);
        const thongTinDatVe = {
            maLichChieu: id,
            danhSachVe: danhSachGheDangDat.map(ghe => ({ maGhe: ghe.maGhe, giaVe: ghe.giaVe }))
        };
        await dispatch(datVeAction(thongTinDatVe));
        setIsBooking(false);
    };

    return (
        <div className="relative min-h-screen w-full bg-gray-900 text-white">
            <div className="absolute inset-0 bg-cover bg-center z-0" style={{ backgroundImage: `url(${thongTinPhim.hinhAnh})`, opacity: 0.1 }}></div>
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900 to-transparent z-10"></div>
            
            <div className="relative z-20 grid grid-cols-12 gap-8 min-h-screen p-4 md:p-8">
                <div className="col-span-12 lg:col-span-8 flex flex-col">
                    <div className="flex flex-col items-center flex-grow">
                        <div className="screen"></div>
                        <h3 className="text-gray-400 text-sm mt-2">Màn hình</h3>
                        <div className="mt-8 text-center">{renderSeats()}</div>
                    </div>

                    <div className="mt-auto pt-8">
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 text-sm text-gray-300 justify-center">
                            <div className="flex items-center"><button className="ghe"></button><span>Ghế thường</span></div>
                            <div className="flex items-center"><button className="ghe gheDangDat"></button><span>Ghế đang chọn</span></div>
                            <div className="flex items-center"><button className="ghe gheVip"></button><span>Ghế VIP</span></div>
                            <div className="flex items-center"><button className="ghe gheDaDat"><XMarkIcon className="w-5 h-5"/></button><span>Ghế đã đặt</span></div>
                            <div className="flex items-center"><button className="ghe gheDaDuocDatBoiMinh"><UserIcon className="w-5 h-5"/></button><span>Ghế của bạn</span></div>
                            <div className="flex items-center"><button className="ghe gheNguoiKhacDat"></button><span>Người khác chọn</span></div>
                        </div>
                    </div>
                </div>

                <div className="col-span-12 lg:col-span-4">
                    <div className="sticky top-8 bg-gray-900/70 backdrop-blur-md border border-gray-800 rounded-2xl shadow-2xl flex flex-col h-[calc(100vh-4rem)]">
                        <div className="p-6 border-b border-gray-800 text-center">
                            <p className="text-4xl lg:text-5xl font-bold text-cyan-400">
                                {danhSachGheDangDat.reduce((total, ghe) => total + ghe.giaVe, 0).toLocaleString()} đ
                            </p>
                        </div>
                        
                        <div className="p-6 space-y-4 flex-grow overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700">
                            <div>
                                <h3 className="text-xl font-bold">{thongTinPhim.tenPhim}</h3>
                                <p className="text-gray-400">{thongTinPhim.tenCumRap}</p>
                                <p className="text-gray-400">Ngày chiếu: {thongTinPhim.ngayChieu} - {thongTinPhim.gioChieu}</p>
                            </div>

                            <hr className="border-gray-800" />
                            
                            <div className="flex justify-between items-center">
                                <p className="text-lg font-semibold text-white">Ghế đã chọn:</p>
                                <p className="text-lg font-bold text-cyan-400">{danhSachGheDangDat.length}</p>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {_.sortBy(danhSachGheDangDat, ['stt']).map(ghe => (
                                    <span key={ghe.maGhe} className="bg-cyan-900/50 text-cyan-300 text-sm font-medium px-3 py-1 rounded-full">{ghe.tenGhe}</span>
                                ))}
                            </div>
                            
                            <hr className="border-gray-800" />

                            <div className="space-y-3 text-sm">
                                <div className="flex items-center gap-3">
                                    <EnvelopeIcon className="w-5 h-5 text-gray-500" />
                                    <span className="text-gray-300">{userLogin.email}</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <PhoneIcon className="w-5 h-5 text-gray-500" />
                                    <span className="text-gray-300">{userLogin.soDT}</span>
                                </div>
                            </div>
                        </div>

                        <div className="p-6 mt-auto">
                            <button
                                onClick={handleBookTickets}
                                disabled={isBooking || danhSachGheDangDat.length === 0}
                                className="w-full flex justify-center py-4 px-4 border border-transparent rounded-lg shadow-lg shadow-cyan-500/20 text-lg font-bold text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-cyan-500 transition-all duration-300 disabled:bg-cyan-800 disabled:cursor-not-allowed disabled:shadow-none disabled:opacity-50"
                            >
                                {isBooking ? (
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                ) : 'ĐẶT VÉ'}
                            </button>
                            <p onClick={() => navigate(-1)} className="text-center text-sm text-gray-500 mt-4 cursor-pointer hover:text-white transition">Trở về</p>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
                .screen {
                    width: 80%;
                    height: 20px;
                    background: #fff;
                    border-top-left-radius: 10px;
                    border-top-right-radius: 10px;
                    box-shadow: 0 0 25px 5px rgba(0, 191, 255, 0.7);
                    transform: perspective(500px) rotateX(-15deg);
                }
                .ghe {
                    width: 35px;
                    height: 35px;
                    border-radius: 8px;
                    margin: 5px;
                    background-color: #374151; /* bg-gray-700 */
                    color: #d1d5db; /* text-gray-300 */
                    cursor: pointer;
                    transition: all 0.3s ease;
                    display: inline-flex;
                    justify-content: center;
                    align-items: center;
                    font-size: 12px;
                    font-weight: bold;
                }
                .ghe:hover:not(:disabled) {
                    transform: scale(1.1);
                    background-color: #4b5563; /* bg-gray-600 */
                }
                .ghe.gheVip {
                    background-color: #155e75; /* bg-cyan-800 */
                    border: 2px solid #22d3ee; /* border-cyan-400 */
                }
                .ghe.gheDaDat {
                    background-color: #4b5563; /* bg-gray-600 */
                    cursor: not-allowed;
                    color: #9ca3af; /* text-gray-400 */
                }
                .ghe.gheDangDat {
                    background-color: #06b6d4; /* bg-cyan-500 */
                    color: white;
                    box-shadow: 0 0 10px #22d3ee;
                }
                .ghe.gheDaDuocDatBoiMinh {
                    background-color: #164e63; /* bg-cyan-900 */
                    color: #67e8f9; /* text-cyan-300 */
                    cursor: not-allowed;
                }
                .ghe.gheNguoiKhacDat {
                    background-color: #f97316; /* bg-orange-500 */
                    cursor: not-allowed;
                }
                .ghe:disabled {
                    opacity: 0.7;
                }
            `}</style>
        </div>
    );
}