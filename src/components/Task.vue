<script lang="ts">
    import { defineComponent, ref } from 'vue'
    import Cronometer from './Cronometer.vue'
    import Box from './Box.vue'
    import type { PropType } from 'vue'
    import type TaskI from '../interfaces/TaskI'
    import { key } from '@/store'
    import { useStore } from 'vuex'

    export default defineComponent({
        name: "Task",
        emits: ["taskSelectedEvent"],
        components: {
            Cronometer,
            Box
        },
        props: {
            task: {
                type: Object as PropType<TaskI>,
                required: true
            }
        },
        setup(props, { emit }) {
            const store = useStore(key)

            const taskSelected = (): void => {
                emit('taskSelectedEvent', props.task)
            }

            return {
                task: props.task,
                taskSelected
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
                <Cronometer :timeInSeconds="task.durationSeconds" />
            </div>
        </div>
    </Box>
</template>

<style scoped>
.clickable {
    cursor: pointer;
}
</style>