import { createRouter, createWebHashHistory } from "vue-router"
import TasksView from '../views/TasksView.vue'

const routes = [
    { path: '/', name: 'Tasks', component: TasksView }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes: routes
})

export default router