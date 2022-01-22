<template>
    <nav class="navbar navbar-expand-md navbar-dark bg-dark">
        <div class="container">
            <div class="navbar-brand float-left" v-if="podeVoltar()">
                <router-link @click.native="voltar" to="/voltar">
                    <span class="bi bi-arrow-left"></span>
                </router-link>
            </div>
            <div class="mx-auto order-0">
                <h2>{{titulo}}</h2>
            </div>
        </div>
    </nav>

    
</template>

<script>
import 'bootstrap-icons/font/bootstrap-icons.css'

export default {
  name: 'Header',
  props: {
    titulo: String,
    retorno: {
        type: String,
        default: ''
    }
  },
  methods: {
    podeVoltar() {
        return this.$props.retorno !== '';
    },
    voltar() {
        this.$router.push({
            path: this.$props.retorno
        });
    }
  }
}
</script>

<style scoped>
h2 {
  font-weight: 500;
  color: #fff;
}

a {
    color: #fff;
}
</style>