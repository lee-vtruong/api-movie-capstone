import { DANG_NHAP_ACTION } from "../actions/types/QuanLyNguoiDungType"

const stateDefault = {
    userLogin: {}
}

export const QuanLyNguoiDungReducer = (state = stateDefault, action) => {
    switch (action.type) {
        case DANG_NHAP_ACTION: {
            return {
                ...state,
                userLogin: action.thongTinDangNhap
            };
        }
        default:
            return { ...state };
    }
}