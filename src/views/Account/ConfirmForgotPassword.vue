<template>
  <div class="wrap">  
    <div class="app-container">
      <Header titulo="Confirmar esqueci senha" retorno="/forgot-password" />

      <div class="container pt-3 px-5">
          <h3>{{tipoUsuario()}}</h3>
            <p>
              Por favor, informe o código de 4 digitos enviado para número de celular {{form.telefone}}
            </p>
            <div class="form-group text-center pt-2">
              <validation-observer ref="observer" v-slot="{ handleSubmit }">
                <b-form @submit.stop.prevent="handleSubmit(onSubmit)">

                  <validation-provider
                      name="código"
                      :rules="{ required: true, min: 4, max: 4 }"
                      v-slot="validationContext">

                      <b-form-group id="codigo-input-group" label="Código" label-for="codigo-input">
                          <b-form-input
                          id="codigo-input"
                          name="codigo-input"
                          v-model="form.codigo"
                          :state="getValidationState(validationContext)"
                          aria-describedby="input-codigo-feedback"
                          ></b-form-input>

                          <b-form-invalid-feedback id="input-codigo-feedback">{{ validationContext.errors[0] }}</b-form-invalid-feedback>
                      </b-form-group>
                  </validation-provider>

                  <b-form-group class="pt-3">
                      <b-button type="submit" variant="btn btn-dark btn-lg btn-w">CONFIRMAR</b-button>
                  </b-form-group>
                  <b-form-group class="pt-2">
                      <button type="button" @click.prevent="reenviar" class="btn btn-outline-secondary btn-lg btn-w">REENVIAR CÓDIGO</button>
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
            telefone: '',
            codigo: '',
            idNotificacao: 2
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
        
        /*voltar para esta chamada: 
        api.post("/usuarios/ativar", this.form)
        */
        api.get("/usuarios/1")
          .then((response) => {
            this.$store.dispatch("SET_USUARIO", response.data);       
            this.$router.push({path: '/redefine-password'});
          })
          .catch((error) => {
              let msg = 'Ocorreu um erro inesperado. Tente novamente mais tarde';
              if(error.response){
                  msg = error.response.data.msg;
              }

              this.$fire({text: msg, type: "error" }).then(() => this.$loading(false));
          });
                  
      },
      reenviar() {
        this.$loading(true);

        api
          .post("/usuarios/esqueceu-senha", {telefone: this.form.telefone})
          .then((response) => {
            this.$store.dispatch("SET_USUARIO", response.data);       
            this.$fire({text: "Código reenviado com sucesso", type: "success"})
            .then(() => this.$loading(false));
          })
          .catch((error) => {
              let msg = 'Ocorreu um erro inesperado. Tente novamente mais tarde';
              if(error.response){
                  msg = error.response.data.msg;
              }

              this.$fire({text: msg, type: "error" }).then(() => this.$loading(false));
          });
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