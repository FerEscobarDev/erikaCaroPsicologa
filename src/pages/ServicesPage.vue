<template>
    <div class="flex justify-center items-center p-3 w-full lg:max-w-[1920px] h-full lg:max-h-min">
        <div @click="movSliderLeft" class="fixed left-0 top-0 lg:static flex justify-center items-center h-screen lg:h-min w-16">
            <svg class="fill-brand-secundary/60 lg:fill-brand-secundary lg:hover:fill-brand-secundary/60 hover:fill-brand-secundary cursor-pointer" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><!--! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->
                <path d="M41.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 256 246.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"/>
            </svg>
        </div>
        <div class="lg:max-w-[1654px] lg:max-h-[788px] w-full min-h-[630px] inline-flex overflow-x-hidden rounded-xl shadow-[0px_20px_30px_8px_rgba(0,0,0,0.3)]">
            <Transition
                enter-active-class="transition-all ease-in duration-700"
                enter-from-class="transition-all translate-x-full opacity-70"
                enter-to-class="transition-all opacity-100"
                leave-active-class="transition-all ease-in duration-500"
                leave-from-class="transition-all opacity-100"
                leave-to-class="transition-all -translate-x-full opacity-70"
            >
                <CardSlide v-if="show === 1" class="snap-center" :img="'../img/personal.png'" :title="'Desarrollo Personal'">
                    <h3 class="font-semibold text-xl text-brand-secundary mb-2">Talleres grupales y Asesorías personalizadas</h3>
                    <ul class="list-disc list-inside text-gray-600 font-semibold ml-2 mb-2">
                        <li>¿Cómo potenciar tus habilidades?</li>
                        <li>¿Cómo venderte de acuerdo con tu profesión?</li>
                        <li>Vende tu servicio efectivamente</li>
                        <li>Vence tus creencias limitantes</li>
                        <li>Fortalecimiento de habilidades socioemocionales</li>
                        <li>Acompañamiento en el proceso de definición</li>
                        <li>Desarrollo personal, orientación profesional, aprendizaje de técnicas de estudio, acompañamiento para conseguir tus objetivos</li>
                        <li>Mejora de la autoestima, desarrollo de habilidades sociales</li>
                    </ul>
                    <div class="flex justify-center items-center">
                        <a 
                            class="min-w-[150px] m-4 bg-brand-secundary p-2 text-white rounded-md border-brand-primary border-[1px]
                                hover:bg-brand-claro hover:border-brand-secundary active:bg-brand-secundary active:border-brand-primary transition
                                text-center" 
                            href="https://api.whatsapp.com/send?phone=573213552207" 
                            target="_blank">
                            Hablemos
                        </a> 
                    </div>
                </CardSlide>

                <CardSlide v-else-if="show === 2" class="snap-center" :img="'../img/organizacional.png'" :title="'Organizacional'">
                    <h3 class="font-semibold text-xl text-brand-secundary">Talleres y capacitaciones:</h3>
                    <h5 class="font-semibold text-brand-claro ml-2 my-2">Servicio al cliente y comunicación asertiva</h5>
                    <p class="text-justify text-gray-600 font-semibold ml-2">   

                        Los colaboradores de tu empresa recibirán acompañamiento para entender que es la relación que una 
                        empresa establece con sus consumidores. Consiste en brindar todo el apoyo que el comprador de tus 
                        productos o el contratista de tus servicios necesita para tener una buena experiencia en todas las 
                        etapas de tu proceso de compra y postventa.
                            
                    </p>
                    <h5 class="font-semibold text-brand-claro ml-2 my-2">Liderazgo y trabajo en equipo</h5>
                    <p class="text-justify text-gray-600 font-semibold ml-2">   

                            El liderazgo y trabajo en equipo se basan en una tendencia de equipos e influencia de grandes o pequeños 
                            grupos en los que se necesita un líder para guiar a las personas y equipo hacia los objetivos que se marquen, 
                            es por ello que para toda organización exitosa es necesario incluir capacitaciones en las que sus empleados 
                            conozcan sobre el desarrollo de liderazgo.
                    </p>
                    <h3 class="font-semibold text-xl text-brand-secundary my-3">Selección y contratación de personal:</h3>
                    <p class="text-justify text-gray-600 font-semibold">   

                        Una asesoría a tu área del manejo de personal que permita fortalecer las competencias y el plan de selección, 
                        por medio de indicadores de gestión que apunten al objetivo deseado por la organización .

                    </p>
                    <div class="flex justify-center items-center">
                        <a 
                            class="min-w-[150px] m-4 bg-brand-secundary p-2 text-white rounded-md border-brand-primary border-[1px]
                                hover:bg-brand-claro hover:border-brand-secundary active:bg-brand-secundary active:border-brand-primary transition
                                text-center" 
                            href="https://api.whatsapp.com/send?phone=573213552207" 
                            target="_blank">
                            Hablemos
                        </a> 
                    </div>
                </CardSlide>

                <CardSlide v-else-if="show === 3" class="snap-center" :img="'../img/educativo.jpg'" :title="'Educativo'">
                    <h3 class="font-semibold text-xl text-brand-secundary">Colegios:</h3>
                    <h5 class="font-semibold text-brand-claro ml-2 my-2">Plan de orientación vocacional</h5>
                    <p class="text-justify text-gray-600 font-semibold ml-2">   

                        Proyectar el futuro profesional va mucho más allá de simplemente definir qué quieres estudiar. 
                        Para este tipo de proyección necesitas identificar qué es lo que te gusta, reconocer tus fortalezas 
                        y debilidades, y desarrollar hábitos que te lleven a la excelencia en cualquiera sea tu elección. 
                        Con todo, sabemos que muchos de los consejos que se suelen recibir parecen ser muy abstractos, 
                        dejándote con preguntas como: ¿por dónde empiezo? Es por esto que queremos compartirte cuatro tips 
                        prácticos para ayudarte en la búsqueda de proyectar tu futuro profesional y cumplir tus metas.
                            
                    </p>
                    <h3 class="font-semibold text-xl text-brand-secundary mt-2">Universidades:</h3>
                    <h5 class="font-semibold text-brand-claro ml-2 my-2">Conferencias</h5>
                    <ul class="text-gray-600 font-semibold list-none list-inside ml-2">
                        <li>
                            Destrezas altamente estimadas en el entorno laboral
                        </li>
                        <li>
                            Hábitos de los graduados que trascienden
                        </li>
                        <li>
                            ¿Como convertirte en un líder que sobresale?
                        </li>
                        <li>
                            Claves para insistir y no desistir.
                        </li>
                    </ul>
                    <div class="flex justify-center items-center">
                        <a 
                            class="min-w-[150px] m-4 bg-brand-secundary p-2 text-white rounded-md border-brand-primary border-[1px]
                                hover:bg-brand-claro hover:border-brand-secundary active:bg-brand-secundary active:border-brand-primary transition
                                text-center" 
                            href="https://api.whatsapp.com/send?phone=573213552207" 
                            target="_blank">
                            Hablemos
                        </a> 
                    </div>
                </CardSlide>
            </Transition>
        </div>

        <div @click="movSliderRight" class="fixed right-0 top-0 lg:static flex justify-center items-center h-screen lg:h-min w-16">
            <svg class="fill-brand-secundary/60 lg:fill-brand-secundary lg:hover:fill-brand-secundary/60 hover:fill-brand-secundary cursor-pointer" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><!--! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->
                <path d="M278.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-160 160c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L210.7 256 73.4 118.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l160 160z"/>
            </svg>
        </div>
    </div>
</template>

<script>

import CardSlide from '../components/CardSlide.vue'

export default {

    components: {
        CardSlide,
    },

    mounted () {
        this.playSlider()
    },

    data() {
        return {
            show: 1,
            timer: 0,
        }
    },

    methods: {
        movSliderLeft() {

            if(this.show === 1){
                this.show = 3
            }else{
                this.show--
            }

            this.resetSlider()

        },
        movSliderRight() {

            if(this.show === 3){
                this.show = 1
            }else{
                this.show++
            }

            this.resetSlider()

        },
        playSlider() {

            let play = this
            this.timer = setInterval(() => {
                play.movSliderRight()
            }, 5000)

        },
        resetSlider() {
            clearInterval(this.timer)
            this.playSlider()
        }
    },
}
</script>