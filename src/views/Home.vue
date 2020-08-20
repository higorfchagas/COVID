<template>
    <div class="content">
      <div class="container">
       <div class="row">
         <div class="col-md-2">

         </div>
         <div class="col-md-8">
                 País:
              <multiselect v-model="SelecaoPaises" :options="Paises" placeholder="Selecione um país"></multiselect>
         </div>
         <div class="col-md-2">
           
         </div>
       </div>
      </div>
    </div>
</template>

<script>
  import Multiselect from 'vue-multiselect'
  import { http } from '@/services/config'

export default {
  name: 'Home',
  components: {
    Multiselect 
  },
   data () {
      return {
        SelecaoPaises: '',
         Paises:[],
      }
},
methods: {
    getPais: function () {
      var self = this;
      const axios = require('axios');
      axios.get('https://api.covid19api.com/countries')
          .then(function (response) {
          self.Paises = response.data;
          })
          .catch(function () {
          console.log('Não foi possível carregar os países, contate ao administrador do site.');
          })
    },
    listarPaises:() => {
      var self = this;
        return http.get('countries')
        .then(function (response) {
          self.Paises = response.data;
          })
          .catch(function () {
          alert('Não foi possível carregar os países, contate ao administrador do site.');
          })
    },
  },
mounted(){
this.getPais();
},
}
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
