import { store } from '@/store';
import type { NotificationType } from "@/interfaces/NotificationI";
import { CREATE_NOTIFY_MUTATION } from '@/store/mutation-types';

type Notificator = {
    notify: (type: NotificationType, title: string, text: string) => void
}

export default () : Notificator => {

    const notify = (type: NotificationType, title: string, text: string) : void => {
        store.commit(CREATE_NOTIFY_MUTATION, {
            title,
            text,
            type
        })
    }

    return {
        notify
    }
}