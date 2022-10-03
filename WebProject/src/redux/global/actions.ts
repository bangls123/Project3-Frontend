import { action } from 'typesafe-actions';

import ActionTypes from './constants';
import { NotificationDto } from './dtos/notificationDto';

export const changeTheme = (input: string) => (
    action(ActionTypes.CHANGE_THEME, input)
);
export const initPage = () => (
    action(ActionTypes.INIT_PAGE)
);

export const showSuccessNotification = (input: NotificationDto) => (
    action(ActionTypes.SHOW_SUCCESS_NOTIFICATION, input)
);
export const showErrorNotification = (input: NotificationDto) => (
    action(ActionTypes.SHOW_ERROR_NOTIFICATION, input)
);
export const showWarningNotification = (input: NotificationDto) => (
    action(ActionTypes.SHOW_WARNING_NOTIFICATION, input)
);
export const resetNotification = () => (
    action(ActionTypes.RESET_NOTIFICATION)
);
