import * as React from 'react';

import { lazy, Suspense } from 'react';
import { useSelector } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { makeSelectDefaultTheme } from '../redux/global/selectors';

const DarkTheme = lazy(() => import('./dark/dark-theme'));
const LightTheme = lazy(() => import('./light/light-theme'));
const stateSelector = createStructuredSelector<any, any>({
    defaultTheme: makeSelectDefaultTheme(),
});
const ThemeProvider = ({ children }: any) => {
    const { defaultTheme } = useSelector(stateSelector);

    return (
        <>
            <Suspense fallback={<span />}>
                {defaultTheme === 'dark' ? <DarkTheme /> : <LightTheme />}
            </Suspense>
            {children}
        </>
    );
};
export default ThemeProvider;
