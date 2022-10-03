import * as React from 'react';

import { useEffect, useState } from 'react';
import { Redirect, Switch, Route } from 'react-router-dom';
import { Layout, notification } from 'antd';
import DocumentTitle from 'react-document-title';
import { createStructuredSelector } from 'reselect';
import { useDispatch, useSelector } from 'react-redux';

import Footer from '../Footer';
import Header from '../Header';
import ProtectedRoute from '../Router/ProtectedRoute';
import SiderMenu from '../SiderMenu';
import NotFoundRoute from '../Router/NotFoundRoute';
import './AppLayout.less';
import utils from '../../utils/utils';
import {
    makeSelectShowSuccessNotification,
    makeSelectShowErrorNotification,
    makeSelectShowWarningNotification,
    makeSelectNotificationContent,
} from '../../redux/global/selectors';
import {
    resetNotification,
} from '../../redux/global/actions';
import ThemeProvider from '../../themes/themeProvider';

const { Content } = Layout;
const stateSelector = createStructuredSelector<any, any>({
    showSuccessNotification: makeSelectShowSuccessNotification(),
    showErrorNotification: makeSelectShowErrorNotification(),
    showWarningNotification: makeSelectShowWarningNotification(),
    notificationContent: makeSelectNotificationContent(),
});
export interface IAppLayoutProps {
    location: any;
    history: any;
    appRouters: any;
    userRouter: any;
}
const AppLayout: React.FunctionComponent<IAppLayoutProps> = (props: IAppLayoutProps) => {
    const dispatch = useDispatch();
    const {
        showSuccessNotification,
        showErrorNotification,
        showWarningNotification,
        notificationContent,
    } = useSelector(stateSelector);
    const {
        history,
        location: { pathname },
        appRouters,
        userRouter,
    } = props;
    const [collapsed, setCollapsed] = useState(false);

    useEffect(() => {
        if (showSuccessNotification) {
            notification.success({
                message: notificationContent.message,
                description: notificationContent.description,
                placement: 'bottomRight',
            });
            dispatch(resetNotification());
        } else if (showErrorNotification) {
            notification.error({
                message: notificationContent.message,
                description: notificationContent.description,
                placement: 'bottomRight',
            });
            dispatch(resetNotification());
        } else if (showWarningNotification) {
            notification.warning({
                message: notificationContent.message,
                description: notificationContent.description,
                placement: 'bottomRight',
            });
            dispatch(resetNotification());
        }
    }, [showSuccessNotification, showErrorNotification, showWarningNotification, dispatch, notificationContent]);

    const toggle = () => {
        setCollapsed(!collapsed);
    };

    const onCollapse = (value: boolean) => {
        setCollapsed(value);
    };

    const layout = (
        <ThemeProvider>
            <Layout style={{ minHeight: '100vh' }}>
                <SiderMenu onCollapse={onCollapse} history={history} collapsed={collapsed} appRouters={appRouters} userRouter={userRouter} />
                <Layout style={{ position: 'absolute', left: collapsed ? '80px' : '256px', right: 0 }}>
                    <Layout.Header
                        className="appHeader"
                        style={{
                            width: `calc(100% - ${collapsed ? '80px' : '256px'})`,
                        }}
                    >
                        <Header collapsed={collapsed} toggle={toggle} />
                    </Layout.Header>
                    <Content style={{ margin: '80px 16px 16px 16px', zIndex: 1 }}>
                        <Switch>
                            {pathname === '/' && <Redirect from="/" to="/admin/dashboard" />}
                            {pathname === '/admin' && <Redirect from="/admin" to="/admin/dashboard" />}
                            {
                                appRouters.filter((item: any) => !item.isLayout).map((route: any) => (
                                    <Route
                                        exact
                                        key={route.key}
                                        path={route.path}
                                        render={() => <ProtectedRoute component={route.component} permission={route.permission} />}
                                    />
                                ))
                            }
                            {pathname !== '/' && <NotFoundRoute />}
                        </Switch>
                    </Content>
                    <Footer />
                </Layout>
            </Layout>
        </ThemeProvider>
    );

    return <DocumentTitle title={utils.getPageTitle(pathname, userRouter, appRouters)}>{layout}</DocumentTitle>;
};

export default AppLayout;
