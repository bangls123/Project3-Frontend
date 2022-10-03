import * as React from 'react';

import { Route, Switch } from 'react-router-dom';

import ProtectedRoute from './ProtectedRoute';
import appRouters from './appRouters.config';
import userRouter from './userRouter.config';
import utils from '../../utils/utils';

const Router: React.FunctionComponent = () => {
    const UserLayout = utils.getRoute('/user', userRouter, appRouters).component;
    const AppLayout = utils.getRoute('/admin', userRouter, appRouters).component;

    return (
        <Switch>
            <Route path="/user" render={(props: any) => <UserLayout {...props} appRouters={appRouters} userRouter={userRouter} />} />
            <ProtectedRoute path="/" render={(props: any) => <AppLayout {...props} appRouters={appRouters} userRouter={userRouter} exact />} />
        </Switch>
    );
};

export default Router;
