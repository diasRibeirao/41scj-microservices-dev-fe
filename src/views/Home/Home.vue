<template>
  <div class="wrap">  
    <div class="app-container">
      <Header titulo="VanCerta" sair="true" /> 

      <div class="container pt-3">
          <h3>{{nomeCompleto()}}</h3>



          <section class="gradient-custom">
            <div v-for="menu in menus" :key="menu.id">

              <div class="card mt-1">
                <a href="#">
                  <div class="card-body">
                    <div class="row">
                        <div class="col">
                          <div class="d-flex flex-start">
                              <div style="width: 60px;">
                                <span :class="menu.icone" style="font-size: 3.2rem;"></span>
                              </div>
                              <div class="flex-grow-1 flex-shrink-1 pt-3">
                                <div>
                                    <div class="d-flex justify-content-between align-items-center">
                                      <h5 class="mb-1">
                                          {{menu.nome}}
                                      </h5>
                                      <div style="padding-right: 10px">
                                         <span class="bi bi-arrow-right " style="font-size: 1rem;"></span>
                                      </div>
                                    </div>
                                    <p class="small mb-0">
                                      {{menu.descricao}}
                                    </p>
                                </div>
                              </div>
                          </div>
                        </div>
                    </div>
                  </div>
                  </a>
              </div>
            </div>
          </section>
          
      </div>

      <b-form-group class="footer">
          
        <b-container class="pt-3">
          <b-row>
            <b-col>
              <b-form-group>
                <span class="bi bi-house-door"></span>
              </b-form-group>
              Início
            </b-col>
            <b-col>
              <b-form-group>
                <span class="bi bi-chat-left"></span>
              </b-form-group>
              Mensagens
            </b-col>
            <b-col>
              <b-form-group>
                <span class="bi bi-person"></span>
              </b-form-group>
              Conta
            </b-col>
          </b-row>
        </b-container>

      </b-form-group>
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
          menus: []
        }
    },
    components: {
        Header 
    },
     computed: {
      ...mapState(["role", "login", "usuario"])
    },
    methods: {     
      nomeCompleto() {
        return this.usuario.nome + ' ' + this.usuario.sobrenome;
      }
    },
    created(){ 
      this.$loading(true);
      this.menus = [];

      this.$store.dispatch("SET_ROLE", window.localStorage.role);
      this.$store.dispatch("SET_USUARIO", JSON.parse(window.localStorage.usuario));

      api.get("/usuarios/menus/role/" + this.role)
          .then((response) => {
            this.menus = response.data;
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
    mounted() {
        this.$loading(false);
    }
}
</script>