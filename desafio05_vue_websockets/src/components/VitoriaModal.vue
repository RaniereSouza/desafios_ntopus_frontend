<template>
  <div v-if="open && !triggeredClose" class="modal-overlay">
    <div class="modal-content">
      <span 
        @click="closeModal"
        class="close-btn"
      >
        &times;
      </span>
      <h2>Vitória</h2>
      <p>Vencedor: <strong>{{winnerName}}</strong></p>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';

  export default defineComponent({
    name: 'VitoriaModal',
    props: {
      open: {
        type:    Boolean,
        default: false,
      },
      winnerName: String,
    },
    data() {
      return {
        triggeredClose: false,
      };
    },
    methods: {
      closeModal() {
        this.triggeredClose = true;
      },
    },
  });
</script>

<style scoped>
  .modal-overlay {
    display:          flex;
    align-items:      center;
    justify-content:  center;
    position:         absolute;
    z-index:          2;
    left:             0;
    top:              -90px;
    width:            100vw;
    height:           100vh;
    background-color: rgba(0, 0, 0, 0.5);
  }

  .modal-content {
    position:         relative;
    display:          flex;
    flex-wrap:        wrap;
    width:            50%;
    min-height:       10rem;
    padding:          0.5rem 1rem;
    background-color: #fff;
  }

    .modal-content h2,
    .modal-content p {
      align-self: flex-start;
    }

    .modal-content h2 {
      width:         calc(100% + 2rem);
      margin:        0 -1rem 0 -1rem;
      border-bottom: 1px solid #ddd;
      font-size:     2rem;
    }

    .modal-content p {
      width:     100%;
      font-size: 1.5rem;
    }

    .modal-content .close-btn {
      position:        absolute;
      right:           0;
      top:             0;
      display:         flex;
      align-items:     center;
      justify-content: center;
      width:           2rem;
      height:          2rem;
      font-size:       2rem;
      cursor:          pointer;
      transition:      all 0.375s;
    }

      .modal-content .close-btn:hover {
        background-color: crimson;
        color:            #fff;
      }
</style>
