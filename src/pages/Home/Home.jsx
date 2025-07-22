import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import HomeMenu from './HomeMenu/HomeMenu'
import MovieList from './MovieList/MovieList'
import { useSelector } from 'react-redux'
import { layDanhSachHeThongRapAction } from '../../redux/actions/QuanLyRapAction';
import CarouselLayout from '../../tem/HomeTemplate/Carousel/CarouselLayout';

export default function Home(props) {
  const { heThongRapChieu } = useSelector(state => state.QuanLyRapReducer);
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(layDanhSachHeThongRapAction());
  // }, [dispatch]);

  return (
    <div> 
      <CarouselLayout />
      <div className="container mx-auto px-4 py-10">
        <MovieList />
        <HomeMenu heThongRapChieu={heThongRapChieu} />
      </div>
    </div>
  )
}