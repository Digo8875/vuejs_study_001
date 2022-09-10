import http from "@/http";
import type ProjectI from "@/interfaces/ProjectI";
import type { State } from "@/store";
import { LIST_PROJECT_ACTION, CREATE_PROJECT_ACTION, UPDATE_PROJECT_ACTION, DELETE_PROJECT_ACTION } from "@/store/action-types";
import { CREATE_PROJECT_MUTATION, UPDATE_PROJECT_MUTATION, DELETE_PROJECT_MUTATION, LIST_PROJECT_MUTATION } from "@/store/mutation-types";
import type { Module } from "vuex";

export interface ProjectState {
    projects: ProjectI[]
}

export const projectModule: Module<ProjectState, State> = {
    mutations: {
        [CREATE_PROJECT_MUTATION](state, projectName: string) {
            const project = {
                id: new Date().toISOString(),
                name: projectName
            } as ProjectI
            state.projects.push(project)
        },
        [UPDATE_PROJECT_MUTATION](state, project: ProjectI) {
            const index = state.projects.findIndex(proj => proj.id == project.id)
            state.projects[index] = project
        },
        [DELETE_PROJECT_MUTATION](state, id: string) {
            state.projects = state.projects.filter(proj => proj.id != id)
        },
        [LIST_PROJECT_MUTATION](state, projects: ProjectI[]) {
            state.projects = projects
        }
    },
    actions: {
        [LIST_PROJECT_ACTION]({ commit }) {
            http.get('projects')
                .then(response => commit(LIST_PROJECT_MUTATION, response.data))
        },
        [CREATE_PROJECT_ACTION](context, projectName: string) {
            return http.post('/projects', {
                name: projectName
            })
        },
        [UPDATE_PROJECT_ACTION](context, project: ProjectI) {
            return http.put(`/projects/${project.id}`, project)
        },
        [DELETE_PROJECT_ACTION]({ commit }, id: string) {
            return http.delete(`/projects/${id}`)
                .then(() => commit(DELETE_PROJECT_MUTATION, id))
        }
    }
}