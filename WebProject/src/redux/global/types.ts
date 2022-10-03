import { ActionType } from 'typesafe-actions';

import * as actions from './actions';
import { NotificationDto } from './dtos/notificationDto';

export interface GlobalState {
    readonly defaultTheme: string;
    readonly reloadF: boolean;
    readonly showSuccessNotification: boolean;
    readonly showErrorNotification: boolean;
    readonly showWarningNotification: boolean;
    readonly notificationContent: NotificationDto;
}
export type GlobalActions = ActionType<typeof actions>;
