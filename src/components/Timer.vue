<script lang="ts">
    import { defineComponent } from 'vue'
    import Cronometer from './Cronometer.vue'
    import Button from './Button.vue'

    export default defineComponent({
        name: "Timer",
        emits: ["timerStoppedEvent"],
        components: {
            Cronometer,
            Button
        },
        data () {
            return {
                timeInSeconds: 0,
                cronometer: 0,
                isCronometerRunning: false
            }
        },
        methods: {
            start () {
                this.isCronometerRunning = true
                this.cronometer = setInterval(() => {
                    console.log("Increment timer")
                    this.timeInSeconds += 1
                }, 1000)
                console.log("Star time");
            },
            stop () {
                this.isCronometerRunning = false
                clearInterval(this.cronometer)
                console.log("Stop time");
                this.$emit("timerStoppedEvent", this.timeInSeconds)
                this.timeInSeconds = 0
            }
        }
    })
</script>

<template>
    <div class="is-flex is-align-items-center is-justify-content-space-between">
        <Cronometer :timeInSeconds="timeInSeconds"/>
        <Button @clickEvent="start" :disabled="isCronometerRunning" iconClass="fas fa-play" text="play"/>
        <Button @clickEvent="stop" :disabled="!isCronometerRunning" iconClass="fas fa-stop" text="stop"/>
    </div>
</template>

<style>

</style>