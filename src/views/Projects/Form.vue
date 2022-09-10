<script lang="ts">
    import { defineComponent, ref } from 'vue'
    import { useStore } from '@/store'
    import { NotificationType } from '@/interfaces/NotificationI'
    import useNotificator from '@/hooks/notificator'
    import { CREATE_PROJECT_ACTION, UPDATE_PROJECT_ACTION } from '@/store/action-types'
    import { useRouter } from 'vue-router'

    export default defineComponent({
        name: "Form",
        props: {
            id: {
                type: String
            }
        },
        setup(props) {
            const router = useRouter()
            const store = useStore()
            const { notify } = useNotificator()
            const projectName = ref("")

            if(props.id) {
                const project = store.state.project.projects.find(proj => proj.id == props.id)
                projectName.value = project?.name || ''
            }

            const save = () => {
                if (props.id) {
                    store.dispatch(UPDATE_PROJECT_ACTION, {
                        id: props.id,
                        name: projectName.value
                    }).then(() => responseSuccess())
                } else {
                    store.dispatch(CREATE_PROJECT_ACTION, projectName.value)
                        .then(() => responseSuccess())
                }
            }

            const responseSuccess = () => {
                projectName.value = ''
                notify(NotificationType.SUCCESS, 'Ação efetuada', 'Projeto cadastrado com sucesso!')
                router.push('/projects')
            }
            
            return {
                projectName,
                save
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
                <input type="text" class="input" v-model="projectName" id="projectName" />
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