import { USER_LOGIN } from "../../util/settings/config";
import { DANG_NHAP_ACTION, DANG_XUAT_ACTION } from "../actions/types/QuanLyNguoiDungType";

let user = {};
if (localStorage.getItem(USER_LOGIN)) {
    user = JSON.parse(localStorage.getItem(USER_LOGIN));
}

const stateDefault = {
    userLogin: user
}

export const QuanLyNguoiDungReducer = (state = stateDefault, action) => {
    switch (action.type) {
        case DANG_NHAP_ACTION: {
            return { ...state, userLogin: action.thongTinDangNhap };
        }

        case DANG_XUAT_ACTION: {
            return { ...state, userLogin: {} };
        }

        default:
            return {...state}; 
    }
}