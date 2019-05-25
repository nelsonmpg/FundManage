<template>
  <div class="animated fadeIn">
    <b-card>
      <b-row>
        <b-col cols="12">
          <div class="embed-responsive embed-responsive-16by9 z-depth-1-half bg-gray-500">
            <iframe class="embed-responsive-item" :src="iframeSrc" allowfullscreen></iframe>
          </div>
        </b-col>
      </b-row>
    </b-card>
  </div>
</template>

<script>
export default {
  name: "Home",
  data: function() {
    return {
      iframeSrc:
        "https://financeira.jornaldenegocios.pt/informacaofinanceira/index.php?env=prod&section=indexList_rwd&UrlPageIndex=/informacao-financeira/mercado-ficha",
      iframeSrcChart:
        "https://xadvancedchart.webfg.com/chart.php?symbolId=PTING0200002_indices_51_df&symbolName=PSI+20&idChart=NPT-01&lang=pt&key=negociosptcaa3034eaa92bb81b81b041b681e9724"
    };
  },
  methods: {
    testeif() {
      console.log("teste", document.getElementById("myIframe"));
    },
    onLoad() {
      console.log("onLoad");
      console.log("load", document.getElementById("myIframe").height);
    },
    msgCB: function() {
      console.log("got ready");
    }
  }
};
</script>

<style>
.ajustIframe {
  min-width: 100%;
  width: 100%;
  border: none;
  height: 100%;
  margin: 0;
  padding: 0;
}
</style>
