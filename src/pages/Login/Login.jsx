import React from 'react';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { dangNhapAction } from '../../redux/actions/QuanLyNguoiDungAction';

export default function Login() {
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      taiKhoan: '',
      matKhau: '',
    },
    onSubmit: values => {
      const action = dangNhapAction(values);
      dispatch(action);
      // console.log(values);
    },
  });

  return (
    <div className="flex items-center justify-center bg-gray-100 dark:bg-gray-900 px-4">
      <form
        onSubmit={formik.handleSubmit}
        className="w-full bg-white rounded-lg shadow dark:border sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700"
      >
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
            Đăng nhập vào tài khoản của bạn
          </h1>

          <div className="space-y-4 md:space-y-6">
            {/* Tài khoản */}
            <div>
              <label
                htmlFor="taiKhoan"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Tài khoản
              </label>
              <input
                type="text"
                name="taiKhoan"
                id="taiKhoan"
                value={formik.values.taiKhoan}
                onChange={formik.handleChange}
                required
                autoComplete="username"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg 
                  focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 
                  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white 
                  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Nhập tài khoản"
              />
            </div>

            {/* Mật khẩu */}
            <div>
              <label
                htmlFor="matKhau"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Mật khẩu
              </label>
              <input
                type="password"
                name="matKhau"
                id="matKhau"
                value={formik.values.matKhau}
                onChange={formik.handleChange}
                required
                autoComplete="current-password"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg 
                  focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 
                  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white 
                  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="••••••••"
              />
            </div>

            {/* Remember + Quên mật khẩu */}
            <div className="flex items-center justify-between">
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="remember"
                    type="checkbox"
                    className="w-4 h-4 border border-gray-300 rounded bg-gray-50 
                      focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 
                      dark:focus:ring-blue-600 dark:ring-offset-gray-800"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="remember" className="text-gray-500 dark:text-gray-300">
                    Ghi nhớ đăng nhập
                  </label>
                </div>
              </div>
              <a
                href="#"
                className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-400"
              >
                Quên mật khẩu?
              </a>
            </div>

            {/* Nút Đăng nhập */}
            <button
              type="submit"
              className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 
                focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm 
                px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 
                dark:focus:ring-blue-800"
            >
              Đăng nhập
            </button>

            {/* Link Đăng ký */}
            <p className="text-sm font-light text-gray-500 dark:text-gray-400 text-center">
              Chưa có tài khoản?{' '}
              <a
                href="/register"
                className="font-medium text-blue-600 hover:underline dark:text-blue-400"
              >
                Đăng ký ngay
              </a>
            </p>
          </div>
        </div>
      </form>
    </div>
  );
}
