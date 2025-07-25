import { QLPhimService } from "../../services/quanLyPhimService";
import { SET_DANH_SACH_PHIM, SET_THONG_TIN_PHIM_EDIT } from "./types/QuanLyPhimType";
import { toast } from 'react-toastify';

export const layDanhSachPhimAction = (tenPhim = '') => {
    return async (dispatch) => {
        try {
            const result = await QLPhimService.layDanhSachPhim(tenPhim);

            dispatch({
                type: SET_DANH_SACH_PHIM,
                arrFilm: result.data.content
            });
        } catch (errors) {
            console.log('errors', errors.response?.data);
        }
    }
}

export const xoaPhimAction = (maPhim) => {
    return async (dispatch) => {
        try {
            const result = await QLPhimService.xoaPhim(maPhim);
            toast.success('Xóa phim thành công!');
            
            dispatch(layDanhSachPhimAction());

        } catch (errors) {
            console.log('errors', errors.response?.data);
            toast.error('Xóa phim thất bại!');
        }
    }
}

export const themPhimUploadAction = (formData) => {
    return async (dispatch) => {
        try {
            const result = await QLPhimService.themPhimUploadHinh(formData);
            return result; 
        } catch (errors) {
            console.log(errors.response?.data);
            throw errors; 
        }
    }
}


export const layThongTinPhimAction = (maPhim) => {
    return async (dispatch) => {
        try {
            const result = await QLPhimService.layThongTinPhim(maPhim);
            dispatch({
                type: SET_THONG_TIN_PHIM_EDIT,
                thongTinPhim: result.data.content
            });
        } catch (error) {
            console.log('Error fetching film info:', error.response?.data);
        }
    }
};

export const capNhatPhimUploadAction = (formData) => {
    return async (dispatch) => {
        try {
            const result = await QLPhimService.capNhatPhimUpload(formData);
            return result;
        } catch (error) {
            console.log('Error updating film:', error.response?.data);
            throw error;
        }
    }
};
