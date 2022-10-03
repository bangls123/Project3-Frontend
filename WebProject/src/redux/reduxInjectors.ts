import {
    useInjectReducer as useReducer,
    useInjectSaga as useSaga,
} from 'redux-injectors';

const useInjectReducer: (key: string, reducer: any) => void = (key: string, reducer: any) => useReducer({ key, reducer });
const useInjectSaga: (key: string, saga: any) => void = (key: string, saga: any) => useSaga({ key, saga });

export { useInjectReducer, useInjectSaga };
