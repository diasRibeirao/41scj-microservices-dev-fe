<template>
    <div class="back-init">
        <div class="box-init"></div>

        <div class="vue-template">
            <div class="form-group">
                <Logo />
            </div>

            <div class="container-init">
                <p>        
                    <img src="@/assets/van.png" alt="VanCerta">
                </p>

                <div class="form-group">
                    <h2>Conforto e segurança</h2>
                </div>
            </div>

            <div class="buttons-init">
                <div class="btn-group pt-2">
                    <button @click="login('ROLE_PAIS_RESPONSAVEIS')" type="button" class="btn btn-light btn-lg btn-w">PAIS OU RESPONSÁVEL</button>
                </div>
                <div class="btn-group pt-2">
                    <button @click="login('ROLE_PARCEIROS')" type="button" class="btn btn-outline-light btn-lg btn-w">PARCEIRO</button>
                </div>
            </div>
        </div>

        
    </div>
</template>

<script>
import Logo from '@/components/Init/Logo.vue'

export default {
    data() {
        return {}
    },
    components: {
        Logo 
    },
    methods: {
        login: function(role) {
            this.$router.push({
                path: '/login'
            });
            
            this.$store.commit('updateTipoUsuario', role);
        }
    }
}
</script>