<script lang="ts">
    import { defineComponent } from 'vue'
    import Button from './Button.vue';

    export default defineComponent({
        name: "SideBar",
        components: {
            Button
        },
        data () {
            return {
                darkMode: false
            }
        },
        computed: {
            buttonText () {
                if (this.darkMode) {
                    return "Desativar modo escuro"
                }
                return "Ativar modo escuro"
            }
        },
        methods: {
            toggleMode () {
                console.log("Mudar modo dark/light da página")
                this.darkMode = !this.darkMode
                this.$emit("darkModeEvent", this.darkMode)
            }
        },
        emits: ["darkModeEvent"]
    })
</script>

<template>
    <header>
        <div class="columns is-mobile is-gapless is-vcentered is-justify-content-center">
            <div class="column is-5-mobile is-5-tablet is-6-desktop is-4-widescreen is-2-fullhd">
                <h1 class="box has-background-light p-1">
                    <img src="../assets/logo.png" alt="">
                </h1>
            </div>
        </div>
        <div class="columns is-mobile is-gapless is-vcentered">
            <div class="column has-text-centered">
                <Button @clickEvent="toggleMode" :disabled="false" iconClass="" :text="buttonText"/>
            </div>
        </div>
        <div class="columns is-mobile is-gapless is-vcentered">
            <nav class="panel mt-5">
                <ul>
                    <li>
                        <router-link to="/" class="link">
                            <i class="fas fa-tasks">
                                Tarefas
                            </i>
                        </router-link>
                    </li>
                    <li>
                        <router-link to="/projects" class="link">
                            <i class="fas fa-project-diagram">
                                Projetos
                            </i>
                        </router-link>
                    </li>
                </ul>
            </nav>
        </div>
    </header>
</template>

<style scoped>
    header {
        padding: 1rem;
        background: #0d3b66;
        width: 100%;
        height: 100vh;
    }
    @media only screen and (max-width: 425px) {
        header {
            padding: 2.5rem;
            height: auto;
        }
    }
    .panel li {
        margin: 8px 0;
    }
    .link {
        color: #fff;
    }
    .link:hover {
        color: #FAF0CA;
    }
    .link.router-link-active {
        color: #FAF0CA;
    }
</style>