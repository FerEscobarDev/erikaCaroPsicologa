<template>
    <div class="flex justify-center items-center p-3 w-full md:max-w-[1920px] h-full lg:max-h-min">
        <div class="flex flex-col justify-start lg:max-w-[1654px] w-full min-h-full rounded-xl shadow-2xl p-5">
            <h2 class="text-center font-bold text-3xl text-purple-500 my-3 md:mt-0">Amiga No Estás Sola</h2>
            <p class="text-gray-600 font-semibold text-justify">
                Comunidad de mujeres, apoyo y acompañamiento psicológico grupal e individual, lucha y prevención contra diferentes tipos de violencias.
            </p>
            <h5 class="font-semibold text-brand-claro my-2">
                <span class="text-gray-600">Reuniones grupales:</span> 
                Martes de 8pm a 9pm
                <a 
                    class="text-brand-secundary underline ml-3" 
                    href="https://api.whatsapp.com/send?phone=573243874221" 
                    target="_blank">
                    Únete
                </a>
            </h5>
            
            <div class="mt-5 relative w-full h-full min-h-[750px]">
                <img src="/img/testimonio_3.png" alt="reunión virtual en grupo" class="hidden lg:block object-cover min-h-[750px] rounded-xl"/>
                <img src="/img/testimonio_2.png" alt="testimonio de amiga no estás sola" class="absolute top-0 lg:top-auto lg:bottom-0 left-0 w-full lg:w-1/3 rounded-xl shadow-md drop-shadow-xl animate-float mr-8 mb-4 lg:m-5 hover:lg:w-1/2 hover:lg:transition-all hover:lg:duration-1000 lg:transition-all lg:duration-500"/> 
                <img src="/img/testimonio_1.png" alt="testimonio de amiga no estás sola" class="hidden lg:block absolute bottom-0 right-0 lg:w-1/4 rounded-xl shadow-md drop-shadow-xl animate-float m-5 hover:lg:w-1/3 hover:lg:transition-all hover:lg:duration-1000 lg:transition-all lg:duration-500"/>     
            </div>
        </div>
    </div>
</template>

<script>
export default {
    setup () {
        

        return {}
    }
}
</script>