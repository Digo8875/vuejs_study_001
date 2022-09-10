<script lang="ts">
    import { defineComponent } from 'vue'
    import Cronometer from './Cronometer.vue'
    import Box from './Box.vue'
    import type { PropType } from 'vue'
    import type ITask from '../interfaces/TaskI'

    export default defineComponent({
        name: "Task",
        emits: ["taskSelectedEvent"],
        components: {
            Cronometer,
            Box
        },
        props: {
            task: {
                type: Object as PropType<ITask>,
                required: true
            }
        },
        methods: {
            taskSelected() : void {
                this.$emit('taskSelectedEvent', this.task)
            }
        }
    })
</script>

<template>
    <Box>
        <div class="columns clickable" @click="taskSelected">
            <div class="column is-4">
                {{task.description || "Tarefa sem descrição"}}
            </div>
            <div class="column is-3">
                {{ task.project?.name || "N/D" }}
            </div>
            <div class="column">
                <Cronometer :timeInSeconds="task.durationSeconds"/>
            </div>
        </div>
    </Box>
</template>

<style scoped>
    .clickable {
        cursor: pointer;
    }
</style>