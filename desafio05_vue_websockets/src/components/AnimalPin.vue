<template>
  <div 
    :title="animal.nome"
    :style="{
      marginLeft: `calc(${animal.distancia / 100} * (100vw - 2rem))`
    }"
    @click="clickShowPopup"
    class="animal-pin"
  >
    <span
      :style="{
        right: (animal.distancia >= 50) ? '1rem' : 'auto',
        left:  (animal.distancia < 50)  ? '1rem' : 'auto',
      }"
      class="animal-popup"
    >
      <strong>{{animal.nome}}</strong>, {{animal.distancia}}m
    </span>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';

  // import { TAnimal } from '../@types/TAnimal';

  export default defineComponent({
    name: 'AnimalPin',
    props: {
      animal: {
        type:     Object,
        required: true,
      },
    },
    methods: {
      clickShowPopup(event: MouseEvent) {
        const target = event.target as HTMLElement;
        
        if (!target.querySelector('.animal-popup.show')) {
          target.querySelector('.animal-popup')?.classList.add('show');
        }
      },
    }
  });
</script>

<style scoped>
  .animal-pin {
    position:         relative;
    width:            2rem;
    height:           2rem;
    border-radius:    50%;
    background-color: aqua;
    text-align:       right;
    transition:       margin 0.25s;
  }

    .animal-pin > .animal-popup {
      position:         absolute;
      top:              -1.75rem;
      opacity:          0;
      border:           1px solid #ddd;
      border-radius:    0.25rem;
      padding:          0.25rem 0.5rem;
      background-color: #fff;
      color:            #2c3e50;
      white-space:      nowrap;
      transition:       all 0.375s;
    }

      .animal-pin > .animal-popup.show {
        opacity: 1;
      }
</style>

