<script lang="ts">
    import { defineComponent } from 'vue'
    import Timer from './Timer.vue'

    export default defineComponent({
        name: "Form",
        components: {
            Timer
        },
        data () {
            return {
                description: ""
            }
        },
        methods: {
            finishTask (elapsedTime: Number) : void {
                console.log("Tempo da tarefa: ", elapsedTime)
                console.log("Descrição da tarefa: ", this.description)
                this.$emit("taskSaveEvent", {
                    durationSeconds: elapsedTime,
                    description: this.description
                })
                this.description = ""
            }
        },
        emits: ["taskSaveEvent"]
    })
</script>

<template>
    <div class="box form">
        <div class="columns">
            <div class="column is-8" role="form" aria-label="Formulário para criar nova tarefa">
                <input type="text" class="input" placeholder="Qual tarefa deseja iniciar?" v-model="description">
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