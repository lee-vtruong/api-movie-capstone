import { QLNguoiDungService } from "../../services/quanLyNguoiDungService"
import { DANG_NHAP_ACTION } from "./types/QuanLyNguoiDungType";

export const dangNhapAction = (thongTinDangNhap) => {
    console.log('meo')
    return async (dispatch) => {
        try {
            const result = await QLNguoiDungService.dangNhap(thongTinDangNhap);
            console.log('result', result);

            dispatch({
                type: DANG_NHAP_ACTION,
                thongTinDangNhap: result.data.content
            });
        } catch (errors) {
            console.log("errors", errors);
        }
    }
}