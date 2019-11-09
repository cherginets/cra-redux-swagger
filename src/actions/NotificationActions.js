import {NotificationManager} from 'react-notifications';

export function n_success (message, title) {
    NotificationManager.success(message, title);
}
export function n_info (message, title) {
    NotificationManager.info(message, title);
}
export function n_warning (message, title) {
    NotificationManager.warning(message, title);
}
export function n_error (message, title) {
    NotificationManager.error(message, title);
}