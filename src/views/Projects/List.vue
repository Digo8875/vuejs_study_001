<script lang="ts">
    import { computed, defineComponent } from 'vue'
    import { useStore } from '@/store'
    import { DELETE_PROJECT, GET_PROJECTS } from '@/store/actions-type'
    import { NotificationType } from '@/interfaces/NotificationI'
    import useNotificator from '@/hooks/notificator'

    export default defineComponent({
        name: "List",
        setup () {
            const store = useStore()
            const { notify } = useNotificator()
            store.dispatch(GET_PROJECTS)
            return {
                projects: computed(() => store.state.projects),
                store,
                notify
            }
        },
        methods: {
            deleteProject(id: string) {
                this.store.dispatch(DELETE_PROJECT, id)
                    .then(() => this.responseSuccess())
            },
            responseSuccess () {
                this.notify(NotificationType.SUCCESS, 'Ação efetuada', 'Projeto excluído com sucesso!')
                this.$router.push('/projects')
            }
        }
    })

</script>

<template>
    <section>
        <h1 class="title">
            Projetos
        </h1>
        <router-link to="/projects/new" class="button">
            <span class="icon is-small">
                <i class="fas fa-plus"></i>
            </span>
            <span>Novo projeto</span>
        </router-link>
        <table class="table is-full-width">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Nome</th>
                    <th>Ações</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="project in projects" :key="project.id">
                    <td>{{ project.id }}</td>
                    <td>{{ project.name }}</td>
                    <td>
                        <router-link :to="`/projects/${project.id}`" class="button">
                            <span class="icon is-small">
                                <i class="fas fa-pencil-alt"></i>
                            </span>
                        </router-link>
                        <button class="button ml-2 is-danger" @click="deleteProject(project.id)">
                            <span class="icon is-small">
                                <i class="fas fa-trash"></i>
                            </span>
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
    </section>
</template>

<style>

</style>