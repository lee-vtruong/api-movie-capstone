import React, { useState, useEffect } from 'react';
import { Form, Input, Button, DatePicker, InputNumber, Switch, Upload, Spin } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useFormik } from 'formik';
import moment from 'moment';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { capNhatPhimUploadAction, layThongTinPhimAction } from '../../../redux/actions/QuanLyPhimAction';
import { GROUPID } from '../../../util/settings/config';
import { FilmForm } from '../FilmForm';

const Edit = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [imgSrc, setImgSrc] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();
    const { phimEdit } = useSelector(state => state.QuanLyPhimReducer);

    useEffect(() => {
        dispatch(layThongTinPhimAction(id));
    }, [id, dispatch]);

    useEffect(() => {
        if (phimEdit) {
            setImgSrc(phimEdit.hinhAnh);
        }
    }, [phimEdit]);

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            maPhim: phimEdit?.maPhim,
            tenPhim: phimEdit?.tenPhim || '',
            trailer: phimEdit?.trailer || '',
            moTa: phimEdit?.moTa || '',
            ngayKhoiChieu: phimEdit?.ngayKhoiChieu ? moment(phimEdit.ngayKhoiChieu) : null,
            dangChieu: phimEdit?.dangChieu,
            sapChieu: phimEdit?.sapChieu,
            hot: phimEdit?.hot,
            danhGia: phimEdit?.danhGia || 5,
            hinhAnh: null,
            maNhom: GROUPID
        },
        validationSchema: Yup.object({
            tenPhim: Yup.string().required('Tên phim không được để trống!'),
            trailer: Yup.string().required('Trailer không được để trống!'),
            moTa: Yup.string().required('Mô tả không được để trống!'),
            ngayKhoiChieu: Yup.date().required('Ngày khởi chiếu không được để trống!').nullable(),
            danhGia: Yup.number().min(1, 'Đánh giá phải từ 1 đến 10').max(10, 'Đánh giá phải từ 1 đến 10'),
        }),
        onSubmit: async (values) => {
            setIsSubmitting(true);
            let formData = new FormData();

            Object.keys(values).forEach(key => {
                if (key === 'ngayKhoiChieu' && values[key]) {
                    formData.append(key, moment(values.ngayKhoiChieu).format('DD/MM/YYYY'));
                } else if (key === 'hinhAnh') {
                    if (values.hinhAnh) {
                        formData.append('File', values.hinhAnh, values.hinhAnh.name);
                    }
                } else {
                    formData.append(key, values[key]);
                }
            });

            try {
                await dispatch(capNhatPhimUploadAction(formData));
                toast.success('Cập nhật phim thành công!');
                navigate('/admin/films');
            } catch (error) {
                console.error("Lỗi khi cập nhật:", error);
                toast.error(error.response?.data?.content || 'Cập nhật phim thất bại!');
            } finally {
                setIsSubmitting(false);
            }
        }
    });

    const handleChangeDatePicker = (value) => formik.setFieldValue('ngayKhoiChieu', value);
    const handleChangeSwitch = (name) => (value) => formik.setFieldValue(name, value);
    const handleChangeInputNumber = (value) => formik.setFieldValue('danhGia', value);

    const handleCustomRequest = ({ file, onSuccess }) => {
        formik.setFieldValue('hinhAnh', file);
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => setImgSrc(reader.result);
        onSuccess("ok");
    };

    if (!phimEdit) {
        return <div className="text-center p-10"><Spin size="large" /></div>;
    }
    return <FilmForm formik={formik} imgSrc={imgSrc} setImgSrc={setImgSrc} isSubmitting={isSubmitting} isEdit={true} />;
};

export default Edit;