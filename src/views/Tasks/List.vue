<script lang="ts">
    import { computed, defineComponent, ref, watchEffect } from 'vue'
    import { useStore } from '@/store'
    import { LIST_PROJECT_ACTION } from '@/store/action-types'
    import { NotificationType } from '@/interfaces/NotificationI'
    import useNotificator from '@/hooks/notificator'
    import Form from '@/components/Form.vue'
    import Task from '@/components/Task.vue'
    import Box from '@/components/Box.vue'
    import Modal from '@/components/Modal.vue'
    import type TaskI from '@/interfaces/TaskI'
    import { CREATE_TASK_ACTION, LIST_TASK_ACTION, UPDATE_TASK_ACTION } from '@/store/action-types'

    export default defineComponent({
        name: "List",
        components: {
            Form,
            Task,
            Box,
            Modal
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
        setup() {
            const store = useStore()
            const { notify } = useNotificator()
            store.dispatch(LIST_PROJECT_ACTION)
            store.dispatch(LIST_TASK_ACTION)

            const filter = ref("")
            // const tasks = computed(() => store.state.task.tasks?.filter(t => !filter.value || t.description.includes(filter.value)))

            watchEffect(() => {
                store.dispatch(LIST_TASK_ACTION, filter.value)
            })

            return {
                tasks: computed(() => store.state.task.tasks),
                store,
                notify,
                filter
            }
        }
    })

</script>

<template>
    <Form @taskSaveEvent="saveTask"/>
    <div class="lista">
        <Box v-if="isListEmpty">
            Não há tarefas cadastradas hoje
        </Box>
        <div class="field">
            <p class="control has-icons-left">
                <input class="input" type="text" placeholder="Digite para filtrar" v-model="filter">
                <span class="icon is-small is-left">
                    <i class="fas fa-search"></i>
                </span>
            </p>
        </div>

        <Task v-for="(task, index) in tasks" :key="index" :task="task" @taskSelectedEvent="selectTask"/>

        <Modal :showModal="selectedTask != null">
            <template v-slot:header>
                <p class="modal-card-title">Editar Tarefa</p>
                <button class="delete" aria-label="close" @click="closeModal"></button>
            </template>
            <template v-slot:body>
                <div class="field">
                    <label for="taskDescription" class="label">
                        Descrição
                    </label>
                    <input type="text" class="input" v-model="selectedTask.description" id="taskDescription"/>
                </div>
            </template>
            <template v-slot:footer>
                <button class="button is-success" @click="updateTask">Salvar</button>
                <button class="button" @click="closeModal">Cancelar</button>
            </template>
        </Modal>
    </div>
</template>

<style>

</style>