<script lang="ts">
    import { defineComponent } from 'vue'
    import Form from './Form.vue'
    import Task from './Task.vue'
    import Box from './Box.vue'
    import type TaskI from '../interfaces/TaskI'

    export default defineComponent({
        name: "TaskManager",
        components: {
            Form,
            Task,
            Box
        },
        data () {
            return {
                tasks: [] as TaskI[]
            }
        },
        computed: {
            isListEmpty () : boolean {
                return this.tasks.length === 0
            }
        },
        methods: {
            saveTask (task: TaskI) {
                console.log("Salvar tarefa")
                this.tasks.push(task)
                console.log(this.tasks)
            }
        }
    })
</script>

<template>
    <Form @taskSaveEvent="saveTask"/>
    <div class="lista">
        <Task v-for="(task, index) in tasks" :key="index" :task="task"/>
        <Box v-if="isListEmpty">
            Não há tarefas cadastradas hoje
        </Box>
    </div>
</template>

<style scoped>
    .lista {
        padding: 1.25rem;
    }
</style>