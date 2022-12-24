<template>
    <button :type="type" 
            class="
                min-w-[150px] bg-brand-secundary p-2 text-white rounded-md border-brand-primary border-[1px]
                hover:bg-brand-claro hover:border-brand-secundary active:bg-brand-secundary active:border-brand-primary transition">
        <slot></slot>
    </button>
</template>

<script>
    export default {
        props: {
            type: {
                type: String,
                default: 'submit',
            },
        }        
    }
</script>


