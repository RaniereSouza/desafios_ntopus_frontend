(function() {
  if (!tokens                                        ||
     (!tokens['brasil.io-token'])                    ||
     (typeof tokens['brasil.io-token'] !== 'string') ||
     (tokens['brasil.io-token'].trim() === '')      ) {
    
    console.log('Não foi encontrado um token para a API do Brasil.io');
    return;
  }

  console.log('Arquivo index.js rodando!');
})();
