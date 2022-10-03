import * as React from 'react';

import { Route, Redirect } from 'react-router-dom';

const NotFoundRoute: React.FunctionComponent = () => (
    <Route render={(props) => <Redirect to={{ pathname: '/exception?type=404', state: { from: props.location } }} />} />
);

export default NotFoundRoute;
