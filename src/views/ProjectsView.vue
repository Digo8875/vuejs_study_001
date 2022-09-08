<script lang="ts">
    import { computed, defineComponent } from 'vue'
    import { useStore } from '@/store'

    export default defineComponent({
        name: "ProjectsView",
        data () {
            return {
                projectName: ""
            }
        },
        methods: {
            save () {
                this.store.commit('ADD_PROJECT', this.projectName)
                this.projectName = ''
            }
        },
        setup () {
            const store = useStore()
            return {
                store,
                projects: computed(() => store.state.projects)
            }
        }
    })

</script>

<template>
    <section class="projects">
        <h1 class="title">
            Projetos
        </h1>
        <form @submit.prevent="save">
            <div class="field">
                <label for="projectName" class="label">
                    Nome do projeto
                </label>
                <input type="text" class="input" v-model="projectName" id="projectName"/>
            </div>
            <div class="field">
                <button class="button" type="submit">
                    Salvar
                </button>
            </div>
        </form>
        <table class="table is-full-width">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Nome</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="project in projects" :key="project.id">
                    <td>{{ project.id }}</td>
                    <td>{{ project.name }}</td>
                </tr>
            </tbody>
        </table>
    </section>
</template>

<style scoped>
    .projects{
        padding: 2.5rem;
    }
</style>