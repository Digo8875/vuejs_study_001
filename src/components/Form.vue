<script lang="ts">
    import { key } from '@/store'
    import { defineComponent, computed, ref } from 'vue'
    import { useStore } from 'vuex'
    import Timer from './Timer.vue'

    export default defineComponent({
        name: "Form",
        components: {
            Timer
        },
        emits: ["taskSaveEvent"],
        setup (props, {emit}) {
            const store = useStore(key)

            const description = ref("")
            const projectId = ref("")
            const projects = computed(() => store.state.project.projects)

            const finishTask = (elapsedTime: Number) : void => {
                console.log("Tempo da tarefa: ", elapsedTime)
                console.log("Descrição da tarefa: ", description.value)
                emit("taskSaveEvent", {
                    durationSeconds: elapsedTime,
                    description: description.value,
                    project: projects.value.find(project => project.id == projectId.value)
                })
                description.value = ""
            }

            return {
                description,
                projectId,
                projects,
                finishTask
            }
        }
    })
</script>

<template>
    <div class="box form">
        <div class="columns">
            <div class="column is-5" role="form" aria-label="Formulário para criar nova tarefa">
                <input type="text" class="input" placeholder="Qual tarefa deseja iniciar?" v-model="description">
            </div>
            <div class="column is-3">
                <div class="select">
                    <select v-model="projectId">
                        <option value="">Selecione o projeto</option>
                        <option :value="project.id" v-for="project in projects" :key="project.id" >
                            {{ project.name }}
                        </option>
                    </select>
                </div>
            </div>
            <div class="column">
                <Timer @timerStoppedEvent="finishTask"/>
            </div>
        </div>
    </div>
</template>

<style>
    .form {
        background-color: var(--bg-primary);
        color: var(--text-primary);
    }
</style>