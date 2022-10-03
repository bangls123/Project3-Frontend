import * as React from 'react';

import { Redirect, Route, Switch } from 'react-router-dom';
import { Col } from 'antd';
import DocumentTitle from 'react-document-title';

import Footer from '../Footer';
import LanguageSelect from '../LanguageSelect';
import utils from '../../utils/utils';
import './UserLayout.less';

export interface IUserLayoutProps {
    location: any;
    userRouter: any;
    appRouters: any;
}
const UserLayout: React.FunctionComponent<IUserLayoutProps> = (props: IUserLayoutProps) => {
    const {
        location: { pathname },
        userRouter,
        appRouters,
    } = props;

    return (
        <DocumentTitle title={utils.getPageTitle(pathname, userRouter, appRouters)}>
            <Col className="container">
                <div style={{ height: 'calc(100vh - 55px)' }}>
                    <div className="lang">
                        <LanguageSelect />
                    </div>
                    <Switch>
                        {userRouter.filter((item: any) => !item.isLayout)
                        .map((item: any) => (
                            <Route key={item.key} path={item.path} component={item.component} exact={item.exact} />
                        ))}
                        <Redirect from="/user" to="/user/login" />
                    </Switch>
                </div>
                <Footer />
            </Col>
        </DocumentTitle>
    );
};

export default UserLayout;
