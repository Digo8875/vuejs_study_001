<script lang="ts">
    import { defineComponent } from 'vue'

    export default defineComponent({
        name: "Cronometer",
        props: {
            timeInSeconds: {
                type: Number,
                default: 0
            }
        },
        computed: {
            elapsedTime () {
                return new Date(this.timeInSeconds * 1000).toISOString().substr(11,8)
            }
        }
    })
</script>

<template>
    <section>
        <strong class="display">
            {{ elapsedTime }}
        </strong>
    </section>
</template>

<style scoped>
    .display {
        color: var(--text-primary);
    }
</style>