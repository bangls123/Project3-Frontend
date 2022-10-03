import * as React from 'react';

import { Redirect, Route } from 'react-router-dom';

import { isGranted } from '../../lib/abpUtility';

declare const abp: any;
const ProtectedRoute: React.FunctionComponent<any> = ({
    path,
    component: Component,
    permission,
    render,
    ...rest
}: any) => (
    <Route
        {...rest}
        render={(props) => {
            if (!abp.session.userId) {
                return (
                    <Redirect
                        to={{
                            pathname: '/user/login',
                            state: { from: props.location },
                        }}
                    />
                );
            }
            if (permission && !isGranted(permission)) {
                return (
                    <Redirect
                        to={{
                            pathname: '/exception?type=401',
                            state: { from: props.location },
                        }}
                    />
                );
            }

            if (Component === null) {
                return <></>;
            }

            return Component ? <Component {...props} /> : render(props);
        }}
    />
);

export default ProtectedRoute;
