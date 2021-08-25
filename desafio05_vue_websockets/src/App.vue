<template>
  <div @click="clickHidePopups">
    <header id="header">
      <h1>Seleção Ntopus - Desafio 05</h1>
      <h2>Vue.js e WebSockets</h2>
    </header>
    <main>
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
    },
    methods: {
      clickHidePopups(event: MouseEvent) {
        const target = event.target as HTMLElement,
              parent = target.parentElement;

        if (!target.classList.contains('animal-pin')     &&
           (!target.classList.contains('animal-popup'))  &&
           (!parent?.classList.contains('animal-pin'))   &&
           (!parent?.classList.contains('animal-popup'))) {
          
          document.querySelectorAll<HTMLElement>('.animal-pin .animal-popup.show').forEach(element => {
            element.classList.remove('show');
          });
        }
      }
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
