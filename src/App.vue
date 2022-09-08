<script setup lang="ts">
    import SideBar from './components/SideBar.vue'
    import Notification from './components/Notification.vue';

    function darkModeEvent(darkMode: boolean) {
        console.log("App modo escuro")
        console.log(darkMode)

        var element = document.getElementById("main")
        if (element) {
            if (darkMode) {
                element.classList.add("dark-mode")
            } else {
                element.classList.remove("dark-mode")
            }
        }
    }
</script>

<template>
    <main class="columns is-mobile is-gapless is-multiline" id="main">
        <Notification />
        <div class="column is-12-mobile is-4-tablet is-4-desktop is-3-widescreen">
            <SideBar @darkModeEvent="darkModeEvent"/>
        </div>
        <div class="column is-12-mobile is-8-tablet is-8-desktop is-9-widescreen content">
            <router-view></router-view>
        </div>
    </main>
</template>

<style>
    main {
        --bg-primary: #EBEBEB;
        --text-primary: #141414;
    }

    main.dark-mode {
        --bg-primary: #141414;
        --text-primary: #EBEBEB;
    }

    .content {
        background-color: var(--bg-primary);
    }
</style>