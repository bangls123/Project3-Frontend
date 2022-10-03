import { GlobalState } from './types';
import ActionTypes from './constants';

export const initialState: GlobalState = {
    defaultTheme: localStorage.getItem('defaultTheme') || 'light',
    reloadF: false,
    showSuccessNotification: false,
    showErrorNotification: false,
    showWarningNotification: false,
    notificationContent: {
        message: '',
        description: '',
    },
};

const globalReducer: (state: GlobalState | undefined, action: any) => GlobalState = (
    state: GlobalState = initialState,
    action: any,
) => {
    switch (action.type) {
        case ActionTypes.CHANGE_THEME:
            localStorage.setItem('defaultTheme', action.payload);
            window.location.reload();
            return {
                ...state,
                defaultTheme: action.payload,
            };
        case ActionTypes.INIT_PAGE:
            return {
                ...state,
            };

        case ActionTypes.SHOW_SUCCESS_NOTIFICATION:
            return {
                ...state,
                showSuccessNotification: true,
                notificationContent: action.payload,
            };
        case ActionTypes.SHOW_ERROR_NOTIFICATION:
            return {
                ...state,
                showErrorNotification: true,
                notificationContent: action.payload,
            };
        case ActionTypes.SHOW_WARNING_NOTIFICATION:
            return {
                ...state,
                showWarningNotification: true,
                notificationContent: action.payload,
            };
        case ActionTypes.RESET_NOTIFICATION:
            return {
                ...state,
                showSuccessNotification: false,
                showErrorNotification: false,
                showWarningNotification: false,
                notificationContent: {
                    message: '',
                    description: '',
                },
            };

        default:
            return state;
    }
};

export default globalReducer;
