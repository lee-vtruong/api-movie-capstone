import React, { useState } from 'react';
import { Form, Input, Button, DatePicker, InputNumber, Switch, Upload, Spin } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import moment from 'moment';

export const FilmForm = ({ formik, imgSrc, setImgSrc, isSubmitting, isEdit = false }) => {
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

    return (
        <Spin spinning={isSubmitting} tip={isEdit ? "Đang cập nhật..." : "Đang xử lý..."}>
            <h2 className="text-3xl font-bold mb-8">{isEdit ? "Chỉnh Sửa Phim" : "Thêm Phim Mới"}</h2>
            <Form onSubmitCapture={formik.handleSubmit} labelCol={{ span: 4 }} wrapperCol={{ span: 16 }} layout="horizontal">
                <Form.Item label="Tên phim" required validateStatus={formik.touched.tenPhim && formik.errors.tenPhim ? 'error' : ''} help={formik.touched.tenPhim && formik.errors.tenPhim}>
                    <Input {...formik.getFieldProps('tenPhim')} />
                </Form.Item>
                <Form.Item label="Trailer" required validateStatus={formik.touched.trailer && formik.errors.trailer ? 'error' : ''} help={formik.touched.trailer && formik.errors.trailer}>
                    <Input {...formik.getFieldProps('trailer')} />
                </Form.Item>
                <Form.Item label="Mô tả" required validateStatus={formik.touched.moTa && formik.errors.moTa ? 'error' : ''} help={formik.touched.moTa && formik.errors.moTa}>
                    <Input.TextArea rows={4} {...formik.getFieldProps('moTa')} />
                </Form.Item>
                <Form.Item label="Ngày khởi chiếu" required validateStatus={formik.touched.ngayKhoiChieu && formik.errors.ngayKhoiChieu ? 'error' : ''} help={formik.touched.ngayKhoiChieu && formik.errors.ngayKhoiChieu}>
                    <DatePicker format="DD/MM/YYYY" onChange={handleChangeDatePicker} value={formik.values.ngayKhoiChieu} />
                </Form.Item>
                <Form.Item label="Đang chiếu" valuePropName="checked"><Switch onChange={handleChangeSwitch('dangChieu')} checked={formik.values.dangChieu} /></Form.Item>
                <Form.Item label="Sắp chiếu" valuePropName="checked"><Switch onChange={handleChangeSwitch('sapChieu')} checked={formik.values.sapChieu} /></Form.Item>
                <Form.Item label="Hot" valuePropName="checked"><Switch onChange={handleChangeSwitch('hot')} checked={formik.values.hot} /></Form.Item>
                <Form.Item label="Đánh giá" required validateStatus={formik.touched.danhGia && formik.errors.danhGia ? 'error' : ''} help={formik.touched.danhGia && formik.errors.danhGia}>
                    <InputNumber min={1} max={10} onChange={handleChangeInputNumber} value={formik.values.danhGia} />
                </Form.Item>
                <Form.Item label="Hình ảnh" required={!isEdit} validateStatus={formik.touched.hinhAnh && formik.errors.hinhAnh ? 'error' : ''} help={formik.touched.hinhAnh && formik.errors.hinhAnh}>
                    <Upload listType="picture-card" showUploadList={false} customRequest={handleCustomRequest}>
                        {imgSrc ? <img src={imgSrc} alt="avatar" style={{ width: '100%' }} /> : <div><PlusOutlined /><div style={{ marginTop: 8 }}>Tải ảnh</div></div>}
                    </Upload>
                </Form.Item>
                <Form.Item wrapperCol={{ offset: 4, span: 16 }}>
                    <Button type="primary" htmlType="submit" size="large" disabled={isSubmitting || !formik.isValid}>
                        {isEdit ? "Cập Nhật Phim" : "Thêm Phim"}
                    </Button>
                </Form.Item>
            </Form>
        </Spin>
    );
};