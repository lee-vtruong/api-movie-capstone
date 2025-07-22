// import { QLRapService } from "../../services/quanLyRapService"
// import { SET_HE_THONG_RAP_CHIEU } from "./types/QuanLyRapType";

// export const layDanhSachHeThongRapAction = () => {
//     console.log('abcccc')
//     return async (dispatch) => {
//         try {
//             const result = await QLRapService.layDanhSachHeThongRap();
//             // console.log('meomoe');
//             // console.log('result', result.data)

//             dispatch({
//                 type: SET_HE_THONG_RAP_CHIEU,
//                 heThongRapChieu: result.data.content
//             })
//         } catch(errors) {
//             console.log('errors', errors)
//             console.log('meomoe');
//         }
//     }
// }

import { QLRapService } from "../../services/quanLyRapService";
import { SET_CHI_TIET_PHIM, SET_HE_THONG_RAP_CHIEU } from "./types/QuanLyRapType";

export const layDanhSachHeThongRapAction = () => {
    return async (dispatch) => {
        try {
            const response = await fetch('/rapList.json');
            const data = await response.json();

            dispatch({
                type: SET_HE_THONG_RAP_CHIEU,
                heThongRapChieu: data
            });
        } catch (errors) {
            console.log('errors', errors);
        }
    }
}

// API lỗi nên dùng mock
// export const layThongTinChiTietPhim = (id) => {
//     console.log('id', id)
//     return async (dispatch) => {
//         try {
//             const result = await QLRapService.layThongTinChiTietPhim(id);
//             console.log('meomeo2')
//             console.log('result', result);
//         } catch (errors) {
//             console.log('errors', errors);
//             console.log('meomeo3')
//         }
//     }
// }

export const layThongTinChiTietPhim = (id) => {
    return async (dispatch) => {
        try {
            const response = await fetch('/thongTinLichChieu.json');
            const data = await response.json();

            const filmObj = data.find(item => String(item.content?.maPhim) === String(id));
            const filmDetail = filmObj?.content;

            console.log('filmDetail1', filmDetail)

            dispatch({
                type: SET_CHI_TIET_PHIM,
                filmDetail: filmDetail
            })
        } catch (errors) {
            console.log('errors', errors);
        }
    }
}