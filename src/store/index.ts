import type ProjectI from "@/interfaces/ProjectI";
import { createStore, Store, useStore as vuexUseStore } from "vuex";
import type { InjectionKey } from "vue";
import { ADD_PROJECT, EDIT_PROJECT, DELETE_PROJECT, NOTIFY } from "./mutation-types";
import type { NotificationI } from "@/interfaces/NotificationI"
import { NotificationType } from "@/interfaces/NotificationI"

interface State {
    projects: ProjectI[],
    notifications: NotificationI[]
}

export const key: InjectionKey<Store<State>> = Symbol()

export const store = createStore<State>({
    state: {
        projects: [],
        notifications: []
    },
    mutations: {
        [ADD_PROJECT](state, projectName: string) {
            const project = {
                id: new Date().toISOString(),
                name: projectName
            } as ProjectI
            state.projects.push(project)
        },
        [EDIT_PROJECT](state, project: ProjectI) {
            const index = state.projects.findIndex(proj => proj.id == project.id)
            state.projects[index] = project
        },
        [DELETE_PROJECT](state, id: string) {
            state.projects = state.projects.filter(proj => proj.id != id)
        },
        [NOTIFY](state, newNotification: NotificationI) {
            newNotification.id = new Date().getTime()
            state.notifications.push(newNotification)

            setTimeout(() => {
                state.notifications = store.state.notifications.filter(notification => notification.id != newNotification.id)
            }, 3000);
        }
    }
})

export function useStore(): Store<State> {
    return vuexUseStore(key)
} 