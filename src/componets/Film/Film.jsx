import React from 'react';
import { Card, Tag, Rate } from 'antd';
import { NavLink } from 'react-router-dom';

const { Meta } = Card;

export default function Film({ phim }) {
    return (
        <Card
            hoverable
            className="w-full h-full shadow-md rounded-xl transition-all duration-300 hover:shadow-xl flex flex-col group"
            cover={
                <div className="relative">
                    <img
                        alt={phim.tenPhim}
                        src={phim.hinhAnh}
                        className="h-72 w-full object-cover rounded-t-xl"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
                        <NavLink 
                            to={`/detail/${phim.maPhim}`} 
                            className="bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors"
                        >
                            Mua vé
                        </NavLink>
                    </div>
                </div>
            }
            bodyStyle={{
                flex: '1 1 auto',
                display: 'flex',
                flexDirection: 'column',
                padding: '16px'
            }}
        >
            <Meta
                title={<div className="font-semibold text-lg truncate">{phim.tenPhim}</div>}
                description={<div className="text-gray-500 truncate">{phim.biDanh}</div>}
            />

            <div className="mt-auto pt-4 flex flex-col gap-1">
                <Rate allowHalf disabled value={phim.danhGia / 2} />
                <div className="text-sm text-gray-600">Đánh giá: {phim.danhGia}/10</div>

                <div className="flex gap-1 flex-wrap mt-1">
                    {phim.hot && <Tag color="volcano">HOT</Tag>}
                    {/* {phim.dangChieu && <Tag color="green">Đang chiếu</Tag>} */}
                    {/* {phim.sapChieu && <Tag color="blue">Sắp chiếu</Tag>} */}
                </div>
            </div>
        </Card>
    );
}