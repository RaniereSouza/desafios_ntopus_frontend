<template>
  <div id="corrida-container">
    <ul>
      <li v-for="(animal, index) in animalsList" v-bind:key="index">
        <div v-bind:title="animal.nome" class="animal-pin">
          <span class="animal-popup">{{animal.nome}}</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';

  import { TAnimal } from '../@types/TAnimal';

  export default defineComponent({
    name: 'Corrida',
    data() {
      return {
        animalsList: [
          {nome: "Cavalo",  distancia: 0},
          {nome: "Jaguar",  distancia: 0},
          {nome: "Canguru", distancia: 0},
          {nome: "Lobo",    distancia: 0},
        ] as TAnimal[],
      };
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
</style>
