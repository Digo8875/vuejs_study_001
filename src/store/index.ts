import { CREATE_NOTIFY_MUTATION } from '@/store/mutation-types';
import { projectModule } from './modules/project/index';
import { taskModule } from './modules/task/index';
import { createStore, Store, useStore as vuexUseStore } from "vuex";
import type { InjectionKey } from "vue";
import type { ProjectState } from "./modules/project";
import type { TaskState } from './modules/task';
import type { NotificationI } from '@/interfaces/NotificationI';

export interface State {
    project: ProjectState,
    task: TaskState,
    notifications: NotificationI[]
}

export const key: InjectionKey<Store<State>> = Symbol()

export const store = createStore<State>({
    state: {
        project: {
            projects: []
        },
        task: {
            tasks: []
        },
        notifications: []
    },
    mutations: {
        [CREATE_NOTIFY_MUTATION](state, newNotification: NotificationI) {
            newNotification.id = new Date().getTime()
            state.notifications.push(newNotification)

            setTimeout(() => {
                state.notifications = store.state.notifications.filter(notification => notification.id != newNotification.id)
            }, 3000);
        }
    },
    actions: {

    },
    modules: {
        project: projectModule,
        task: taskModule
    }
})

export function useStore(): Store<State> {
    return vuexUseStore(key)
} 