<template>
  <div
    class="backgroundImage"
    :style="{'background-image':'url(https://res.cloudinary.com/mco/image/upload/v1597958028/CovidAnalyzer/covidmascara_qozxqi.jpg)'}"
  >
    <div class="content">
      <div class="container">
        <div class="mt-3" v-if="!StatusApi">
          <b-card-group deck>
            <b-card bg-variant="danger" text-variant="white" header="Status" class="text-center">
              <b-card-text>A fonte de dados foi inativada, contate ao administrador do site.</b-card-text>
            </b-card>
          </b-card-group>
        </div>
        <br />
        <div v-if="StatusApi"></div>
        <div class="card textCard">
          <h3 class="card-header">COVID ANALYZER</h3>
          <div class="card-body">
            <p>COVID-19 (do inglês Coronavirus Disease 2019) é uma doença infeciosa causada pelo coronavírus da síndrome respiratória aguda grave 2 (SARS-CoV-2). Os sintomas mais comuns são febre, tosse seca e cansaço. Entre outros sintomas menos comuns estão dores musculares, dor de garganta, dor de cabeça, congestão nasal, conjuntivite, perda do olfato e do paladar e erupções cutâneas. Cerca de 80% dos casos confirmados são ligeiros ou assintomáticos e a maioria recupera sem sequelas. No entanto, 15% são infeções graves que necessitam de oxigénio e 5% são infeções muito graves que necessitam de ventilação assistida em ambiente hospitalar. Os casos mais graves podem evoluir para pneumonia grave com insuficiência respiratória grave, septicémia, falência de vários órgãos e morte. Entre os sinais de agravamento da doença estão a falta de ar, dor ou pressão no peito, dedos de tom azul ou perturbações na fala e no movimento. O agravamento pode ser súbito, ocorre geralmente durante a segunda semana e requer atenção médica urgente.</p>
          </div>
        </div>
        <br />
        <div class="row">
          <div class="col-md-3"></div>
          <div class="col-md-6">
            País:
            <multiselect
              v-model="PaisSelecionado"
              :options="Paises"
              label="country"
              track-by="country"
              placeholder="Selecione um país"
              :searchable="true"
              :disabled="StatusApi == false && !Paises"
            ></multiselect>
          </div>
          <div class="col-md-3"></div>
        </div>
        <br />
        <br />
        <div class="row textCard" v-if="PaisSelecionado != ''">
          <div class="col-md-3">
            <b-card-group deck>
              <b-card bg-variant="light" header="País" class="textHeader text-center">
                <b-card-text class="textCard">{{ PaisSelecionado.country }}</b-card-text>
              </b-card>
            </b-card-group>
          </div>
          <div class="col-md-3">
            <b-card-group deck>
              <b-card bg-variant="light" header="Confirmados" class="textHeader text-center">
                <b-card-text class="textCard">{{ PaisSelecionado.confirmed }}</b-card-text>
              </b-card>
            </b-card-group>
          </div>
          <div class="col-md-3">
            <b-card-group deck>
              <b-card bg-variant="light" header="Recuperados" class="textHeader text-center">
                <b-card-text class="textCard">{{ PaisSelecionado.recovered }}</b-card-text>
              </b-card>
            </b-card-group>
          </div>
          <div class="col-md-3">
            <b-card-group deck>
              <b-card bg-variant="light" header="Mortes" class="textHeader text-center">
                <b-card-text class="textCard">{{ PaisSelecionado.deaths }}</b-card-text>
              </b-card>
            </b-card-group>
          </div>
        </div>
        <div>
          <Adsense
            data-ad-client="ca-pub-2133011227802837"
            data-ad-slot="1234567890"
            data-ad-format="auto"
            :data-full-width-responsive="true"
          ></Adsense>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Multiselect from "vue-multiselect";
import ServicesPaises from "@/services/paises";
import Ads from "vue-google-adsense";
import Vue from "vue";
import { CardPlugin } from 'bootstrap-vue'
Vue.use(CardPlugin)
Vue.use(require("vue-script2"));
Vue.use(Ads.Adsense);

export default {
  name: "Home",
  components: {
    Multiselect,
  },
  data() {
    return {
      PaisSelecionado: [],
      Paises: [],
      StatusApi: false,
    };
  },
  methods: {
    getPais: function () {
      var self = this;
      ServicesPaises.listarPaises()
        .then(function (response) {
          self.Paises = response.data.data;
        })
        .catch(function () {
          alert(
            "Não foi possível carregar os países, contate ao administrador do site."
          );
        });
    },
    checkApi: function () {
      var self = this;
      ServicesPaises.verificarStatusApi()
        .then(function (response) {
          if (response.data.status == "ok") {
            self.StatusApi = true;
            self.getPais();
          } else {
            self.StatusApi = false;
          }
        })
        .catch(function () {
          alert(
            "Não foi possível carregar os países, contate ao administrador do site."
          );
        });
    },
  },
  mounted() {
    this.checkApi();
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
  font-weight: normal;
}

.textHeader {
  font-weight: bold;
}
</style>