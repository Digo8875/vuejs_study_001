import { store } from '@/store';
import type { NotificationType } from "@/interfaces/NotificationI";
import { NOTIFY } from '@/store/mutation-types';

type Notificator = {
    notify: (type: NotificationType, title: string, text: string) => void
}

export default () : Notificator => {

    const notify = (type: NotificationType, title: string, text: string) : void => {
        store.commit(NOTIFY, {
            title,
            text,
            type
        })
    }

    return {
        notify
    }
}