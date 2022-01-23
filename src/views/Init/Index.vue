<template>
    <div class="wrap-init">  
        <div class="init-background"></div>
        <div class="init-container">
            <div class="form-group text-center pt-4">
                <Logo />
            </div>
            <div class="form-group text-center pt-4">
                <p>        
                    <img src="@/assets/van.png" alt="VanCerta">
                </p>
                <h2>Conforto e segurança</h2>
            </div>
            <div class="form-group init-buttons">
                
                <b-form-group class="text-center">
                    <b-button @click="login('ROLE_PAIS_RESPONSAVEIS')" class="btn btn-light btn-lg btn-w">PAIS OU RESPONSÁVEL</b-button>
                </b-form-group>
                <b-form-group class="text-center pt-2">
                    <b-button @click="login('ROLE_PARCEIROS')" class="btn btn-outline-light btn-lg btn-w">PARCEIRO</b-button>
                </b-form-group>
                 
            </div>
        </div>
    </div>
</template>

<script>
import '@/assets/css/init.css'
import Logo from '@/components/Init/Logo.vue'

export default {
    name: 'Index',
    data() {
        return {}
    },
    components: {
        Logo 
    },
    methods: {
        login: function(role) {
            this.$loading(true);
            
            this.$router.push({
                path: '/login'
            });
            
            this.$store.dispatch("SET_ROLE", role);
        }
    },
    created() {
        this.$loading(true);
    },
    mounted() {
        this.$loading(false);
    }
}
</script>