<script lang="ts">
    import { key } from '@/store'
    import { defineComponent, computed } from 'vue'
    import { useStore } from 'vuex'
    import Timer from './Timer.vue'

    export default defineComponent({
        name: "Form",
        components: {
            Timer
        },
        data () {
            return {
                description: "",
                projectId: ""
            }
        },
        methods: {
            finishTask (elapsedTime: Number) : void {
                console.log("Tempo da tarefa: ", elapsedTime)
                console.log("Descrição da tarefa: ", this.description)
                this.$emit("taskSaveEvent", {
                    durationSeconds: elapsedTime,
                    description: this.description,
                    project: this.projects.find(project => project.id == this.projectId)
                })
                this.description = ""
            }
        },
        emits: ["taskSaveEvent"],
        setup () {
            const store = useStore(key)
            return {
                projects: computed(() => store.state.project.projects)
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