<template>
  <div class="wrap">  
    <div class="app-container">
      <Header titulo="Esqueci a senha" retorno="/login" />

      <div class="container pt-3 px-5">
          <h3>{{tipoUsuario()}}</h3>
            <div class="form-group text-center pt-2">
              <validation-observer ref="observer" v-slot="{ handleSubmit }">
                <b-form @submit.stop.prevent="handleSubmit(onSubmit)">

                  <validation-provider
                      name="Celular"
                      :rules="{ required: true, min: 15, max: 15 }"
                      v-slot="validationContext">

                      <b-form-group id="telefone-input-group" label="Celular" label-for="telefone-input">
                          <b-form-input
                          id="telefone-input"
                          name="telefone-input"
                          v-mask="'(##) #####-####'"
                          v-model="form.telefone"
                          :state="getValidationState(validationContext)"
                          aria-describedby="input-telefone-feedback"
                          ></b-form-input>

                          <b-form-invalid-feedback id="input-telefone-feedback">{{ validationContext.errors[0] }}</b-form-invalid-feedback>
                      </b-form-group>
                  </validation-provider>

                  <b-form-group class="pt-3">
                      <b-button type="submit" variant="btn btn-dark btn-lg btn-w">ENVIAR</b-button>
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
            telefone: ''
          }
        }
    },
    components: {
        Header 
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

        api.post("/usuarios/esqueceu-senha", this.form)
          .then((response) => {
            this.$store.dispatch("SET_USUARIO", response.data);       
            this.$router.push({path: '/confirm-forgot-password'});
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
          
      }
    },
    created(){ 
       this.$store.dispatch("SET_ROLE", window.localStorage.role);
    },
    mounted() {
        this.$loading(false);
    }
}
</script>