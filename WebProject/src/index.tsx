import * as React from 'react';

import * as ReactDOM from 'react-dom';
import * as moment from 'moment';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import App from './App';
import utils from './utils/utils';
import abpUserConfigurationService from './services/abpUserConfigurationService';
import registerServiceWorker from './registerServiceWorker';
import defaultConfig from './localization/defaultConfig.json';
import './index.less';
import configureStore from './redux/configureStore';
import loginService from './scenes/Login/services';

declare const abp: any;
utils.setLocation();
utils.extend(true, abp, defaultConfig);

abpUserConfigurationService.getLocalization().then(async (res: any) => {
    abp.localization.values = res;
    if (abp.auth.getToken()) {
        const checktoken = await loginService.checkToken(abp.auth.getToken());
        if (checktoken) {
            abp.session.userId = checktoken.userId;
        } else {
            localStorage.clear();
            sessionStorage.clear();
            abp.auth.clearToken();
        }
    }

    const currentLanguage = abpUserConfigurationService.getCurrentLanguage();
    abp.localization.currentLanguage = currentLanguage;
    abp.localization.currentCulture = {
        name: currentLanguage.name,
        displayName: currentLanguage.displayName,
    };
    moment.locale(abp.utils.getCookieValue('Abp.Localization.CultureName'));

    const initialState = {};
    const store = configureStore(initialState);
    ReactDOM.render(
        <Provider store={store}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </Provider>,
        document.getElementById('root') as HTMLElement,
    );

    registerServiceWorker();
});
