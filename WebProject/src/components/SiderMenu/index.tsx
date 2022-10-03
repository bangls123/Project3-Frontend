import * as React from 'react';

import {
    Avatar,
    Col,
    Layout,
    Menu,
} from 'antd';
import { createStructuredSelector } from 'reselect';
import { useSelector } from 'react-redux';

import { L, isGranted } from '../../lib/abpUtility';
import AbpLogo from '../../images/abp-logo-long.png';
import utils from '../../utils/utils';
import './index.less';
import { makeSelectDefaultTheme } from '../../redux/global/selectors';

const stateSelector = createStructuredSelector<any, any>({
    defaultTheme: makeSelectDefaultTheme(),
});
const { Sider } = Layout;
export interface ISiderMenuProps {
    collapsed: boolean;
    onCollapse: any;
    history: any;
    appRouters: any;
    userRouter: any;
}
const SiderMenu: React.FunctionComponent<ISiderMenuProps> = (props: ISiderMenuProps) => {
    const {
        collapsed,
        history,
        onCollapse,
        appRouters,
        userRouter,
    } = props;
    const { defaultTheme } = useSelector(stateSelector);
    const currentRoute = utils.getRoute(history.location.pathname, userRouter, appRouters);

    return (
        <Sider theme={defaultTheme} trigger={null} className="sidebar" width={256} collapsible collapsed={collapsed} onCollapse={onCollapse}>
            {collapsed ? (
                <Col style={{ textAlign: 'center', marginTop: 15, marginBottom: 10 }}>
                    <Avatar shape="square" style={{ height: 27, width: 64 }} src={AbpLogo} />
                </Col>
            ) : (
                <Col style={{ textAlign: 'center', marginTop: 15, marginBottom: 10 }}>
                    <Avatar shape="square" style={{ height: 54, width: 128 }} src={AbpLogo} />
                </Col>
            )}

            <Menu theme={defaultTheme} mode="inline" selectedKeys={[currentRoute ? currentRoute.path : '']}>
                {appRouters.filter((item: any) => !item.isLayout && item.showInMenu).map((route: any) => {
                    if (route.permission && !isGranted(route.permission)) return null;
                    return (
                        <Menu.Item key={route.path} onClick={() => history.push(route.path)}>
                            <route.icon />
                            <span>{L(`Menu.${route.title}`)}</span>
                        </Menu.Item>
                    );
                })}
            </Menu>
        </Sider>
    );
};

export default SiderMenu;
