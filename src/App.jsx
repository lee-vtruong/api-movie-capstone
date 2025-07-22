import { useState } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route, Router } from 'react-router-dom';
import { HomeTemplate } from './tem/HomeTemplate/HomeTemplate';
import Home from './pages/Home/Home';
import Contact from './pages/Contact/Contact';
import News from './pages/News/News';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Detail from './pages/Detail/Detail';
import Checkout from './pages/Checkout/Checkout';
import CheckoutTemplate from './tem/CheckoutTemplate/CheckoutTemplate';
import { Suspense, lazy } from 'react';
import { UserTemplate } from './tem/UserTemplate/UserTemplate';

const CheckoutTemplateLazy = lazy(() => import('./tem/CheckoutTemplate/CheckoutTemplate'))

function App() {
  const [count, setCount] = useState(0);

  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
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

          <Route element={<CheckoutTemplateLazy />}>
            <Route path='/checkout/:id' element={<Checkout />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;