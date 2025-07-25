import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(LanguageDetector) 
  .use(initReactI18next) 
  .init({
    debug: true,
    fallbackLng: 'vi',
    interpolation: {
      escapeValue: false, 
    },
    resources: {
      en: {
        translation: {
          home: 'Home',
          contact: 'Contact',
          news: 'News',
          signin: 'Sign In',
          signup: 'Sign Up',
          hello: 'Hello',
          logout: 'Logout',
        }
      },
      vi: {
        translation: {
          home: 'Trang Chủ',
          contact: 'Liên Hệ',
          news: 'Tin Tức',
          signin: 'Đăng Nhập',
          signup: 'Đăng Ký',
          hello: 'Xin chào',
          logout: 'Đăng xuất',
        }
      },
      zh: {
        translation: {
          home: '主页',
          contact: '联系',
          news: '消息',
          signin: '登录',
          signup: '注册',
          hello: '你好',
          logout: '登出',
        }
      }
    }
  });

export default i18n;