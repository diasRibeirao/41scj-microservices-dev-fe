<template>
  <div class="vue-template">  
    <Header titulo="Redefinir senha" retorno="/confirm-forgot-password" />

    <div class="container container-init pt-3 px-5">
      <h3>{{tipoUsuario()}}</h3>
      
      <form>
          <div class="form-group">
              <label>Senha</label>
              <input type="text" id="senha" name="senha" v-model="redefinir.senha" class="form-control" required />
          </div>

          <div class="form-group">
              <label>Confirmar Senha</label>
              <input type="text" id="confirmarSenha" name="confirmarSenha" v-model="redefinir.confirmarSenha" class="form-control" required />
          </div>  
           
          <div class="text-center pt-4">
            <div class="d-grid gap-2">
              <button type="button" @click.prevent="salvar" class="btn btn-dark btn-lg btn-w">SALVAR</button>
              <button type="button" @click.prevent="pular" class="btn btn-outline-secondary btn-lg btn-w">PULAR</button>
            </div>
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
          redefinir: {
            senha: '',
            confirmarSenha: ''
          }
        }
    },
    components: {
        Header 
    },
    methods: {     
      tipoUsuario() {
        if (sessionStorage.getItem("tipoUsuario") == 'ROLE_PARCEIROS') {
            return 'PARCEIROS'
        } else if (sessionStorage.getItem("tipoUsuario") == 'ROLE_PAIS_RESPONSAVEIS') {
            return 'PAIS OU RESPONSÁVEL'
        } else {
            this.$router.push({path: '/'});
        }
      },
      salvar() {
       /* axios
        .post("http://192.168.15.200:8765/usuarios/ativar", this.confirmar)
        .then((res) => {
          console.log(res.data);
          sessionStorage.setItem("usuario", JSON.stringify(res.data));
          this.$store.commit('updateUsuario', JSON.parse(sessionStorage.getItem("usuario")));
          this.$router.push({path: '/redefine-password'});
          alert('Conta ativada com sucesso')
        })
        .catch((error) => {
            console.log(error.response.data)
            if( error.response ){
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
          this.$router.push({path: '/redefine-password'});
        })
        .catch((error) => {
            if( error.response ){
                alert(error.response.data.msg); 
            } else {
                alert('Ocorreu um erro inesperado. Tente novamente mais tarde'); 
            }
        });
      },
      pular() {
        this.$router.push({path: '/home'});
      }
    },
    created(){ 
     console.log(JSON.stringify(this.$store.state.usuario))
      if (this.$store.state.usuario != '') {
        sessionStorage.setItem("usuario", JSON.stringify(this.$store.state.usuario));
      }

      if (sessionStorage.getItem("usuario") == null) {
        this.$router.push({path: '/'});
      } else {
        this.$store.commit('updateUsuario', JSON.parse(sessionStorage.getItem("usuario")));
      }
      this.confirmar.telefone = this.$store.state.usuario.telefone;
    }
}
</script>