import { GROUPID } from "../util/settings/config";
import { baseService } from "./baseService";

export class QuanLyPhimService extends baseService {
    constructor() {
        super();
        // console.log('Errors...');
    }

    layDanhSachBanner = () => {
        return this.get(`api/QuanLyPhim/LayDanhSachBanner`)
    }

    layDanhSachPhim = (tenPhim = '') => {
        if (tenPhim.trim() !== '') {
            return this.get(`api/QuanLyPhim/LayDanhSachPhim?maNhom=${GROUPID}&tenPhim=${tenPhim}`);
        }
        return this.get(`api/QuanLyPhim/LayDanhSachPhim?maNhom=${GROUPID}`);
    }

    xoaPhim = (maPhim) => {
        return this.delete(`api/QuanLyPhim/XoaPhim?MaPhim=${maPhim}`);
    }

    themPhimUploadHinh = (formData) => {
        return this.post(`api/QuanLyPhim/ThemPhimUploadHinh`, formData);
    }

    layThongTinPhim = (maPhim) => {
        return this.get(`api/QuanLyPhim/LayThongTinPhim?MaPhim=${maPhim}`);
    }

    capNhatPhimUpload = (formData) => {
        return this.post(`api/QuanLyPhim/CapNhatPhimUpload`, formData);
    }
}

export const QLPhimService = new QuanLyPhimService();