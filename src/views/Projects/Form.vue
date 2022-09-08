<script lang="ts">
    import { defineComponent } from 'vue'
    import { useStore } from '@/store'
    import { ADD_PROJECT, EDIT_PROJECT, NOTIFY } from '@/store/mutation-types'
import { NotificationType } from '@/interfaces/NotificationI'

    export default defineComponent({
        name: "Form",
        props: {
            id: {
                type: String
            }
        },
        mounted () {
            if(this.id) {
                const project = this.store.state.projects.find(proj => proj.id == this.id)
                this.projectName = project?.name || ''
            }
        },
        data () {
            return {
                projectName: ""
            }
        },
        methods: {
            save () {
                if(this.id) {
                    this.store.commit(EDIT_PROJECT, {
                        id: this.id,
                        name: this.projectName
                    })
                } else {
                    this.store.commit(ADD_PROJECT, this.projectName)
                }
                this.projectName = ''
                this.store.commit(NOTIFY, {
                    title: 'Novo projeto criado',
                    text: 'Seu projeto já está disponível',
                    type: NotificationType.SUCCESS
                })
                this.$router.push('/projects')
            }
        },
        setup () {
            const store = useStore()
            return {
                store
            }
        }
    })

</script>

<template>
    <section>
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
    </section>
</template>

<style>
</style>