import { QLRapService } from "../../services/quanLyRapService"
import { SET_CHI_TIET_PHIM, SET_CUM_RAP, SET_HE_THONG_RAP, SET_HE_THONG_RAP_CHIEU } from "./types/QuanLyRapType";

export const layDanhSachHeThongRapAction = () => {
    return async (dispatch) => {
        try {
            const result = await QLRapService.layDanhSachHeThongRap();

            dispatch({
                type: SET_HE_THONG_RAP_CHIEU,
                heThongRapChieu: result.data.content
            })
        } catch(errors) {
            console.log('errors', errors)
        }
    }
}

export const layThongTinChiTietPhim = (id) => {
    return async (dispatch) => {
        try {
            const result = await QLRapService.layThongTinChiTietPhim(id);
            
            dispatch({
                type: SET_CHI_TIET_PHIM,
                filmDetail: result.data.content 
            });

        } catch (errors) {
            console.log('errors', errors.response?.data);
        }
    }
}

export const layThongTinHeThongRapAction = () => {
    return async dispatch => {
        try {
            const result = await QLRapService.layThongTinHeThongRap();
            dispatch({
                type: SET_HE_THONG_RAP,
                heThongRap: result.data.content
            })
        } catch (error) {
            console.log('error', error.response?.data)
        }
    }
}

export const layThongTinCumRapAction = (maHeThongRap) => {
    return async dispatch => {
        try {
            const result = await QLRapService.layThongTinCumRapTheoHeThong(maHeThongRap);
            dispatch({
                type: SET_CUM_RAP,
                cumRap: result.data.content
            })
        } catch (error) {
            console.log('error', error.response?.data)
        }
    }
}