<template>
    <router-link :to="{ name: to }" :class="{ 'border-b-2 border-brand-primary': isActive }" 
        class="block font-semibold text-brand-secundary mt-5 mx-3 max-w-max active:bg-brand-primary/30 active:border-b-2 active:border-brand-primary active:text-white pt-1 px-2 rounded-t transition-all"
    >
        <slot></slot>
    </router-link>
</template>

<script>
export default {

    props: {
        to:{
            to: String,
            default: 'home'
        }
    },

    computed: {
        isActive() {
            const { name } = this.$route

            return name === this.to ? true : false

        },
    },
}
</script>