<template>
    <div class="flex flex-col justify-between xl:items-center min-h-screen">
        <Navue/>
            <main class="mt-20 h-full max-w-[1920px]">
                <slot></slot>
            </main>
        <Footervue/>   
    </div>
</template>

<script>
import Navue from '../components/Nav.vue';
import Footervue from '../components/Footer.vue';

export default {
    components: {
        Navue,
        Footervue,
    },
}
</script>