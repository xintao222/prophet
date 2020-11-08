/**
 * @license
 * Copyright Stbui All Rights Reserved.
 * https://github.com/stbui/prophet
 */

import { takeEvery, put } from 'redux-saga/effects';
import { showNotification } from '../actions';

export interface NotificationSideEffect {
    type: 'info' | 'error' | 'success' | 'warning';
    message: string;
    description: string;
}

interface ActionWithSideEffect {
    type: string;
    payload?: any;
    error: string;
    meta: { notification: NotificationSideEffect };
}

export function* handleNotification({
    error,
    meta: { notification },
}: ActionWithSideEffect) {
    const { type, message, description } = notification;
    if (error) {
    }

    yield put(showNotification(message, type, description));
}

export const takeNotificationAction = action =>
    action.meta && action.meta.notification;

export default function* () {
    yield takeEvery(takeNotificationAction, handleNotification);
}
