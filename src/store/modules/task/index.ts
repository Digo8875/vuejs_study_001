import { LIST_TASK_MUTATION, CREATE_TASK_MUTATION, UPDATE_TASK_MUTATION } from '@/store/mutation-types';
import { LIST_TASK_ACTION, CREATE_TASK_ACTION, UPDATE_TASK_ACTION } from '@/store/action-types';
import http from '@/http';
import type TaskI from '@/interfaces/TaskI';
import type { State } from '@/store';
import type { Module } from 'vuex';

export interface TaskState {
    tasks: TaskI[]
}

export const taskModule: Module<TaskState, State> = {
    mutations: {
        [LIST_TASK_MUTATION](state, tasks: TaskI[]) {
            state.tasks = tasks
        },
        [CREATE_TASK_MUTATION](state, task: TaskI) {
            state.tasks.push(task)
        },
        [UPDATE_TASK_MUTATION](state, task: TaskI) {
            const index = state.tasks.findIndex(t => t.id == task.id)
            state.tasks[index] = task
        }
    },
    actions: {
        [LIST_TASK_ACTION]({commit}, filter: string) {
            let url = '/tasks'

            if(filter) {
                url += '?description=' + filter
            }
            console.log(url)
            http.get(url)
                .then(response => commit(LIST_TASK_MUTATION, response.data))
        },
        [CREATE_TASK_ACTION]({commit}, task: TaskI) {
            return http.post('/tasks', task)
                .then(response => commit(CREATE_TASK_MUTATION, response.data))
        },
        [UPDATE_TASK_ACTION]({commit}, task: TaskI) {
            return http.put(`/tasks/${task.id}`, task)
                .then(() => commit(UPDATE_TASK_MUTATION, task))
        }
    }
}