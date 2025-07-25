// src/services/baseService.jsx

import Axios from 'axios';
import { DOMAIN, TOKEN_CYBERSOFT, ACCESS_TOKEN } from '../util/settings/config';

export class baseService {
    put = (url, model) => {
        return Axios({
            url: `${DOMAIN}${url}`,
            method: 'PUT',
            data: model,
            headers: {
                'Content-Type': 'application/json-patch+json', 
                'Authorization': 'Bearer ' + localStorage.getItem(ACCESS_TOKEN),
                'TokenCybersoft': TOKEN_CYBERSOFT
            }
        });
    }

   post = (url, data) => {
        const isFormData = data instanceof FormData;

        return Axios({
            url: `${DOMAIN}${url}`,
            method: 'POST',
            data: data,
            headers: {
                ...(!isFormData && { 'Content-Type': 'application/json-patch+json' }),
                
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
                'TokenCybersoft': TOKEN_CYBERSOFT
            }
        });
    }
}