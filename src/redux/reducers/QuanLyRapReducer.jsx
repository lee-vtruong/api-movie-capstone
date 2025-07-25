import { SET_CHI_TIET_PHIM, SET_CUM_RAP, SET_HE_THONG_RAP, SET_HE_THONG_RAP_CHIEU } from "../actions/types/QuanLyRapType";

const stateDefault = {
    heThongRapChieu: [],
    filmDetail: null,
    cumRapChieu: []
}

export const QuanLyRapReducer = (state = stateDefault, action) => {
    switch (action.type) {
        case SET_HE_THONG_RAP_CHIEU: {
            return { ...state, heThongRapChieu: action.heThongRapChieu };
        }

        case SET_CHI_TIET_PHIM: {
            return { ...state, filmDetail: action.filmDetail };
        }

        case SET_HE_THONG_RAP: {
            state.heThongRapChieu = action.heThongRap;
            return { ...state };
        }
        case SET_CUM_RAP: {
            state.cumRapChieu = action.cumRap;
            return { ...state };
        }

        default: return state;
    }
}