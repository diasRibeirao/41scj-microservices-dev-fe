<template>
  <div class="vue-template">  
    <Header titulo="Esqueci a senha" retorno="/login" />

    <div class="container container-init pt-3 px-5">
      <h3>{{tipoUsuario()}}</h3>
      <form>
          <div class="form-group">
              <label>Celular (DD + Número)</label>
              <input type="text" id="telefone" name="telefone" v-model="esqueci.telefone" class="form-control" required />
          </div>
           
          <div class="text-center pt-4">
            <div class="d-grid gap-2">
              <button type="button" @click.prevent="enviar" class="btn btn-dark btn-lg btn-w">Enviar</button>
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
          esqueci: {
            telefone: ''
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
      enviar() {
        /*axios
        .post("http://192.168.15.200:8765/usuarios/esqueceu-senha", this.esqueci)
        .then((res) => {
          console.log(res.data);
          sessionStorage.setItem("usuario", JSON.stringify(res.data));
          this.$store.commit('updateUsuario', JSON.parse(sessionStorage.getItem("usuario")));
          this.$router.push({path: '/confirm-forgot-password'});
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
      dadosUsuario(url) { // depois apagar este, deixar só com a responsa de quando consome "esqueceu senha"
        axios
        .get(url)
        .then((res) => {console.log(res.data)
          sessionStorage.setItem("usuario", JSON.stringify(res.data));
          this.$store.commit('updateUsuario', JSON.parse(sessionStorage.getItem("usuario")));
          this.$router.push({path: '/confirm-forgot-password'});
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
}
</script>