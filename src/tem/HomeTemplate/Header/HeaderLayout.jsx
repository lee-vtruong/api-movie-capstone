import React, { Fragment } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Menu, Transition } from '@headlessui/react';
import { GlobeAltIcon, ChevronDownIcon, UserCircleIcon } from '@heroicons/react/20/solid'; 
import { useTranslation } from 'react-i18next';

import { ACCESS_TOKEN, USER_LOGIN } from '../../../util/settings/config';
import { DANG_XUAT_ACTION } from '../../../redux/actions/types/QuanLyNguoiDungType';

const LanguageSwitcher = () => {
    const { i18n } = useTranslation();
    const languages = [
        { code: 'vi', name: 'Tiếng Việt', flag: '🇻🇳' },
        { code: 'en', name: 'English', flag: '🇬🇧' },
        { code: 'zh', name: '中文', flag: '🇨🇳' },
    ];
    const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0];

    return (
        <Menu as="div" className="relative inline-block text-left">
            <Menu.Button className="inline-flex items-center justify-center w-full px-3 py-2 text-sm font-semibold text-gray-300 bg-white/5 rounded-md shadow-sm hover:bg-white/10 ring-1 ring-inset ring-gray-700 transition-colors">
                <GlobeAltIcon className="w-5 h-5" aria-hidden="true" />
                <span className="mx-1.5">{currentLanguage.flag}</span>
                <ChevronDownIcon className="w-5 h-5 text-gray-400" aria-hidden="true" />
            </Menu.Button>
            <Transition as={Fragment} enter="transition ease-out duration-100" enterFrom="transform opacity-0 scale-95" enterTo="transform opacity-100 scale-100" leave="transition ease-in duration-75" leaveFrom="transform opacity-100 scale-100" leaveTo="transform opacity-0 scale-95">
                <Menu.Items className="absolute right-0 z-10 w-40 mt-2 origin-top-right bg-gray-900/90 backdrop-blur-sm rounded-md shadow-lg ring-1 ring-white/10 focus:outline-none">
                    <div className="py-1">
                        {languages.map((lang) => (
                            <Menu.Item key={lang.code}>
                                {({ active }) => (
                                    <button
                                        onClick={() => i18n.changeLanguage(lang.code)}
                                        className={`${
                                            active || i18n.language === lang.code ? 'bg-cyan-500 text-white' : 'text-gray-300'
                                        } group flex w-full items-center rounded-md px-4 py-2 text-sm transition-colors`}
                                    >
                                        <span className="mr-3">{lang.flag}</span>
                                        {lang.name}
                                    </button>
                                )}
                            </Menu.Item>
                        ))}
                    </div>
                </Menu.Items>
            </Transition>
        </Menu>
    );
};

export default function HeaderLayout() {
    const { userLogin } = useSelector(state => state.QuanLyNguoiDungReducer);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { t } = useTranslation();

    const handleLogout = () => {
        localStorage.removeItem(USER_LOGIN);
        localStorage.removeItem(ACCESS_TOKEN);
        dispatch({ type: DANG_XUAT_ACTION });
        navigate('/');
    };

    const renderLoginNav = () => {
        if (userLogin?.accessToken) {
            return (
                <Menu as="div" className="relative inline-block text-left">
                    <Menu.Button className="inline-flex items-center justify-center w-full gap-x-2 rounded-md bg-white/5 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-white/10 ring-1 ring-inset ring-gray-700 transition-colors">
                        <UserCircleIcon className="w-6 h-6 text-cyan-400" />
                        {userLogin.taiKhoan}
                        <ChevronDownIcon className="w-5 h-5 -mr-1 text-gray-400" aria-hidden="true" />
                    </Menu.Button>
                    <Transition as={Fragment} enter="transition ease-out duration-100" enterFrom="transform opacity-0 scale-95" enterTo="transform opacity-100 scale-100" leave="transition ease-in duration-75" leaveFrom="transform opacity-100 scale-100" leaveTo="transform opacity-0 scale-95">
                        <Menu.Items className="absolute right-0 z-10 w-56 mt-2 origin-top-right bg-gray-900/90 backdrop-blur-sm rounded-md shadow-lg ring-1 ring-white/10 focus:outline-none">
                            <div className="p-1">
                                <Menu.Item>
                                    {({ active }) => (
                                        <button className={`${active ? 'bg-gray-700 text-white' : 'text-gray-300'} group flex w-full items-center rounded-md px-2 py-2 text-sm transition-colors`}>
                                            {t('profile')}
                                        </button>
                                    )}
                                </Menu.Item>
                                <div className="my-1 h-px bg-gray-700" />
                                <Menu.Item>
                                    {({ active }) => (
                                        <button
                                            onClick={handleLogout}
                                            className={`${active ? 'bg-red-600 text-white' : 'text-red-500'} group flex w-full items-center rounded-md px-2 py-2 text-sm font-semibold transition-colors`}
                                        >
                                            {t('logout')}
                                        </button>
                                    )}
                                </Menu.Item>
                            </div>
                        </Menu.Items>
                    </Transition>
                </Menu>
            );
        }

        return (
            <>
                <NavLink to="/login" className="px-4 py-2 text-sm font-medium text-gray-300 rounded-md hover:bg-white/10 transition-colors">
                    {t('signin')}
                </NavLink>
                <NavLink to="/register" className="px-4 py-2 text-sm font-semibold text-white bg-cyan-500 rounded-md hover:bg-cyan-600 transition-colors shadow-lg shadow-cyan-500/20">
                    {t('signup')}
                </NavLink>
            </>
        );
    };

    const navLinkClass = ({ isActive }) =>
        `flex items-center px-4 py-2 rounded-md text-sm font-medium transition-colors duration-300 ${
            isActive ? 'bg-white/10 text-white' : 'text-gray-400 hover:bg-white/5 hover:text-white'
        }`;

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-gray-900/80 backdrop-blur-lg border-b border-gray-500/30">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center h-16">
                    <div className="flex items-center space-x-8">
                        <NavLink to="/" aria-label="Back to homepage" className="flex-shrink-0 flex items-center p-2 transform transition-transform hover:scale-110">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 32 32" className="w-8 h-8 text-cyan-400">
                                <path d="M27.912 7.289l-1.953-1.13c-0.352-0.203-0.789-0.203-1.141 0l-6.289 3.633-6.289-3.633c-0.352-0.203-0.789-0.203-1.141 0l-1.953 1.13c-0.352 0.203-0.57 0.582-0.57 0.996v7.266l-2.281-1.316c-0.352-0.203-0.789-0.203-1.141 0l-1.953 1.13c-0.352 0.203-0.57 0.582-0.57 0.996v2.262c0 0.414 0.219 0.793 0.57 0.996l1.953 1.13c0.352 0.203 0.789 0.203 1.141 0l2.281-1.316v7.266c0 0.414 0.219 0.793 0.57 0.996l1.953 1.13c0.352 0.203 0.789 0.203 1.141 0l6.289-3.633 6.289 3.633c0.352 0.203 0.789 0.203 1.141 0l1.953-1.13c0.352-0.203 0.57-0.582 0.57-0.996v-7.266l2.281 1.316c0.352 0.203 0.789 0.203 1.141 0l1.953-1.13c0.352-0.203 0.57-0.582 0.57-0.996v-2.262c0-0.414-0.219-0.793-0.57-0.996l-1.953-1.13c-0.352-0.203-0.789-0.203-1.141 0l-2.281 1.316v-7.266c-0.004-0.414-0.223-0.793-0.574-0.996z" />
                                <path d="M22.094 19.451l-4.141-2.393v-4.783l4.141 2.393zM14.049 12.275l-4.141 2.393 4.141 2.393v-4.785zM15.998 10.096l4.141-2.393-4.141-2.393-4.141 2.393zM15.998 26.689l-6.289-3.633v-7.266l6.289 3.633zM15.998 26.689l6.289-3.633v-7.266l-6.289 3.633z" />
                            </svg>
                        </NavLink>
                        <nav className="hidden lg:flex items-center space-x-2">
                            <NavLink to="/home" className={navLinkClass}>{t('home')}</NavLink>
                            <NavLink to="/contact" className={navLinkClass}>{t('contact')}</NavLink>
                            <NavLink to="/news" className={navLinkClass}>{t('news')}</NavLink>
                        </nav>
                    </div>

                    <div className="hidden lg:flex items-center space-x-4">
                        {renderLoginNav()}
                        <LanguageSwitcher />
                    </div>

                    <div className="flex lg:hidden">
                        <button className="p-2 -mr-2 text-gray-300 rounded-md hover:bg-white/10 hover:text-white transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
}