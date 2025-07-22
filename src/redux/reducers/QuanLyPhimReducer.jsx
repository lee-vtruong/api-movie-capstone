import { SET_DANH_SACH_PHIM } from "../actions/types/QuanLyPhimType"
import { SET_CHI_TIET_PHIM } from "../actions/types/QuanLyRapType";

const stateDefault = {
    arrFilm: [
        {
            "maPhim": 10948,
            "tenPhim": "Avatar 2: Dòng chảy của nước",
            "biDanh": "avatar-2-dong-chay-cua-nuoc",
            "trailer": "https://www.youtube.com/embed/Ru4Jbmh7bcQ",
            "hinhAnh": "http://movieapi.cyberlearn.vn/hinhanh/avatar-2-_gp00.jpg",
            "moTa": "Avatar: Dòng chảy của nước là một bộ phim điện ảnh thuộc thể loại khoa học viễn tưởng và sử thi của Mỹ dự kiến ra mắt năm 2022. Tác phẩm do James Cameron đạo diễn, viết kịch bản và hợp tác sản xuất với 20th Century Studios. Đây sẽ là phần phim thứ hai trong loạt phim Avatar, sau phần một cùng tên năm 2009.",
            "maNhom": "GP00",
            "ngayKhoiChieu": "2024-11-12T00:00:00",
            "danhGia": 9,
            "hot": true,
            "dangChieu": true,
            "sapChieu": false
        },
    ],

    filmDetail: {}
}

export const QuanLyPhimReducer = (state = stateDefault, action) => {
    switch (action.type) {
        case SET_DANH_SACH_PHIM : {
            state.arrFilm = action.arrFilm;
            return {...state}
        }
        case SET_CHI_TIET_PHIM:
            return { ...state, filmDetail: action.filmDetail || {} 
        }
        default: return { ...state }
    }
}

