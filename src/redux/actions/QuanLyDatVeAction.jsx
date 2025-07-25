import { toast } from "react-toastify";
import { QLDatVeService } from "../../services/quanLyDatVeService"
import { DAT_VE_HOAN_TAT, SET_CHI_TIET_PHONG_VE } from "./types/QuanLyDatVeType";

export const layChiTietPhongVeAction = (maLichChieu) => {
    return async (dispatch) => {
        try {
            const result = await QLDatVeService.layChiTietPhongVe(maLichChieu);
            if (result.status === 200) {
                dispatch({
                    type: SET_CHI_TIET_PHONG_VE,
                    chiTietPhongVe: result.data.content
                });
            }
        } catch (error){
            console.log('errors', error);
        }
    }
}

export const datVeAction = (thongTinDatVe) => {
    return async (dispatch) => {
        try {
            const result = await QLDatVeService.datVe(thongTinDatVe);

          
            await dispatch(layChiTietPhongVeAction(thongTinDatVe.maLichChieu));
            await dispatch({ type: DAT_VE_HOAN_TAT });

            toast.success('Đặt vé thành công!');
            
            // Có thể chuyển hướng người dùng sang trang kết quả hoặc profile ở đây
            // navigate('/profile');
            // history.push('/');

        } catch (error) {
            console.log('Error booking tickets:', error);
            toast.error(error.response?.data?.content || 'Đặt vé thất bại, vui lòng thử lại.');
        }
    };
};

export const taoLichChieuAction = (thongTinLichChieu) => {
    return async (dispatch) => {
        try {
            const result = await QLDatVeService.taoLichChieu(thongTinLichChieu);
            return result; 
        } catch (error) {
            console.log('error', error.response?.data);
            throw error;
        }
    };
}