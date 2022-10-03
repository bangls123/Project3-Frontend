import * as React from 'react';
import { useEffect, useState } from 'react';

import { Dropdown, Menu } from 'antd';
import { GlobalOutlined } from '@ant-design/icons';
import classNames from 'classnames';
import 'famfamfam-flags/dist/sprite/famfamfam-flags.css';

import { L } from '../../lib/abpUtility';
import './index.less';

declare const abp: any;
const LanguageSelect: React.FunctionComponent = () => {
    const [languages, setLanguages] = useState([]);
    const [currentLanguage, setCurrentLanguage] = useState({ name: '' });

    useEffect(() => {
        const arrLangs = abp.localization.languages.filter((val: any) => !val.isDisabled);
        setLanguages(arrLangs);
        setCurrentLanguage(abp.localization.currentLanguage);
    }, []);

    const changeLanguage = (languageName: string) => {
        abp.utils.setCookieValue(
            'Abp.Localization.CultureName',
            languageName,
            new Date(new Date().getTime() + 5 * 365 * 86400000), // 5 year
            abp.appPath,
        );
        window.location.reload();
    };

    const langMenu = (
        <Menu className="menu" selectedKeys={[currentLanguage.name]}>
            {languages.map((item: any) => (
                <Menu.Item key={item.name} onClick={() => changeLanguage(item.name)}>
                    <i className={item.icon} /> {item.displayName}
                </Menu.Item>
            ))}
        </Menu>
    );

    return (
        <Dropdown overlay={langMenu} placement="bottomRight">
            <GlobalOutlined
                className={classNames('dropDown', 'className')}
                title={L('Languages')}
                style={{ marginRight: '5px' }}
            />
        </Dropdown>
    );
};

export default LanguageSelect;
