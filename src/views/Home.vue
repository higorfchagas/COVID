<template>
  <div
    class="backgroundImage"
    :style="{'background-image':'url(https://res.cloudinary.com/mco/image/upload/v1597958028/CovidAnalyzer/covidmascara_qozxqi.jpg)'}"
  >
    <div class="content">
      <div class="container">
        <div class="card textCard">
          <h3 class="card-header">COVID ANALYZER</h3>
          <div class="card-body">
            <p class="card-text">Evolução da doença sars-covid19 por países.</p>
          </div>
        </div>
        <br />
        <br />
        <div class="row">
          <div class="col-md-2"></div>
          <div class="col-md-8">
            País:
            <multiselect
              v-model="SelecaoPaises"
              v-if="Paises.lenght != 0"
              :options="Paises"
              label="Country"
              track-by="Country"
              placeholder="Selecione um país"
              v-on:input="getCasosPorPais(SelecaoPaises.Country)"
            ></multiselect>
          </div>
          <div class="col-md-2"></div>
        </div>
        <br />
        <br />
        <div class="row" v-if="SelecaoPaises">
          <div class="col-md-12">
            <table class="table table-default table-Light">
              <thead>
                <tr role="row">
                  <th>País</th>
                  <th>Casos</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="item in CasosPorPais"
                  v-bind:key="item.Country"
                  :v-if="CasosPorPais.lenght != 0"
                >
                  <td>{{ item.Country }}</td>
                  <td>{{ item.Cases }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Multiselect from "vue-multiselect";
import ServicesPaises from "@/services/paises";

export default {
  name: "Home",
  components: {
    Multiselect,
  },
  data() {
    return {
      SelecaoPaises: "",
      Paises: [],
      CasosPorPais: [],
    };
  },
  methods: {
    getPais: function () {
      var self = this;
      ServicesPaises.listarPaises()
        .then(function (response) {
          self.Paises = response.data;
        })
        .catch(function () {
          alert(
            "Não foi possível carregar os países, contate ao administrador do site."
          );
        });
    },
    getCasosPorPais: function (SelecaoPaises) {
      var self = this;
      ServicesPaises.listarCasosPorPais(SelecaoPaises)
        .then(function (response) {
          self.CasosPorPais = response.data;
        })
        .catch(function () {
          alert(
            "Não foi possível carregar os países, contate ao administrador do site."
          );
        });
    },
  },
  mounted() {
    this.getPais();
  },
};
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

<style scoped>
.backgroundImage {
  display: table;
  width: 100%;
  height: 100vh;
  padding: 100px 0;
  color: white;
  background-position: 30% 45%;
  background-size: cover;
  background-attachment: fixed;
  background-position: center;
}

.table {
  color: white;
  font-weight: bold;
}

.textCard {
  color: black;
}
</style>