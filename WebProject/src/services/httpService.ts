import { notification } from 'antd';
import axios from 'axios';
import qs from 'qs';

import AppConsts from '../lib/appconst';
import { L } from '../lib/abpUtility';

declare const abp: any;
const http = axios.create({
    baseURL: AppConsts.remoteServiceBaseUrl,
    timeout: 30000,
    paramsSerializer: (params) => qs.stringify(params, { encode: false }),
});

http.interceptors.request.use(
    (config) => {
        const newConfig = { ...config };
        if (abp.auth.getToken()) {
            newConfig.headers.common.Authorization = `${abp.auth.getToken()}`;
        }
        return newConfig;
    },
    (error) => Promise.reject(error),
);

http.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.data.error && error.response.data.error.message && error.response.data.error.details) {
            notification.error({
                message: error.response.data.error.message,
                description: error.response.data.error.details,
                placement: 'bottomRight',
            });
        } else if (error.response && error.response.data.error && error.response.data.error.message) {
            notification.error({
                message: L('Common.LoginFailed'),
                description: error.response.data.error.message,
                placement: 'bottomRight',
            });
        } else if (!error.response) {
            notification.error({
                message: L('Common.Error'),
                description: L('Common.UnknownError'),
                placement: 'bottomRight',
            });
        }

        return Promise.reject(error);
    },
);

export default http;
