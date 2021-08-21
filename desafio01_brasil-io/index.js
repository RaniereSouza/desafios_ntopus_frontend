(function() {
  if (!tokens                                        ||
     (!tokens['brasil.io-token'])                    ||
     (typeof tokens['brasil.io-token'] !== 'string') ||
     (tokens['brasil.io-token'].trim() === ''))       {
    
    console.log('Não foi encontrado um token para a API do Brasil.io');
    return;
  }
  if (!XMLHttpRequest) {
    console.log('Este browser não suporta o XMLHttpRequest');
    return;
  }
  if (!JSON) {
    console.log('Este browser não tem acesso ao objeto global JSON');
    return;
  }

  function addLoadingSpinner() {
    const spinner = document.getElementById('loading-spinner');

    if (!spinner) {
      const newSpinner = document.createElement('span');

      newSpinner.setAttribute('id', 'loading-spinner');
      document.body.appendChild(newSpinner);
    }
  }
  function removeLoadingSpinner() {
    const spinner = document.getElementById('loading-spinner');

    if (spinner) {
      spinner.parentNode.removeChild(spinner);
    }
  }

  /*==============================================================
    Esta versão está incorreta por vários motivos... A idéia era
    iterar recursivamente os dados da API, sempre continuando a
    fazer novas requisições enquanto ainda tivessem dados para
    serem buscados (campo "next" na resposta da requisição). O
    problema é que atingimos um limite permitido pelo servidor da
    API, ele só nos deixa fazer uma quantidade arbitrária de
    requisições antes de sermos respondidos com um erro 429 - Too
    Many Requests (com um bloqueio de CORS pelo servidor). O que é
    normal, já que a API deles passou por problemas de abuso de
    consumo de dados por usuários da API.
    Mesmo forçando um intervalo de 2 segundos entre uma requisição
    e outra, as requisições são interrompidas com entre 5 a 20
    requisições consecutivas. Lembrando que no ambiente usado até
    aqui, não há nenhum tipo de servidor local, o arquivo
    index.html é aberto pelo browser "as is", sem acessar o
    localhost ou algo do tipo: Como vinha sendo desenvolvido até
    agora, na intenção de fazer tudo na forma mais "pura"
    possível, não foi usado nada de Node.js, nginx, XAMPP, IIS, ou
    outro tipo de servidor local, e também não foi utilizado
    nenhum pacote auxiliar. 
  ==============================================================*/

  const apiRequest           = new XMLHttpRequest(),
        baseUrl              = 'https://api.brasil.io/v1',
        wantedTimeRangeRegex = /^(2018-01-)+([\d]{2})+$/;
  
  let info1Val = 0;

  function makeRequestToAPI(url) {
    const timeoutRef = setTimeout(() => {
      apiRequest.open('GET', url, true);
      apiRequest.overrideMimeType('application/json');
      apiRequest.setRequestHeader('Authorization', `Token ${tokens["brasil.io-token"]}`);
      apiRequest.send(null);
      clearTimeout(timeoutRef);
    }, 2000);
  }

  apiRequest.onreadystatechange = function() {
    if (apiRequest.readyState === 4) {
      if (apiRequest.status === 200) {
        const responseJSON = JSON.parse(apiRequest.response);
        console.log('apiRequest.response: ', responseJSON);

        if (responseJSON) {
          if (responseJSON.results                 &&
             (Array.isArray(responseJSON.results))) {
            
            info1Val = responseJSON.results.reduce((acc, item) => {
              if (item && item.data_de_publicacao                        &&
                 (typeof item.data_de_publicacao === 'string')           &&
                 (wantedTimeRangeRegex.test(item.data_de_publicacao))    &&
                 (item.total_de_rendimentos)                             &&
                 (typeof Number(item.total_de_rendimentos) === 'number')) {

                return (acc + Number(item.total_de_rendimentos));
              } 
            }, info1Val);
          }

          if (!responseJSON.next                      ||
             (typeof responseJSON.next !== 'string')  ||
             (responseJSON.next.trim() === ''))        {
            
            removeLoadingSpinner();
            
            console.log('info1Val: ', info1Val);
            // preencher os elementos DOM com os valores calculados
          }
          else {
            // continuar fazendo requisições para a API para calcular os valores finais
            makeRequestToAPI(responseJSON.next);
          }
        }
      }
      else if (apiRequest.status >= 400) {
        console.log('Erro na requisição HTTP: ', `${apiRequest.status} ${apiRequest.statusText}`);
      }
    }
  }

  addLoadingSpinner();
  makeRequestToAPI(`${baseUrl}/dataset/salarios-magistrados/contracheque/data/`);
})();
