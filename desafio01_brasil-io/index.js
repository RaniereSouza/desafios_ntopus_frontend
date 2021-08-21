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

  const apiRequest = new XMLHttpRequest(),
        baseUrl    = 'https://api.brasil.io/v1';

  apiRequest.onreadystatechange = function() {
    if (apiRequest.readyState === 4) {
      removeLoadingSpinner();

      if (apiRequest.status === 200) {
        const responseJSON = JSON.parse(apiRequest.response);
        console.log('apiRequest.response: ', responseJSON);
      }
      else if (apiRequest.status >= 400) {
        console.log('Erro na requisição HTTP: ', `${apiRequest.status} ${apiRequest.statusText}`);
      }
    }
  }

  addLoadingSpinner();
  apiRequest.open('GET', `${baseUrl}/dataset/salarios-magistrados/contracheque/data/`, true);
  apiRequest.overrideMimeType('application/json');
  apiRequest.setRequestHeader('Authorization', `Token ${tokens["brasil.io-token"]}`);
  apiRequest.send(null);
})();
