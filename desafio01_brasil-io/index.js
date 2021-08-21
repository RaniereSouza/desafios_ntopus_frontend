(function() {
  if (!tokens                                        ||
     (!tokens['brasil.io-token'])                    ||
     (typeof tokens['brasil.io-token'] !== 'string') ||
     (tokens['brasil.io-token'].trim() === '')      ) {
    
    console.log('Não foi encontrado um token para a API do Brasil.io');
    return;
  }
  if (!XMLHttpRequest) {
    console.log('Este browser não suporta o XMLHttpRequest');
    return;
  }

  const apiRequest = new XMLHttpRequest(),
        baseUrl    = 'https://api.brasil.io/v1';

  apiRequest.onreadystatechange = function() {
    if (apiRequest.readyState === 4) {
      if (apiRequest.status === 200) {
        const response = apiRequest.response;
        console.log('apiRequest.response: ', response);
      }
      else if (apiRequest.status >= 400) {
        console.log('Erro na requisição HTTP: ', `${apiRequest.status} ${apiRequest.statusText}`);
      }
    }
  }
  apiRequest.open('GET', `${baseUrl}/`, true);
  apiRequest.overrideMimeType('application/json');
  apiRequest.setRequestHeader('Authorization', `Token ${tokens["brasil.io-token"]}`);
  apiRequest.send(null);
})();
