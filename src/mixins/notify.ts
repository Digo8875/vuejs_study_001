import type { NotificationType } from "@/interfaces/NotificationI"
import { CREATE_NOTIFY_MUTATION } from "@/store/mutation-types"
import { store } from "@/store"

export const notificationMixin = {
    methods: {
        notify (type: NotificationType, title: string, text: string) : void {
            store.commit(CREATE_NOTIFY_MUTATION, {
                title,
                text,
                type
            })
        }
    }
}