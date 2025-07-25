import React, { useEffect, Fragment } from 'react';
import { Button, Table, Input, Popconfirm, Tag, Tooltip } from 'antd';
import { EditOutlined, DeleteOutlined, CalendarOutlined, PlusOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { layDanhSachPhimAction, xoaPhimAction } from '../../redux/actions/QuanLyPhimAction';

const { Search } = Input;

export default function Films() {
    const { arrFilm } = useSelector(state => state.QuanLyPhimReducer);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(layDanhSachPhimAction());
    }, [dispatch]);

    const columns = [
        { title: 'Mã Phim', dataIndex: 'maPhim', sorter: (a, b) => a.maPhim - b.maPhim, width: '8%', align: 'center' },
        { title: 'Hình Ảnh', dataIndex: 'hinhAnh', render: (text, film) => <img src={film.hinhAnh} alt={film.tenPhim} width={60} height={80} className="object-cover rounded-md" onError={(e) => { e.target.onerror = null; e.target.src = `https://picsum.photos/id/${film.maPhim}/60/80`; }} />, width: '8%', align: 'center' },
        { title: 'Tên Phim', dataIndex: 'tenPhim', sorter: (a, b) => a.tenPhim.localeCompare(b.tenPhim), width: '25%' },
        { title: 'Mô Tả', dataIndex: 'moTa', render: (text) => <p className="text-gray-600">{text.length > 80 ? text.slice(0, 80) + '...' : text}</p>, width: '44%' },
        {
            title: 'Hành Động', dataIndex: 'maPhim', render: (text, film) => (
                <div className="flex items-center space-x-4">
                    <Tooltip title="Chỉnh sửa">
                        <Button type="text" icon={<EditOutlined className="text-xl text-blue-500" />} onClick={() => navigate(`/admin/films/edit/${film.maPhim}`)} />
                    </Tooltip>
                    <Popconfirm
                        title="Xóa phim"
                        description="Bạn có chắc muốn xóa phim này không?"
                        onConfirm={() => dispatch(xoaPhimAction(film.maPhim))}
                        okText="Xóa"
                        cancelText="Hủy"
                        okButtonProps={{ danger: true }}
                    >
                        <Tooltip title="Xóa">
                            <Button type="text" danger icon={<DeleteOutlined className="text-xl" />} />
                        </Tooltip>
                    </Popconfirm>
                    <Tooltip title="Tạo lịch chiếu">
                        <Button type="text" icon={<CalendarOutlined className="text-xl text-green-500" />} onClick={() => navigate(`/admin/films/showtimes/${film.maPhim}`)} />
                    </Tooltip>
                </div>
            ), width: '15%', align: 'center'
        },
    ];

    const onSearch = (value) => {
        dispatch(layDanhSachPhimAction(value));
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold">Quản Lý Phim</h2>
                <Button size="large" type="primary" icon={<PlusOutlined />} onClick={() => navigate('/admin/films/addnew')}>
                    Thêm Phim Mới
                </Button>
            </div>
            <Search
                placeholder="Nhập tên phim cần tìm..."
                allowClear
                enterButton="Tìm kiếm"
                size="large"
                onSearch={onSearch}
                className="mb-6"
            />
            <Table columns={columns} dataSource={arrFilm} rowKey={"maPhim"} bordered />
        </div>
    );
}