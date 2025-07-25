// src/App.js

import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React, { useState, Suspense, lazy } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { HomeTemplate } from './tem/HomeTemplate/HomeTemplate';
import Home from './pages/Home/Home';
import Contact from './pages/Contact/Contact';
import News from './pages/News/News';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Detail from './pages/Detail/Detail';
import Checkout from './pages/Checkout/Checkout';
import { UserTemplate } from './tem/UserTemplate/UserTemplate';
import CheckoutTemplate from './tem/CheckoutTemplate/CheckoutTemplate';
import { AdminTemplate } from './tem/AdminTemplate/AdminTemplate';
import Films from './Admin/Films/Films';
import AddNew from './Admin/Films/AddNew/AddNew';
import Edit from './Admin/Films/Edit/Edit';
import Showtimes from './Admin/Showtimes/Showtimes';

// import { history } from './util/history';
// const CheckoutTemplateLazy = lazy(() => import('./tem/CheckoutTemplate/CheckoutTemplate'))

function App() {
  const [count, setCount] = useState(0); // Dòng này có thể không cần thiết nếu bạn không dùng đến

  return (
    <BrowserRouter>
      {/* Phần JSX của bạn giữ nguyên */}

      <Routes>
        <Route path='/' element={<HomeTemplate />}>
          <Route index element={<Home />} />
          <Route path='home' element={<Home />} />
          <Route path='contact' element={<Contact />} />
          <Route path='news' element={<News />} />
          <Route path='detail/:id' element={<Detail />} />
        </Route>

        <Route element={<UserTemplate />}>
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
        </Route>

        <Route element={<CheckoutTemplate />}>
          <Route path='/checkout/:id' element={<Checkout />} />
        </Route>

        <Route path='/admin' element={<AdminTemplate />}>
            <Route index element={<Films />} /> 
            <Route path='films' element={<Films />} />
            <Route path='films/addnew' element={<AddNew />} />
            <Route path='films/edit/:id' element={<Edit />} />
            <Route path='films/showtimes/:id' element={<Showtimes />} />
          </Route>
      </Routes>


      {/* 2. ĐẶT TOASTCONTAINER Ở ĐÂY */}
      {/* Nó nằm ngoài <Routes> để có thể hiển thị trên mọi trang */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </BrowserRouter>
  );
}

export default App;