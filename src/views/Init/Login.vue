<template>
    <div class="back-init">
        <div class="box-init"></div>
 
        <div class="vue-template">
            <div class="form-group">
                <Logo />
            </div>
            <h3>{{tipoUsuario}}</h3>

            <div class="container container-init pt-3 px-5">
                <form>
                    <div class="form-group">
                        <label>Celular (DD + Número)</label>
                        <input type="tel" id="login" name="login" v-model="login.login" class="form-control" required />
                    </div>

                    <div class="form-group">
                        <label>Senha</label>
                        <input type="password" id="senha" name="senha" v-model="login.senha" class="form-control" required />
                    </div>

                    <div class="text-center pt-4">
                        <button type="button" @click.prevent="logar" class="btn btn-dark btn-lg btn-w">LOGIN</button>
                    </div>

                    <p class="forgot-password text-center mt-2 mb-4">
                        <router-link to="/forgot-password">Esqueceu a Senha <span class="bi bi-file-lock2"></span>?</router-link>
                    </p>
                </form>
            </div>

            <div class="buttons-init">                
                 <div class="btn-group pt-2">
                    <button @click="register" type="button" class="btn btn-outline-light btn-lg btn-w">CRIAR CONTA</button>
                </div>
            </div>
        </div>

        
    </div>
</template>

<script>
import axios from "axios";
import Logo from '@/components/Init/Logo.vue'
import 'bootstrap-icons/font/bootstrap-icons.css'

export default {
    data() {
        return {
            tipoUsuario: '',
            login: {
                login: "",
                senha: "",
                role: this.$store.state.tipoUsuario
            }
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
       logar() {
           axios
            .post("http://192.168.15.200:8765/usuarios/login", this.login)
            .then((res) => {
                sessionStorage.setItem("usuario", JSON.stringify(res.data));
                this.$store.commit('updateUsuario', JSON.parse(sessionStorage.getItem("usuario")));
                this.$router.push({path: '/home'});
            })
            .catch((error) => {
                console.log(error.response.data)
                if( error.response ){
                    alert(error.response.data.msg); 
                } else {
                    alert('Ocorreu um erro inesperado. Tente novamente mais tarde'); 
                }
            });
       },
       register: function() {
            this.$router.push({
                path: '/register'
            });
            
        }
    }
}
</script>