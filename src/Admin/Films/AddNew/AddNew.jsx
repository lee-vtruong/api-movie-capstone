import React, { useState } from 'react';
import { Form, Input, Button, DatePicker, InputNumber, Switch, Upload, Spin } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useFormik } from 'formik';
import moment from 'moment';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { themPhimUploadAction } from '../../../redux/actions/QuanLyPhimAction'; 
import { GROUPID } from '../../../util/settings/config'; 
import { FilmForm } from '../FilmForm'; 

const AddNew = () => {
    const [imgSrc, setImgSrc] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            tenPhim: '',
            trailer: '',
            moTa: '',
            ngayKhoiChieu: null,
            dangChieu: false,
            sapChieu: false,
            hot: false,
            danhGia: 5,
            hinhAnh: null,
            maNhom: GROUPID
        },
        validationSchema: Yup.object({
            tenPhim: Yup.string().required('Tên phim không được để trống!'),
            trailer: Yup.string().required('Trailer không được để trống!'),
            moTa: Yup.string().required('Mô tả không được để trống!'),
            ngayKhoiChieu: Yup.date().required('Ngày khởi chiếu không được để trống!').nullable(),
            danhGia: Yup.number().min(1, 'Đánh giá phải từ 1 đến 10').max(10, 'Đánh giá phải từ 1 đến 10'),
            hinhAnh: Yup.mixed().required('Hình ảnh không được để trống!')
        }),
        onSubmit: async (values) => {
            setIsSubmitting(true);
            let formData = new FormData();

            Object.keys(values).forEach(key => {
                if (key === 'hinhAnh') {
                    if (values.hinhAnh) {
                        formData.append('File', values.hinhAnh, values.hinhAnh.name);
                    }
                } else if (key === 'ngayKhoiChieu') {
                    if (values.ngayKhoiChieu) {
                        formData.append(key, moment(values.ngayKhoiChieu).format('DD/MM/YYYY'));
                    }
                } else {
                    formData.append(key, values[key]);
                }
            });

            try {
                await dispatch(themPhimUploadAction(formData));
                toast.success('Thêm phim thành công!');
                navigate('/admin/films');
            } catch (error) {
                console.error("Lỗi khi thêm phim:", error);
                toast.error(error.response?.data?.content || 'Thêm phim thất bại, vui lòng thử lại!');
            } finally {
                setIsSubmitting(false);
            }
        }
    });

    const handleChangeDatePicker = (value) => {
        formik.setFieldValue('ngayKhoiChieu', value);
    };

    const handleChangeSwitch = (name) => {
        return (value) => formik.setFieldValue(name, value);
    };
    
    const handleChangeInputNumber = (value) => {
        formik.setFieldValue('danhGia', value);
    };

    const handleCustomRequest = ({ file, onSuccess }) => {
        formik.setFieldValue('hinhAnh', file);
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => setImgSrc(reader.result);
        onSuccess("ok");
    };


    return <FilmForm formik={formik} imgSrc={imgSrc} setImgSrc={setImgSrc} isSubmitting={isSubmitting} />;
};

export default AddNew;