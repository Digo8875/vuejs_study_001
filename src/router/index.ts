import { createRouter, createWebHashHistory } from "vue-router"
import TasksView from '../views/TasksView.vue'
import Projects from '../views/Projects.vue'
import List from '../views/Projects/List.vue'
import Form from '../views/Projects/Form.vue'

const routes = [
    { 
        path: '/',
        name: 'Tasks',
        component: TasksView
    },
    {
        path: '/projects',
        component: Projects,
        children: [
            {
                path: '',
                name: 'Projects',
                component: List
            },
            {
                path: 'new',
                name: 'New project',
                component: Form
            },
            {
                path: ':id',
                name: 'Edit project',
                component: Form,
                props: true
            }
        ]
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes: routes
})

export default router