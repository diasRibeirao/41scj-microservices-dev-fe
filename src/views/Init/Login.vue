<template>
    <div class="back-init">
        <div class="box-init"></div>
 
        <div class="vue-template">
            <div class="form-group">
                <Logo />
            </div>
            <h3>{{tipoUsuario}}</h3>

            <div class="container-init">
               
            </div>

            <div class="buttons-init">                
                 <div class="btn-group pt-2">
                    <button @click="login('ROLE_PARCEIROS')" type="button" class="btn btn-outline-light btn-lg btn-w">CRIAR CONTA</button>
                </div>
            </div>
        </div>

        
    </div>
</template>

<script>
import Logo from '@/components/Init/Logo.vue'

export default {
    data() {
        return {
            tipoUsuario: ''
        }
    },
    components: {
        Logo 
    },
    created(){
        if (this.$store.state.tipoUsuario == 'ROLE_PARCEIROS') {
            this.tipoUsuario = 'PARCEIROS'
        } else if (this.$store.state.tipoUsuario == 'ROLE_PAIS_RESPONSAVEIS') {
            this.tipoUsuario = 'PAIS OU RESPONSÁVEL'
        } else {
            this.$router.push({path: '/'});
        }
    },
    methods: {
       
    }
}
</script>