 <template>
  <div class="wrap">  
    <div class="app-container">
       <Header titulo="Criar conta" retorno="/login" />

      <div class="container pt-3 px-5">
          <h3>{{tipoUsuario()}}</h3>
            <div class="form-group text-center pt-2">
              <validation-observer ref="formValidator" v-slot="{ handleSubmit }">
                <b-form @submit.stop.prevent="handleSubmit(onSubmit)">

                  <validation-provider
                      name="nome"
                      :rules="{ required: true, min: 3, max: 120 }"
                      v-slot="validationContext">

                      <b-form-group id="nome-input-group" label="Nome" label-for="nome-input">
                          <b-form-input
                          id="nome-input"
                          name="nome-input"
                          v-model="form.nome"
                          :state="getValidationState(validationContext)"
                          aria-describedby="input-nome-feedback"
                          ></b-form-input>

                          <b-form-invalid-feedback id="input-nome-feedback">{{ validationContext.errors[0] }}</b-form-invalid-feedback>
                      </b-form-group>
                  </validation-provider>

                  <validation-provider
                      name="sobrenome"
                      :rules="{ required: true, min: 3, max: 120 }"
                      v-slot="validationContext">

                      <b-form-group id="sobrenome-input-group" label="Sobrenome" label-for="sobrenome-input">
                          <b-form-input
                          id="sobrenome-input"
                          name="sobrenome-input"
                          v-model="form.sobrenome"
                          :state="getValidationState(validationContext)"
                          aria-describedby="input-sobrenome-feedback"
                          ></b-form-input>

                          <b-form-invalid-feedback id="input-sobrenome-feedback">{{ validationContext.errors[0] }}</b-form-invalid-feedback>
                      </b-form-group>
                  </validation-provider>

                  <validation-provider
                      name="e-mail"
                      :rules="{ required: true,  max: 220 }"
                      vid="email"
                      v-slot="validationContext">

                      <b-form-group id="email-input-group" label="E-mail" label-for="email-input">
                          <b-form-input
                          id="email-input"
                          name="email-input"
                          v-model="form.email"
                          :state="getValidationState(validationContext)"
                          aria-describedby="input-email-feedback"
                          ></b-form-input>

                          <b-form-invalid-feedback id="input-email-feedback">{{ validationContext.errors[0] }}</b-form-invalid-feedback>
                      </b-form-group>
                  </validation-provider>

                  <validation-provider
                      name="celular"
                      :rules="{ required: true, min: 10, max: 11 }"
                      vid="telefone"
                      v-slot="validationContext">

                      <b-form-group id="telefone-input-group" label="Celular" label-for="telefone-input">
                          <b-form-input
                          id="telefone-input"
                          name="telefone-input"
                          v-model="form.telefone"
                          :state="getValidationState(validationContext)"
                          aria-describedby="input-telefone-feedback"
                          ></b-form-input>

                          <b-form-invalid-feedback id="input-telefone-feedback">{{ validationContext.errors[0] }}</b-form-invalid-feedback>
                      </b-form-group>
                  </validation-provider>

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
                      vid="confirmarSenha"
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
 
        api.post("/usuarios", this.form)
          .then((response) => {
            this.$store.dispatch("SET_USUARIO", response.data);       
            this.$router.push({path: '/confirm-register'});
          })
          .catch((error) => {
              let msg = 'Ocorreu um erro inesperado. Tente novamente mais tarde';
              if(error.response){
                  msg = error.response.data.msg;
              }

              if (Array.isArray(error.response.data.errors) && error.response.data.errors.length) {
                error.response.data.errors.map((obj) => {
                  this.setErrors(obj.fieldName, obj.message);
                });
              }
              this.$fire({
                  text: msg,
                  type: "error",
              }).then(() => this.$loading(false));
          });
          
      },
      setErrors(_name, message) {
        switch (_name) {
          case 'nome':
            this.$refs.formValidator.setErrors({nome : [message]});
            break;
          case 'sobrenome':
            this.$refs.formValidator.setErrors({sobrenome : [message]});
            break;
          case 'email':
            this.$refs.formValidator.setErrors({email : [message]});
            break;
          case 'telefone':
            this.$refs.formValidator.setErrors({telefone : [message]});
            break;
          case 'senha':
            this.$refs.formValidator.setErrors({senha : [message]});
            break;
          case 'confirmarSenha':
            this.$refs.formValidator.setErrors({confirmarSenha : [message]});
            break;
          default:
            console.log(`Atributo não reconhecido: ${_name}.`);
        }
      }
    },
    created(){       
       this.$store.dispatch("SET_ROLE", window.localStorage.role);

       this.form.roles = [];

        api.get("usuarios/roles/nome/" + this.role)
          .then((response) => {
            this.form.roles.push(response.data);
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