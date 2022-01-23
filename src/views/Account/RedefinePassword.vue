s<template>
  <div class="wrap">  
    <div class="app-container">
      <Header titulo="Redefinir senha" retorno="/confirm-forgot-password" />

      <div class="container pt-3 px-5">
          <h3>{{tipoUsuario()}}</h3>
           
            <div class="form-group text-center pt-2">
              <validation-observer ref="observer" v-slot="{ handleSubmit }">
                <b-form @submit.stop.prevent="handleSubmit(onSubmit)">

                  <validation-provider 
                    name="senha" 
                    :rules="{ required: true, min:6 }" 
                    v-slot="validationContext">

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

                  <validation-provider 
                      name="confirmar senha" 
                      :rules="{ required: true, min:6 }" 
                      v-slot="validationContext">
                    <b-form-group id="senha-input-group" label="Confirmar Senha" label-for="confirmar-senha-input">
                        <b-form-input
                        type="password"
                        id="confirmar-senha-input"
                        name="confirmar-senha-input"
                        v-model="form.confirmarSenha"
                        :state="getValidationState(validationContext)"
                        aria-describedby="input-confirmar-senha-feedback"
                        ></b-form-input>

                        <b-form-invalid-feedback id="input-confirmar-senha-feedback">{{ validationContext.errors[0] }}</b-form-invalid-feedback>
                    </b-form-group>
                  </validation-provider>

                  <b-form-group class="pt-3">
                      <b-button type="submit" variant="btn btn-dark btn-lg btn-w">SALVAR</b-button>
                  </b-form-group>
                  <b-form-group class="pt-2">
                      <button type="button" @click.prevent="pular" class="btn btn-outline-secondary btn-lg btn-w">PULAR</button>
                  </b-form-group>
                </b-form>    
              </validation-observer>
            </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import '@/assets/css/main.css'
import Header from '@/components/Header/Header.vue'
import { api } from "@/services.js";

export default {
    data() {
        return {
          form: {
            senha: '',
            confirmarSenha: ''
          }
        }
    },
    components: {
        Header 
    },
     computed: {
      ...mapState(["role", "usuario"])
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
   
        api.put("/usuarios/reset-password/" + this.usuario.id, this.form)
          .then((response) => {
            this.$store.dispatch("SET_USUARIO", response.data);     
            this.$fire({text: "Senha salva com sucesso", type: "success"});  
            this.$router.push({path: '/home'});
          })
          .catch((error) => {
              let msg = 'Ocorreu um erro inesperado. Tente novamente mais tarde';
              if(error.response){
                  msg = error.response.data.msg;
              }

              this.$fire({text: msg, type: "error" }).then(() => this.$loading(false));
          });
                  
      },
      pular() {
        this.$router.push({path: '/home'});
      }
    },
    created(){ 
       this.$store.dispatch("SET_ROLE", window.localStorage.role);
       this.$store.dispatch("SET_USUARIO", JSON.parse(window.localStorage.usuario));
       this.form.telefone = this.usuario.telefone;
    },
    mounted() {
        this.$loading(false);
    }
}
</script>