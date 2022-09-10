import { createRouter, createWebHashHistory } from "vue-router"
import Tasks from '@/views/Tasks.vue'
import TaskList from '@/views/Tasks/List.vue'
import Projects from '@/views/Projects.vue'
import ProjectList from '@/views/Projects/List.vue'
import ProjectForm from '@/views/Projects/Form.vue'

const routes = [
    { 
        path: '/',
        component: Tasks,
        children: [
            {
                path: '',
                name: 'Tasks',
                component: TaskList
            }
        ]
    },
    {
        path: '/projects',
        component: Projects,
        children: [
            {
                path: '',
                name: 'Projects',
                component: ProjectList
            },
            {
                path: 'new',
                name: 'New project',
                component: ProjectForm
            },
            {
                path: ':id',
                name: 'Edit project',
                component: ProjectForm,
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