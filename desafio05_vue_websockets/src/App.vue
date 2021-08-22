<template>
  <div>
    <header id="header">
      <h1>Seleção Ntopus - Desafio 05</h1>
      <h2>Vue.js e WebSockets</h2>
    </header>
    <main>
      <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
      <Corrida />
    </main>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';

  import Corrida from './components/Corrida.vue';

  export default defineComponent({
    name: 'App',
    components: {
      Corrida
    }
  });
</script>

<style>
  * {
    margin:      0;
    padding:     0;
    box-sizing:  border-box;
    font-family: Avenir, Helvetica, Arial, sans-serif;
  }

  #app {
    -webkit-font-smoothing:  antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align:              center;
    color:                   #2c3e50;
  }

    #app #header {
      display:         flex;
      flex-direction:  column;
      justify-content: center;
      width:           100%;
      height:          90px;
      border-bottom:   1px solid #ddd;
      padding:         0.5rem 1rem;
      text-align:      left;
    }

    #app main {
      position:        relative;
      display:         flex;
      flex-direction:  row;
      justify-content: center;
      width:           100vw;
      height:          calc(100vh - 90px);
    }
</style>
