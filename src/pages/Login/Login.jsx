import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, NavLink, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { UserIcon, LockClosedIcon } from '@heroicons/react/24/solid';
import { dangNhapAction } from '../../redux/actions/QuanLyNguoiDungAction';

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

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userLogin } = useSelector(state => state.QuanLyNguoiDungReducer);
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (userLogin?.accessToken) {
      if (userLogin.maLoaiNguoiDung === 'QuanTri') {
        toast.info('Chào mừng quản trị viên!');
        navigate('/admin');
      } else {
        const fromRegister = location.state?.from === '/register';
        if (fromRegister) {
          navigate('/');
        } else {
          navigate(-1);
        }
      }
    }
  }, [userLogin, navigate, location.state]);

  const formik = useFormik({
    initialValues: {
      taiKhoan: '',
      matKhau: '',
    },
    validationSchema: Yup.object({
      taiKhoan: Yup.string().required('Tài khoản không được để trống!'),
      matKhau: Yup.string()
        .required('Mật khẩu không được để trống!')
        .min(6, 'Mật khẩu phải có ít nhất 6 ký tự.'),
    }),
    onSubmit: async (values) => {
      setIsLoading(true);
      try {
        await dispatch(dangNhapAction(values));
        toast.success('Đăng nhập thành công!');
      } catch (error) {
        const errorMessage = error.response?.data?.content || 'Tài khoản hoặc mật khẩu không đúng!';
        toast.error(errorMessage);
      } finally {
        setIsLoading(false);
      }
    },
  });

  if (userLogin?.accessToken) {
    return null;
  }

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gray-900 overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1574267432553-4b4628081c31?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1631&q=80')", opacity: 0.15 }}
      ></div>

      <div className="relative z-10 w-full max-w-md p-8 space-y-6 bg-gray-900/70 backdrop-blur-md border border-gray-800 rounded-2xl shadow-2xl">
        <div className="text-center">
            <NavLink to="/" aria-label="Back to homepage" className="inline-block mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 32 32" className="w-10 h-10 text-cyan-400">
                    <path d="M27.912 7.289l-1.953-1.13c-0.352-0.203-0.789-0.203-1.141 0l-6.289 3.633-6.289-3.633c-0.352-0.203-0.789-0.203-1.141 0l-1.953 1.13c-0.352 0.203-0.57 0.582-0.57 0.996v7.266l-2.281-1.316c-0.352-0.203-0.789-0.203-1.141 0l-1.953 1.13c-0.352 0.203-0.57 0.582-0.57 0.996v2.262c0 0.414 0.219 0.793 0.57 0.996l1.953 1.13c0.352 0.203 0.789 0.203 1.141 0l2.281-1.316v7.266c0 0.414 0.219 0.793 0.57 0.996l1.953 1.13c0.352 0.203 0.789 0.203 1.141 0l6.289-3.633 6.289 3.633c0.352 0.203 0.789 0.203 1.141 0l1.953-1.13c0.352-0.203 0.57-0.582 0.57-0.996v-7.266l2.281 1.316c0.352 0.203 0.789 0.203 1.141 0l1.953-1.13c0.352-0.203 0.57-0.582 0.57-0.996v-2.262c0-0.414-0.219-0.793-0.57-0.996l-1.953-1.13c-0.352-0.203-0.789-0.203-1.141 0l-2.281 1.316v-7.266c-0.004-0.414-0.223-0.793-0.574-0.996z" />
                    <path d="M22.094 19.451l-4.141-2.393v-4.783l4.141 2.393zM14.049 12.275l-4.141 2.393 4.141 2.393v-4.785zM15.998 10.096l4.141-2.393-4.141-2.393-4.141 2.393zM15.998 26.689l-6.289-3.633v-7.266l6.289 3.633zM15.998 26.689l6.289-3.633v-7.266l-6.289 3.633z" />
                </svg>
            </NavLink>
            <h1 className="text-3xl font-bold text-white">
                Chào mừng trở lại
            </h1>
            <p className="mt-2 text-gray-400">Đăng nhập để tiếp tục đến Cyber-Movie</p>
        </div>

        <form onSubmit={formik.handleSubmit} className="space-y-6" noValidate>
          <InputField
            formik={formik}
            id="taiKhoan"
            name="taiKhoan"
            type="text"
            placeholder="Tên tài khoản"
            icon={UserIcon}
            autoComplete="username"
          />

          <InputField
            formik={formik}
            id="matKhau"
            name="matKhau"
            type="password"
            placeholder="Mật khẩu"
            icon={LockClosedIcon}
            autoComplete="current-password"
          />

          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center">
              <input id="remember" type="checkbox" className="w-4 h-4 text-cyan-500 bg-gray-700 border-gray-600 rounded focus:ring-cyan-600 ring-offset-gray-900" />
              <label htmlFor="remember" className="ml-2 text-gray-400">
                Ghi nhớ
              </label>
            </div>
            <a href="#" className="font-medium text-cyan-400 hover:text-cyan-300 transition-colors">
              Quên mật khẩu?
            </a>
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
              ) : 'Đăng nhập'}
            </button>
          </div>
        </form>

        <p className="text-sm text-center text-gray-500">
          Chưa có tài khoản?{' '}
          <NavLink to="/register" className="font-medium text-cyan-400 hover:text-cyan-300 transition-colors">
            Đăng ký ngay
          </NavLink>
        </p>
      </div>
    </div>
  );
}