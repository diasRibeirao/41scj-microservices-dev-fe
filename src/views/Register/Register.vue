<template>
  <div class="vue-template">  
    <Header titulo="Criar conta" retorno="/login" />

    <div class="container container-init pt-3 px-4">
      <h3>{{tipoUsuario()}}</h3>
      <form>
          <div class="form-group">
              <label>Nome</label>
              <input type="text" id="nome" name="nome" v-model="cadastro.nome" class="form-control" required />
          </div>

          <div class="form-group">
              <label>Sobrenome</label>
              <input type="text" id="sobrenome" name="sobrenome" v-model="cadastro.sobrenome" class="form-control" required />
          </div>
          
          <div class="form-group">
              <label>E-mail</label>
              <input type="text" id="email" name="email" v-model="cadastro.email" class="form-control" required />
          </div>

          <div class="form-group">
              <label>Celular</label>
              <input type="text" id="telefone" name="telefone" v-model="cadastro.telefone" class="form-control" required />
          </div>

          <div class="form-group">
              <label>Senha</label>
              <input type="text" id="senha" name="senha" v-model="cadastro.senha" class="form-control" required />
          </div>

          <div class="form-group">
              <label>Confirmar Senha</label>
              <input type="text" id="confirmarSenha" name="confirmarSenha" v-model="cadastro.confirmarSenha" class="form-control" required />
          </div>    

          <div class="text-center pt-4">
            <button type="button" @click.prevent="cadastar" class="btn btn-dark btn-lg btn-w">SALVAR</button>
          </div>
          
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Header from '@/components/Header/Header.vue'

export default {
    data() {
        return {
          cadastro: {
            nome: '',
            sobrenome: '',
            email: '',
            telefone: '',
            senha: '',
            confirmarSenha: '',
            roles: []
          }
        }
    },
    components: {
        Header 
    },
    methods: {
      tipoUsuario() {
        if (this.$store.state.tipoUsuario == 'ROLE_PARCEIROS') {
            return 'PARCEIROS'
        } else if (this.$store.state.tipoUsuario == 'ROLE_PAIS_RESPONSAVEIS') {
            return 'PAIS OU RESPONSÁVEL'
        } else {
            this.$router.push({path: '/'});
        }
      },
      cadastar() {
        /*axios
          .post("http://192.168.15.200:8765/usuarios", this.cadastro)
          .then((res) => {
              console.log(res.data)
          })
          .catch((error) => {
              if( error.response ){
                console.log(error.response.data)
                  alert(error.response.data.msg); 
              } else {
                  alert('Ocorreu um erro inesperado. Tente novamente mais tarde'); 
              }
          });*/
          // depois no sucesso fará a chamada
          this.dadosUsuario('http://192.168.15.200:8765/usuarios/1');
      },
      dadosUsuario(url) {
        axios
        .get(url)
        .then((res) => {console.log(res.data)
          sessionStorage.setItem("usuario", JSON.stringify(res.data));
          this.$store.commit('updateUsuario', JSON.parse(sessionStorage.getItem("usuario")));
          this.$router.push({path: '/confirm-register'});
        })
        .catch((error) => {
            if( error.response ){
                alert(error.response.data.msg); 
            } else {
                alert('Ocorreu um erro inesperado. Tente novamente mais tarde'); 
            }
        });
      }
    },
    created(){ 
      if (this.$store.state.tipoUsuario != '') {
        sessionStorage.setItem("tipoUsuario", this.$store.state.tipoUsuario);
      }

      if (sessionStorage.getItem("tipoUsuario") == null) {
        this.$router.push({path: '/'});
      } else {
        this.$store.commit('updateTipoUsuario', sessionStorage.getItem("tipoUsuario"));
      }

      this.cadastro.roles = [];

      axios
        .get("http://192.168.15.200:8765/usuarios/roles/nome/" + this.$store.state.tipoUsuario)
        .then((res) => {
          this.cadastro.roles.push(res.data);
        })
        .catch((error) => {
            if( error.response ){
                alert(error.response.data.msg); 
            } else {
                alert('Ocorreu um erro inesperado. Tente novamente mais tarde'); 
            }
        });

          
    }
}
</script>