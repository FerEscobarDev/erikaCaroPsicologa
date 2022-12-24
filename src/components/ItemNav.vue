<template>
    <router-link :to="{ name: to }" :class="{ 'border-b-2 border-brand-primary': isActive }" 
        class="block font-semibold text-brand-primary mt-5 mx-3 max-w-max active:bg-brand-claro pt-1 px-2 rounded-t transition"
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