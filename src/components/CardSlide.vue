<template>
    <div class="flex flex-col lg:flex-row justify-start lg:justify-center min-w-full rounded-xl shadow-md w-full min-h-full mx-4 p-5 overflow-hidden lg:max-w-[1654px] lg:max-h-[788]">
        <img class="object-cover w-full rounded-xl mb-3 lg:mb-0 lg:mr-5 lg:w-1/2 " :src="img" alt="img">
        <div class="w-full lg:w-1/2 h-full">
            <h2 class="text-center font-bold text-3xl text-brand-primary my-3">{{ title }}</h2>
            <slot></slot>
        </div>
    </div>
</template>

<script>
export default {

    props: {
        img: {
            type: String,
            required: true, 
        },
        title: {
            type: String,
            required: true,
        }
    },
    
}
</script>