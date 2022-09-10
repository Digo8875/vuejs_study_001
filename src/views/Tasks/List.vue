<script lang="ts">
    import { computed, defineComponent } from 'vue'
    import { useStore } from '@/store'
    import { LIST_PROJECT_ACTION } from '@/store/action-types'
    import { NotificationType } from '@/interfaces/NotificationI'
    import useNotificator from '@/hooks/notificator'
    import Form from '@/components/Form.vue'
    import Task from '@/components/Task.vue'
    import Box from '@/components/Box.vue'
    import type TaskI from '@/interfaces/TaskI'
    import { CREATE_TASK_ACTION, LIST_TASK_ACTION, UPDATE_TASK_ACTION } from '@/store/action-types'

    export default defineComponent({
        name: "List",
        components: {
            Form,
            Task,
            Box
        },
        data () {
            return {
                selectedTask: null as TaskI | null
            }
        },
        methods: {
            saveTask (task: TaskI) : void {
                this.store.dispatch(CREATE_TASK_ACTION, task)
            },
            selectTask (task: TaskI) {
                this.selectedTask = task
            },
            closeModal () {
                this.selectedTask = null
            },
            updateTask () {
                this.store.dispatch(UPDATE_TASK_ACTION, this.selectedTask)
                    .then(() => this.closeModal())
            }
        },
        computed: {
            isListEmpty () : boolean {
                return this.store.state.task.tasks?.length <= 0
            }
        },
        setup () {
            const store = useStore()
            const { notify } = useNotificator()
            store.dispatch(LIST_PROJECT_ACTION)
            store.dispatch(LIST_TASK_ACTION)
            return {
                tasks: computed(() => store.state.task.tasks),
                store,
                notify
            }
        }
    })

</script>

<template>
    <Form @taskSaveEvent="saveTask"/>
    <div class="lista">
        <Task v-for="(task, index) in tasks" :key="index" :task="task" @taskSelectedEvent="selectTask"/>
        <Box v-if="isListEmpty">
            Não há tarefas cadastradas hoje
        </Box>
    </div>
    <div class="modal" :class="{ 'is-active': selectedTask }" v-if="selectedTask">
        <div class="modal-background"></div>
        <div class="modal-card">
            <header class="modal-card-head">
                <p class="modal-card-title">Editar Tarefa</p>
                <button class="delete" aria-label="close" @click="closeModal"></button>
            </header>
            <section class="modal-card-body">
                <div class="field">
                    <label for="taskDescription" class="label">
                        Descrição
                    </label>
                    <input type="text" class="input" v-model="selectedTask.description" id="taskDescription"/>
                </div>
            </section>
            <footer class="modal-card-foot">
                <button class="button is-success" @click="updateTask">Salvar</button>
                <button class="button" @click="closeModal">Cancelar</button>
            </footer>
        </div>
    </div>
</template>

<style>

</style>