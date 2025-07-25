import { DAT_GHE, DAT_VE_HOAN_TAT, SET_CHI_TIET_PHONG_VE, SET_GHE_NGUOI_KHAC_DANG_DAT } from "../actions/types/QuanLyDatVeType";

const stateDefault = {
    chiTietPhongVe: {},
    danhSachGheDangDat: [],
    danhSachGheNguoiKhacDat: []
};

export const QuanLyDatVeReducer = (state = stateDefault, action) => {
    switch (action.type) {
        case SET_CHI_TIET_PHONG_VE: {
            return { ...state, chiTietPhongVe: action.chiTietPhongVe };
        }

        case DAT_GHE: {
            let danhSachGheDangDatUpdate = [...state.danhSachGheDangDat];
            let index = danhSachGheDangDatUpdate.findIndex(gheDD => gheDD.maGhe === action.gheDuocChon.maGhe);

            if (index !== -1) {
                danhSachGheDangDatUpdate.splice(index, 1);
            } else {
                danhSachGheDangDatUpdate.push(action.gheDuocChon);
            }
            return { ...state, danhSachGheDangDat: danhSachGheDangDatUpdate };
        }

         case DAT_VE_HOAN_TAT: {
            return { ...state, danhSachGheDangDat: [] };
        }

        case SET_GHE_NGUOI_KHAC_DANG_DAT: {
            return { ...state, danhSachGheNguoiKhacDat: action.danhSachGheNguoiKhacDat };
        }
        default:
            return { ...state };
    }
}