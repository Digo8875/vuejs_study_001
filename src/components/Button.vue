<script lang="ts">
    import { defineComponent } from 'vue'

    export default defineComponent({
        name: "Button",
        props: {
            disabled: {
                type: Boolean
            },
            iconClass: {
                type: String,
                required: true
            },
            text: {
                type: String,
                required: true
            }
        },
        emits: ["clickEvent"],
        methods: {
            clicked () {
                this.$emit("clickEvent")
            }
        }
    })
</script>

<template>
    <button class="button" @click="clicked" :disabled="disabled">
        <span class="icon" v-if="iconClass">
            <i :class="iconClass"></i>
        </span>
        <span>{{text}}</span>
    </button>
</template>

<style>

</style>