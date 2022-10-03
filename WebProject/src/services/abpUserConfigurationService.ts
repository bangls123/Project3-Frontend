import enJson from '../localization/en.json';
import jaJson from '../localization/ja.json';

declare const abp: any;
class AbpUserConfigurationService {
    static getLocalization: any = async () => {
        let language;
        if (!abp.utils.getCookieValue('Abp.Localization.CultureName')) {
            language = 'en';
        } else {
            language = abp.utils.getCookieValue('Abp.Localization.CultureName');
        }

        let objReturn;
        switch (language) {
            case 'en':
                objReturn = enJson;
                break;
            default:
                objReturn = jaJson;
                break;
        }

        return objReturn;
    };

    static getCurrentLanguage: any = () => {
        let language: string;
        if (!abp.utils.getCookieValue('Abp.Localization.CultureName')) {
            language = 'en';
        } else {
            language = abp.utils.getCookieValue('Abp.Localization.CultureName');
        }
        language = 'en';
        const wanted = abp.localization.languages.filter((item: any) => item.name === language);

        return wanted.length > 0 ? wanted[0] : null;
    };
}

export default AbpUserConfigurationService;
