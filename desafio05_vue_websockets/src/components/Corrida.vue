<template>
  <div id="corrida-container">
    <ul v-if="(start === true) && animalsList && (animalsList.length > 0)">
      <li
        v-for="(animal, index) in animalsList"
        :key="index"
      >
        <div 
          :title="animal.nome"
          :style="{
            marginLeft: `calc(${animal.distancia / 100} * (100vw - 2rem))`
          }"
          class="animal-pin"
        >
          <span class="animal-popup">{{animal.nome}}</span>
        </div>
      </li>
    </ul>
    <span v-else class="loading-spinner"></span>
    <VitoriaModal
      :open="winner ? true : false"
      :winnerName="winner ? winner.nome : '--'"
    />
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';

  import { TCorridaComponentData } from '../@types/TCorridaComponentData';
  import { TCorridaWSMessage }     from '../@types/TCorridaWSMessage';

  import VitoriaModal from './VitoriaModal.vue';

  export default defineComponent({
    name: 'Corrida',
    data() {
      const componentData: TCorridaComponentData = {
              start:       false,
              animalsList: [],
              winner:      undefined,
            };

      return componentData;
    },
    components: {
      VitoriaModal
    },
    mounted() {
      if (!WebSocket) {
        console.log('Este código necessita do objeto nativo WebSocket!');
        return;
      }

      const connection  = new WebSocket('ws://localhost:8081/');
      this.wsConnection = connection;

      connection.onopen = ((event: Event) => {
        console.log('Conexão com WebSocket iniciada: ', event);
      });
      connection.onmessage = ((event: MessageEvent) => {
        if (!this.winner) {
          const dataJSON: TCorridaWSMessage = JSON.parse(event.data);

          if (dataJSON) {
            const [messageType, messageContent] = dataJSON;

            if ((messageType === 'largada')    &&
               (Array.isArray(messageContent))) {

              this.start       = true;
              this.animalsList = messageContent;
              console.log('Iniciando corrida! ', messageContent.map(el => el.nome));
            }
            else if ((messageType === 'update')     &&
                    (Array.isArray(messageContent))) {
              
              if (this.start === true) {
                this.animalsList = messageContent;
              }
            }
            else if ((messageType === 'vitoria')     &&
                    (!Array.isArray(messageContent))) {
              
              if (this.start === true) {
                this.winner = messageContent;
                console.log('Fim da corrida! Vencedor: ', messageContent.nome);
                connection.close();
              }
            }
            else {
              console.log('O back-end enviou uma mensagem não prevista! ', event);
            }
          }
        }
      });
      connection.onerror = ((event: Event) => {
        console.log('Erro na conexão com WebSocket! ', event);
      });
    },
    unmounted() {
      this.wsConnection && this.wsConnection.close();
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
