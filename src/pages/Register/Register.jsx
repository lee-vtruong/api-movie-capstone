import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { useNavigate, NavLink } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  UserIcon, LockClosedIcon, EnvelopeIcon, PhoneIcon, IdentificationIcon
} from '@heroicons/react/24/solid';
import { dangKyAction } from '../../redux/actions/QuanLyNguoiDungAction';
import { GROUPID } from '../../util/settings/config';

const InputField = ({ formik, id, name, type, placeholder, icon: Icon, autoComplete }) => (
  <div>
    <div className="relative">
      <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
        <Icon className="w-5 h-5 text-gray-500" />
      </span>
      <input
        type={type}
        id={id}
        name={name}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values[name]}
        autoComplete={autoComplete}
        placeholder={placeholder}
        className={`w-full py-3 pl-11 pr-4 bg-gray-800 border text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all duration-300 ${
          formik.touched[name] && formik.errors[name] ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-700'
        }`}
      />
    </div>
    {formik.touched[name] && formik.errors[name] && (
      <p className="text-red-500 text-xs mt-2 pl-1">{formik.errors[name]}</p>
    )}
  </div>
);

export default function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      taiKhoan: '',
      matKhau: '',
      nhapLaiMatKhau: '',
      email: '',
      soDt: '',
      hoTen: '',
    },
    validationSchema: Yup.object({
      taiKhoan: Yup.string().required('Tài khoản không được để trống!'),
      matKhau: Yup.string().required('Mật khẩu không được để trống!').min(6, 'Mật khẩu phải có ít nhất 6 ký tự.'),
      nhapLaiMatKhau: Yup.string()
        .required('Vui lòng nhập lại mật khẩu.')
        .oneOf([Yup.ref('matKhau'), null], 'Mật khẩu nhập lại không khớp!'),
      email: Yup.string().required('Email không được để trống!').email('Email không đúng định dạng!'),
      soDt: Yup.string().required('Số điện thoại không được để trống!').matches(/^(0[0-9]{9})$/, 'Số điện thoại không hợp lệ!'),
      hoTen: Yup.string().required('Họ tên không được để trống!'),
    }),
    onSubmit: async (values) => {
      setIsLoading(true);
      try {
        const submissionData = { ...values, maNhom: GROUPID };
        delete submissionData.nhapLaiMatKhau;

        await dispatch(dangKyAction(submissionData));

        toast.success('Đăng ký thành công! Vui lòng đăng nhập.');
        setTimeout(() => {
          navigate('/login', { state: { from: '/register' } });
        }, 1500);

      } catch (error) {
        const errorMessage = error.response?.data?.content || 'Đăng ký thất bại, tài khoản hoặc email có thể đã tồn tại!';
        toast.error(errorMessage);
      } finally {
        setIsLoading(false);
      }
    },
  });

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gray-900 overflow-hidden py-12">
      <div
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1574267432553-4b4628081c31?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1631&q=80')", opacity: 0.15 }}
      ></div>

      <div className="relative z-10 w-full max-w-3xl p-8 space-y-6 bg-gray-900/70 backdrop-blur-md border border-gray-800 rounded-2xl shadow-2xl">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white">
            Tạo Tài Khoản Mới
          </h1>
          <p className="mt-2 text-gray-400">Tham gia Cyber-Movie ngay hôm nay</p>
        </div>

        <form onSubmit={formik.handleSubmit} className="space-y-6" noValidate>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
            <InputField
              formik={formik} id="taiKhoan" name="taiKhoan" type="text"
              placeholder="Tên tài khoản" icon={UserIcon} autoComplete="username"
            />
            <InputField
              formik={formik} id="hoTen" name="hoTen" type="text"
              placeholder="Họ và tên" icon={IdentificationIcon} autoComplete="name"
            />
            <InputField
              formik={formik} id="matKhau" name="matKhau" type="password"
              placeholder="Mật khẩu" icon={LockClosedIcon} autoComplete="new-password"
            />
            <InputField
              formik={formik} id="nhapLaiMatKhau" name="nhapLaiMatKhau" type="password"
              placeholder="Nhập lại mật khẩu" icon={LockClosedIcon} autoComplete="new-password"
            />
            <InputField
              formik={formik} id="email" name="email" type="email"
              placeholder="Email" icon={EnvelopeIcon} autoComplete="email"
            />
            <InputField
              formik={formik} id="soDt" name="soDt" type="tel"
              placeholder="Số điện thoại" icon={PhoneIcon} autoComplete="tel"
            />
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading || !formik.isValid}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-lg shadow-cyan-500/20 text-sm font-bold text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-cyan-500 transition-all duration-300 disabled:bg-cyan-800 disabled:cursor-not-allowed disabled:shadow-none disabled:opacity-50"
            >
              {isLoading ? (
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : 'Tạo tài khoản'}
            </button>
          </div>
        </form>

        <p className="text-sm text-center text-gray-500">
          Đã có tài khoản?{' '}
          <NavLink to="/login" className="font-medium text-cyan-400 hover:text-cyan-300 transition-colors">
            Đăng nhập
          </NavLink>
        </p>
      </div>
    </div>
  );
}