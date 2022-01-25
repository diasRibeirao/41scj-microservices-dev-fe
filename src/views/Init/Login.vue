<template>
    <div class="wrap-init">  
        <div class="init-background"></div>
        <div class="init-container">
            <div class="form-group text-center pt-4">
                <Logo />
            </div>
            <h4>{{tipoUsuario()}}</h4>
            <div class="form-group text-center pt-2">
                <div class="container pt-3 px-5">
                    <validation-observer ref="observer" v-slot="{ handleSubmit }">
                        <b-form @submit.stop.prevent="handleSubmit(onSubmit)">

                            <validation-provider
                                name="Celular"
                                :rules="{ required: true, min: 10, max: 11 }"
                                v-slot="validationContext">

                                <b-form-group id="login-input-group" label="Celular (DD + Número)" label-for="login-input">
                                    <b-form-input
                                    id="login-input"
                                    name="login-input"
                                    v-model="form.login"
                                    :state="getValidationState(validationContext)"
                                    aria-describedby="input-login-feedback"
                                    ></b-form-input>

                                    <b-form-invalid-feedback id="input-login-feedback">{{ validationContext.errors[0] }}</b-form-invalid-feedback>
                                </b-form-group>
                            </validation-provider>

                             <validation-provider name="Senha" :rules="{ required: true }" v-slot="validationContext">
                                <b-form-group id="senha-input-group" label="Senha" label-for="senha-input">
                                    <b-form-input
                                    type="password"
                                    id="senha-input"
                                    name="senha-input"
                                    v-model="form.senha"
                                    :state="getValidationState(validationContext)"
                                    aria-describedby="input-senha-feedback"
                                    ></b-form-input>

                                    <b-form-invalid-feedback id="input-senha-feedback">{{ validationContext.errors[0] }}</b-form-invalid-feedback>
                                </b-form-group>
                            </validation-provider>

                                <b-form-group class="pt-3">
                                    <b-button type="submit" variant="btn btn-dark btn-lg btn-w">Entrar</b-button>
                                </b-form-group>
                                <b-form-group class="pt-2">
                                    <router-link to="/forgot-password">Esqueci a Senha <span class="bi bi-file-lock2"></span></router-link>
                                </b-form-group>
                        </b-form>    
                    </validation-observer>
                </div>
            </div>
            <div class="form-group init-buttons">
                
                <b-form-group class="text-center pt-2">
                    <b-button @click="cadastrar" class="btn btn-outline-light btn-lg btn-w">CRIAR CONTA</b-button>
                </b-form-group>
                 
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex";
import '@/assets/css/init.css'
import Logo from '@/components/Init/Logo.vue'

export default {
    name: 'Login',
    data() {
        return {
            form: {
                login: '',
                senha: '',
                role: ''
            }
        }
    },
    components: {
        Logo 
    },
    computed: {
      ...mapState(["role"])
    },
    methods: {
        tipoUsuario() {
            if (this.role == 'ROLE_PARCEIROS') {
                return 'PARCEIROS'
            } else if (this.role == 'ROLE_PAIS_RESPONSAVEIS') {
                return 'PAIS OU RESPONSÁVEL'
            } else {
                this.$router.push({path: '/'});
            }
        },
        getValidationState({ dirty, validated, valid = null }) {
            return dirty || validated ? valid : null;
        },
        onSubmit() {
            this.$loading(true);
            
            this.$store.dispatch("LOGAR_USUARIO", this.form)
            .then(response => {
               this.$store.dispatch("SET_USUARIO", response.data);  
               
               if(response.data.situacao == 1) {
                   this.$router.push({name: 'confirm-register', params: {retorno: '/login'}});
               } else {
                    this.$router.push({name: 'home'});
               }
            })
            .catch((error) => {
                let msg = 'Ocorreu um erro inesperado. Tente novamente mais tarde';
                if(error.response){
                    msg = error.response.data.msg;
                }

                this.$fire({
                    text: msg,
                    type: "error",
                }).then(() => this.$loading(false));
            });
        },
        cadastrar: function() {
            this.$router.push({
                path: '/register'
            });
            
        }
    },
    created() {
        this.form.role = this.role;
    },
    mounted() {
        this.$loading(false);
    }
}
</script>