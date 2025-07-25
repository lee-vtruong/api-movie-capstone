import { SET_DANH_SACH_PHIM, SET_THONG_TIN_PHIM_EDIT } from "../actions/types/QuanLyPhimType";
import { SET_CHI_TIET_PHIM } from "../actions/types/QuanLyRapType";

const stateDefault = {
    arrFilm: [], 
    filmDetail: {},
    phimEdit: null
}

export const QuanLyPhimReducer = (state = stateDefault, action) => {
    switch (action.type) {
        case SET_DANH_SACH_PHIM: {
            return { ...state, arrFilm: action.arrFilm };
        }
        case SET_CHI_TIET_PHIM: {
            return { ...state, filmDetail: action.filmDetail || {} };
        }
        case SET_THONG_TIN_PHIM_EDIT:
            return { ...state, phimEdit: action.thongTinPhim };
        default: 
            return state;
    }
}