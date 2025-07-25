import React, { useEffect, useState } from 'react';
import { Form, Button, DatePicker, InputNumber, Select, Spin, Alert } from 'antd';
import { useFormik } from 'formik';
import moment from 'moment';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { layThongTinPhimAction } from '../../redux/actions/QuanLyPhimAction';
import { layThongTinHeThongRapAction, layThongTinCumRapAction } from '../../redux/actions/QuanLyRapAction';
import { taoLichChieuAction } from '../../redux/actions/QuanLyDatVeAction';

const Showtimes = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();

    const { phimEdit } = useSelector(state => state.QuanLyPhimReducer);
    const { heThongRapChieu, cumRapChieu } = useSelector(state => state.QuanLyRapReducer);

    useEffect(() => {
        dispatch(layThongTinPhimAction(id));
        dispatch(layThongTinHeThongRapAction());
    }, [id, dispatch]);

    const formik = useFormik({
        initialValues: {
            maPhim: id,
            ngayChieuGioChieu: null,
            maRap: '',
            giaVe: 75000,
        },
        validationSchema: Yup.object({
            ngayChieuGioChieu: Yup.date().required('Vui lòng chọn ngày giờ chiếu!').nullable(),
            maRap: Yup.string().required('Vui lòng chọn cụm rạp!'),
            giaVe: Yup.number().min(75000, 'Giá vé phải từ 75,000').required('Vui lòng nhập giá vé!'),
        }),
        onSubmit: async (values) => {
            setIsSubmitting(true);
            const thongTinLichChieu = {
                ...values,
                ngayChieuGioChieu: moment(values.ngayChieuGioChieu).format('DD/MM/YYYY HH:mm:ss')
            };

            try {
                await dispatch(taoLichChieuAction(thongTinLichChieu));
                toast.success('Tạo lịch chiếu thành công!');
                navigate('/admin/films');
            } catch (error) {
                toast.error(error.response?.data?.content || 'Tạo lịch chiếu thất bại!');
            } finally {
                setIsSubmitting(false);
            }
        },
    });

    const handleHeThongRapChange = (value) => {
        // Khi chọn hệ thống rạp, gọi API lấy danh sách cụm rạp tương ứng
        dispatch(layThongTinCumRapAction(value));
        // Reset trường maRap khi thay đổi hệ thống rạp
        formik.setFieldValue('maRap', '');
    };

    const onOk = (value) => {
        formik.setFieldValue('ngayChieuGioChieu', value);
    };

    const onChangeDate = (value) => {
        formik.setFieldValue('ngayChieuGioChieu', value);
    };

    const onChangeInputNumber = (value) => {
        formik.setFieldValue('giaVe', value);
    };

    if (!phimEdit) {
        return <div className="text-center p-10"><Spin size="large" tip="Đang tải thông tin phim..." /></div>;
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-1">
                <h2 className="text-3xl font-bold mb-4">{phimEdit.tenPhim}</h2>
                <img src={phimEdit.hinhAnh} alt={phimEdit.tenPhim} className="w-full rounded-lg shadow-lg" />
                <Alert
                    message="Thông tin phim"
                    description={<p className="text-gray-600 mt-2">{phimEdit.moTa.slice(0, 150)}...</p>}
                    type="info"
                    showIcon
                    className="mt-4"
                />
            </div>
            <div className="md:col-span-2">
                <Spin spinning={isSubmitting} tip="Đang tạo lịch chiếu...">
                    <h2 className="text-3xl font-bold mb-8">Tạo Lịch Chiếu</h2>
                    <Form labelCol={{ span: 6 }} wrapperCol={{ span: 18 }} onSubmitCapture={formik.handleSubmit}>
                        <Form.Item label="Hệ thống rạp" required validateStatus={formik.touched.maRap && !formik.values.maRap ? 'error' : ''}>
                            <Select placeholder="Chọn hệ thống rạp" onChange={handleHeThongRapChange} options={heThongRapChieu?.map(htr => ({ label: htr.tenHeThongRap, value: htr.maHeThongRap }))} />
                        </Form.Item>
                        <Form.Item label="Cụm rạp" required validateStatus={formik.touched.maRap && formik.errors.maRap ? 'error' : ''} help={formik.touched.maRap && formik.errors.maRap}>
                            <Select placeholder="Chọn cụm rạp" onChange={(value) => formik.setFieldValue('maRap', value)} value={formik.values.maRap || undefined} options={cumRapChieu?.map(cum => ({ label: cum.tenCumRap, value: cum.maCumRap }))} />
                        </Form.Item>
                        <Form.Item label="Ngày giờ chiếu" required validateStatus={formik.touched.ngayChieuGioChieu && formik.errors.ngayChieuGioChieu ? 'error' : ''} help={formik.touched.ngayChieuGioChieu && formik.errors.ngayChieuGioChieu}>
                            <DatePicker format="DD/MM/YYYY HH:mm:ss" showTime onChange={onChangeDate} onOk={onOk} />
                        </Form.Item>
                        <Form.Item label="Giá vé" required validateStatus={formik.touched.giaVe && formik.errors.giaVe ? 'error' : ''} help={formik.touched.giaVe && formik.errors.giaVe}>
                            <InputNumber min={75000} max={200000} step={5000} onChange={onChangeInputNumber} value={formik.values.giaVe} formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')} parser={(value) => value.replace(/\$\s?|(,*)/g, '')} />
                        </Form.Item>
                        <Form.Item wrapperCol={{ offset: 6, span: 18 }}>
                            <Button type="primary" size="large" htmlType="submit" disabled={isSubmitting || !formik.isValid}>
                                Tạo Lịch Chiếu
                            </Button>
                        </Form.Item>
                    </Form>
                </Spin>
            </div>
        </div>
    );
};

export default Showtimes;