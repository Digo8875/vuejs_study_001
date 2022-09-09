<script lang="ts">
    import { defineComponent } from 'vue'
    import { useStore } from '@/store'
    import { NotificationType } from '@/interfaces/NotificationI'
    import useNotificator from '@/hooks/notificator'
    import { STORE_PROJECT, UPDATE_PROJECT } from '@/store/actions-type'

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
                    this.store.dispatch(UPDATE_PROJECT, {
                        id: this.id,
                        name: this.projectName
                    }).then(() => this.responseSuccess())
                } else {
                    this.store.dispatch(STORE_PROJECT, this.projectName)
                        .then(() => this.responseSuccess())
                }
            },
            responseSuccess () {
                this.projectName = ''
                this.notify(NotificationType.SUCCESS, 'Ação efetuada', 'Projeto cadastrado com sucesso!')
                this.$router.push('/projects')
            }
        },
        setup () {
            const store = useStore()
            const { notify } = useNotificator()
            return {
                store,
                notify
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