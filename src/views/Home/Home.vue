<template>
  <div class="vue-template">  
    <Header titulo="VanCerta" />

    <div class="container container-init pt-3 px-5">
        <h3>{{nomeCompleto()}}</h3>


    </div>
  </div>
</template>

<script>
import Header from '@/components/Header/Header.vue'

export default {
    data() {
        return {
          confirmar: {
            telefone: '',
            codigo: '',
            idNotificacao: 2
          }
        }
    },
    components: {
        Header 
    },
    methods: {     
      nomeCompleto() {
        console.log(this.$store.state.usuario)
        return this.$store.state.usuario.nome + ' ' + this.$store.state.usuario.sobrenome;
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