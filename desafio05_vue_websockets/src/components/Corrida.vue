<template>
  <div id="corrida-container">
    <ul v-if="animalsList && (animalsList.length > 0)">
      <li v-for="(animal, index) in animalsList" v-bind:key="index">
        <div v-bind:title="animal.nome" class="animal-pin">
          <span class="animal-popup">{{animal.nome}}</span>
        </div>
      </li>
    </ul>
    <span v-else class="loading-spinner"></span>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';

  import { TAnimal } from '../@types/TAnimal';

  export default defineComponent({
    name: 'Corrida',
    data() {
      return {
        animalsList: [] as TAnimal[],
      };
    },
    mounted() {
      if (this.animalsList && Array.isArray(this.animalsList)) {
        const timeoutRef = setTimeout(() => {
          this.animalsList.push(
            {nome: "Cavalo",  distancia: 0},
            {nome: "Jaguar",  distancia: 0},
            {nome: "Canguru", distancia: 0},
            {nome: "Lobo",    distancia: 0},
          );

          clearTimeout(timeoutRef);
        }, 3000);
      }
    },
  });
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #corrida-container {
    display:         flex;
    align-items:     center;
    justify-content: center;
    width:           100%;
  }

  ul {
    list-style-type:  none;
    width:            100%;
    padding:          0;
    background-color: #333;
  }

  li {
    display:     flex;
    align-items: center;
    width:       100%;
    height:      3rem;
    color:       #fff;
    text-align:  left;
  }

    li + li {
      border-top: 1px dashed #fff;
    }

    li .animal-pin {
      position:         relative;
      width:            2rem;
      height:           2rem;
      border-radius:    50%;
      overflow:         hidden;
      background-color: aqua;
    }

      li .animal-pin > .animal-popup {
        position: absolute;
        opacity:  0;
      }

    @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  .loading-spinner {
    position:         relative;
    display:          block;
    width:            2rem;
    height:           2rem;
    border-radius:    50%;
    background-color: #fff;
    background-clip:  padding-box;
    border:           0.25rem solid transparent;
  }

    .loading-spinner::before {
      position:                  absolute;
      z-index:                   -1;
      top:                       -0.25rem;
      right:                     -0.25rem;
      width:                     2rem;
      height:                    2rem;
      border-radius:             inherit;
      content:                   '';
      background-image:          linear-gradient(to top right, #888, #ddd, #fff);
      animation-name:            spin;
      animation-duration:        500ms;
      animation-iteration-count: infinite;
      animation-timing-function: linear;
    }
</style>
