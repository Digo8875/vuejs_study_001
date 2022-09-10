<script lang="ts">
    import { defineComponent } from 'vue'

    export default defineComponent({
        name: 'Tasks'
    })
</script>

<template>
    <div class="tasks">
        <h1 class="title">
            Tarefas
        </h1>
        <router-view></router-view>
    </div>
</template>

<style scoped>
    .tasks{
        padding: 2.5rem;
    }
</style>