
import axios from 'axios'
import { DOMAIN } from '../../util/settings/config';
import { SET_CAROUSEL } from './types/CarouselType';
import { QLPhimService } from '../../services/quanLyPhimService'

export const getCarouselAction = async (dispatch) => {
    try {
        // const result = await axios({
        //     url: `${DOMAIN}/api/QuanLyPhim/LayDanhSachBanner`,
        //     method: 'GET'
        // });

        const result = await QLPhimService.layDanhSachBanner();

        dispatch({
            type: SET_CAROUSEL,
            arrCarouselImg: result.data.content
        });
    } catch (errors) {
        console.log('errors', errors);
    }
};