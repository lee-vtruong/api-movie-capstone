import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import _ from 'lodash';

const SocialIcon = ({ href, children }) => (
    <a href={href} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-cyan-400 transition-colors duration-300">
        {children}
    </a>
);

export default function FooterLayout(props) {
    const { heThongRapChieu } = useSelector(state => state.QuanLyRapReducer);
    
    const arrHeThongRap = _.map(heThongRapChieu, (heThongRap) => _.pick(heThongRap,['maHeThongRap', 'tenHeThongRap', 'logo']));

    return (
        <footer className="bg-gray-900 border-t border-gray-800 text-gray-400">
            <div className="container mx-auto px-6 py-12 lg:py-16">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
                    
                    <div className="md:col-span-4 lg:col-span-5">
                        <NavLink to="/" aria-label="Back to homepage" className="flex items-center mb-4">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 32 32" className="w-8 h-8 mr-3 text-cyan-400">
                                <path d="M27.912 7.289l-1.953-1.13c-0.352-0.203-0.789-0.203-1.141 0l-6.289 3.633-6.289-3.633c-0.352-0.203-0.789-0.203-1.141 0l-1.953 1.13c-0.352 0.203-0.57 0.582-0.57 0.996v7.266l-2.281-1.316c-0.352-0.203-0.789-0.203-1.141 0l-1.953 1.13c-0.352 0.203-0.57 0.582-0.57 0.996v2.262c0 0.414 0.219 0.793 0.57 0.996l1.953 1.13c0.352 0.203 0.789 0.203 1.141 0l2.281-1.316v7.266c0 0.414 0.219 0.793 0.57 0.996l1.953 1.13c0.352 0.203 0.789 0.203 1.141 0l6.289-3.633 6.289 3.633c0.352 0.203 0.789 0.203 1.141 0l1.953-1.13c0.352-0.203 0.57-0.582 0.57-0.996v-7.266l2.281 1.316c0.352 0.203 0.789 0.203 1.141 0l1.953-1.13c0.352-0.203 0.57-0.582 0.57-0.996v-2.262c0-0.414-0.219-0.793-0.57-0.996l-1.953-1.13c-0.352-0.203-0.789-0.203-1.141 0l-2.281 1.316v-7.266c-0.004-0.414-0.223-0.793-0.574-0.996z" />
                                <path d="M22.094 19.451l-4.141-2.393v-4.783l4.141 2.393zM14.049 12.275l-4.141 2.393 4.141 2.393v-4.785zM15.998 10.096l4.141-2.393-4.141-2.393-4.141 2.393zM15.998 26.689l-6.289-3.633v-7.266l6.289 3.633zM15.998 26.689l6.289-3.633v-7.266l-6.289 3.633z" />
                            </svg>
                            <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">Cyber-Movie</span>
                        </NavLink>
                        <p className="mt-4 text-base">
                            Dự án demo trang web đặt vé xem phim, do Lê Văn Trường - leev.truong code.
                        </p>
                    </div>

                    <div className="md:col-span-8 lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8">
                        <div>
                            <h2 className="mb-6 text-sm font-semibold text-gray-100 tracking-wider uppercase">Đối tác</h2>
                            <div className="grid grid-cols-4 gap-4">
                                {arrHeThongRap.map((htr, index) => (
                                    <a href="#" key={index} className="opacity-80 hover:opacity-100 transform hover:scale-110 transition-all duration-300" title={htr.tenHeThongRap}>
                                        <img src={htr.logo} alt={htr.tenHeThongRap} className="w-12 h-12 rounded-full bg-white p-1 object-contain" />
                                    </a>
                                ))}
                            </div>
                        </div>
                        
                        <div>
                            <h2 className="mb-6 text-sm font-semibold text-gray-100 tracking-wider uppercase">Liên kết</h2>
                            <ul className="space-y-4">
                                <li><a href="#" className="hover:text-cyan-400 transition-colors duration-300">Về chúng tôi</a></li>
                                <li><a href="#" className="hover:text-cyan-400 transition-colors duration-300">Tuyển dụng</a></li>
                                <li><a href="#" className="hover:text-cyan-400 transition-colors duration-300">Hỏi đáp</a></li>
                            </ul>
                        </div>

                        <div>
                            <h2 className="mb-6 text-sm font-semibold text-gray-100 tracking-wider uppercase">Chính sách</h2>
                            <ul className="space-y-4">
                                <li><a href="#" className="hover:text-cyan-400 transition-colors duration-300">Chính sách bảo mật</a></li>
                                <li><a href="#" className="hover:text-cyan-400 transition-colors duration-300">Điều khoản & Điều kiện</a></li>
                            </ul>
                        </div>
                    </div>
                </div>

                <hr className="my-8 border-gray-800" />

                <div className="flex flex-col sm:flex-row items-center justify-between">
                    <span className="text-sm text-center sm:text-left">© {new Date().getFullYear()} <a href="https://www.linkedin.com/in/van-truongle/" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition-colors duration-300">leev.truong™</a>. All Rights Reserved.</span>
                    <div className="flex mt-4 sm:mt-0 space-x-6">
                        <SocialIcon href="https://www.facebook.com/VanTruong.Lee/">
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" /></svg>
                        </SocialIcon>
                        <SocialIcon href="https://github.com/lee-vtruong">
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
                        </SocialIcon>
                    </div>
                </div>
            </div>
        </footer>
    );
}