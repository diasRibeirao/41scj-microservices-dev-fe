<template>
  <div class="vue-template">  
    <Header titulo="Confirmar conta" retorno="/register" />

    <div class="container container-init pt-3 px-5">
      <h3>{{tipoUsuario()}}</h3>
      <p>
        Por favor, informe o código de 4 digitos enviado para número de celular {{confirmar.telefone}}
      </p>
      <form>
          <div class="form-group">
              <label>Código</label>
              <input type="text" id="codigo" name="codigo" v-model="confirmar.codigo" class="form-control" required />
          </div>
           
          <div class="text-center pt-4">
            <div class="d-grid gap-2">
              <button type="button" @click.prevent="ativar" class="btn btn-dark btn-lg btn-w">CONFIRMAR</button>
              <button type="button" @click.prevent="reenviar" class="btn btn-outline-secondary btn-lg btn-w">REENVIAR CÓDIGO</button>
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
          confirmar: {
            telefone: '',
            codigo: '',
            idNotificacao: 1
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
      ativar() {
        /*axios
        .post("http://192.168.15.200:8765/usuarios/ativar", this.confirmar)
        .then((res) => {
          console.log(res.data);
          alert('Conta ativada com sucesso')
        })
        .catch((error) => {
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
          this.$router.push({path: '/home'});
        })
        .catch((error) => {
            if( error.response ){
                alert(error.response.data.msg); 
            } else {
                alert('Ocorreu um erro inesperado. Tente novamente mais tarde'); 
            }
        });
      },
      reenviar() {
        axios
        .post("http://192.168.15.200:8765/usuarios/reenviar-codigo/" + this.$store.state.usuario.id)
        .then((res) => {
          console.log(res.data);
          alert('Código reenviado com sucesso')
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