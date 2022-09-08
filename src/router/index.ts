import { createRouter, createWebHashHistory } from "vue-router"
import TasksView from '../views/TasksView.vue'
import ProjectsView from '../views/ProjectsView.vue'

const routes = [
    { path: '/', name: 'Tasks', component: TasksView },
    { path: '/projects', name: 'Projects', component: ProjectsView }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes: routes
})

export default router