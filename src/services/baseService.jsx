import Axios from 'axios';
import { DOMAIN, TOKEN_CYBERSOFT, ACCESS_TOKEN } from '../util/settings/config';

export class baseService {
    put = (url, model) => {
        return Axios({
            url: `${DOMAIN}${url}`, 
            method: 'PUT',
            data: model,
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem(ACCESS_TOKEN),
                'TokenCybersoft': TOKEN_CYBERSOFT 
            }
        });
    }

    post = (url, model) => {
        return Axios({
            url: `${DOMAIN}${url}`,
            method: 'POST',
            data: model,
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem(ACCESS_TOKEN),
                'TokenCybersoft': TOKEN_CYBERSOFT 
            }
        });
    }

    get = (url) => {
        return Axios({
            url: `${DOMAIN}${url}`,
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem(ACCESS_TOKEN),
                'TokenCybersoft': TOKEN_CYBERSOFT 
            }
        });
    }

    delete = (url) => {
        return Axios({
            url: `${DOMAIN}${url}`,
            method: 'DELETE',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem(ACCESS_TOKEN),
                'TokenCybersoft': TOKEN_CYBERSOT 
            }
        });
    }
}