import type ProjectI from "@/interfaces/ProjectI";
import { createStore, Store, useStore as vuexUseStore } from "vuex";
import type { InjectionKey } from "vue";

interface State {
    projects: ProjectI[]
}

export const key: InjectionKey<Store<State>> = Symbol()

export const store = createStore<State>({
    state: {
        projects: []
    },
    mutations: {
        'ADD_PROJECT'(state, projectName: string) {
            const project = {
                id: new Date().toISOString(),
                name: projectName
            } as ProjectI
            state.projects.push(project)
        }
    }
})

export function useStore(): Store<State> {
    return vuexUseStore(key)
} 