import type ProjectI from "@/interfaces/ProjectI";
import { createStore, Store, useStore as vuexUseStore } from "vuex";
import type { InjectionKey } from "vue";
import { ADD_PROJECT, EDIT_PROJECT, EXCLUDE_PROJECT, NOTIFY, DEFINE_PROJECTS } from "./mutation-types"
import type { NotificationI } from "@/interfaces/NotificationI"
import { GET_PROJECTS, STORE_PROJECT, UPDATE_PROJECT, DELETE_PROJECT } from './actions-type'
import http from '@/http'

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
        [EXCLUDE_PROJECT](state, id: string) {
            state.projects = state.projects.filter(proj => proj.id != id)
        },
        [DEFINE_PROJECTS](state, projects: ProjectI[]) {
            state.projects = projects
        },
        [NOTIFY](state, newNotification: NotificationI) {
            newNotification.id = new Date().getTime()
            state.notifications.push(newNotification)

            setTimeout(() => {
                state.notifications = store.state.notifications.filter(notification => notification.id != newNotification.id)
            }, 3000);
        }
    },
    actions: {
        [GET_PROJECTS]({commit}) {
            http.get('projects')
                .then(response => commit(DEFINE_PROJECTS, response.data))
        },
        [STORE_PROJECT](context, projectName: string) {
            return http.post('/projects', {
                name: projectName
            })
        },
        [UPDATE_PROJECT](context, project: ProjectI) {
            return http.put(`/projects/${project.id}`, project)
        },
        [DELETE_PROJECT]({commit}, id: string) {
            return http.delete(`/projects/${id}`)
                .then(() => commit(EXCLUDE_PROJECT, id))
        }
    }
})

export function useStore(): Store<State> {
    return vuexUseStore(key)
} 