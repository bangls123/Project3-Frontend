import Loadable from 'react-loadable';

import Loading from '../Loading/index';

const LoadableComponent: (component: any) => React.ComponentType<unknown> & Loadable.LoadableComponent = (component: any) => (
    Loadable({ loader: component, loading: Loading })
);

export default LoadableComponent;
