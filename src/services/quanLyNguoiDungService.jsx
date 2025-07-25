import { DOMAIN } from "../util/settings/config";
import { baseService } from "./baseService";

export class QuanLyNguoiDungService extends baseService {
    constructor() {
        super();
    }

    dangNhap = (thongTinDangNhap) => {
        // console.log('URL:', `${DOMAIN}api/QuanLyNguoiDung/DangNhap`);
        // console.log('Data:', thongTinDangNhap);
        return this.post(`api/QuanLyNguoiDung/DangNhap`, thongTinDangNhap);
    }

    dangKy = (thongTinDangKy) => {
        return this.post(`api/QuanLyNguoiDung/DangKy`, thongTinDangKy);
    }
}

export const QLNguoiDungService = new QuanLyNguoiDungService();
export const quanLyNguoiDungService = new QuanLyNguoiDungService();