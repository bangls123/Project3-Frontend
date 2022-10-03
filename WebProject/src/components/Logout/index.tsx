import * as React from 'react';
import { useEffect } from 'react';

declare const abp: any;
const Logout: React.FunctionComponent = () => {
    useEffect(() => {
        localStorage.clear();
        sessionStorage.clear();
        abp.auth.clearToken();

        window.location.href = '/user/login';
    }, []);
    return (<></>);
};

export default Logout;
