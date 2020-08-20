<template>
  <div class="content">
    <div class="container">
      <div class="row">
        <div class="col-md-2"></div>
        <div class="col-md-8">
          País:
          <multiselect
            v-model="SelecaoPaises"
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
      <div class="row">
        <div class="col-md-12">
          <table
            class="table table-bordered table-hover dataTable no-footer"
            style="width: 100%;"
            role="grid">
            <thead>
              <tr role="row">
                <th>País</th>
                <th>Casos</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in CasosPorPais" v-bind:key="item.Country">
                <td>{{ item.Country }}</td>
                <td>{{ item.Cases }}</td>
              </tr>
            </tbody>
          </table>
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

