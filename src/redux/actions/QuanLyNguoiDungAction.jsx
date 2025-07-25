import { QLNguoiDungService, quanLyNguoiDungService } from "../../services/QuanLyNguoiDungService";
import { DANG_NHAP_ACTION } from "./types/QuanLyNguoiDungType";
import { ACCESS_TOKEN, USER_LOGIN } from "../../util/settings/config"; 

export const dangNhapAction = (thongTinDangNhap) => {
    return async (dispatch) => {
        try {
            const result = await QLNguoiDungService.dangNhap(thongTinDangNhap);

            if (result.status === 200) {
                console.log('dang nhap thanh cong', result);
                const userData = result.data.content;
                localStorage.setItem(USER_LOGIN, JSON.stringify(userData));
                localStorage.setItem(ACCESS_TOKEN, userData.accessToken);
                
                dispatch({
                    type: DANG_NHAP_ACTION,
                    thongTinDangNhap: userData
                });
            }
        } catch (error) {
            throw error; 
        }
    }
}

export const dangKyAction = (thongTinDangKy) => {
    return async () => {
        try {
            const result = await quanLyNguoiDungService.dangKy(thongTinDangKy);
            return result;
        } catch (error) {
            throw error;
        }
    }
}