# Desafio 04: BDD com Cypress

## Enunciado
> Vue é o framework para todas as nossas aplicações web. Nesse desafio você deve escrever uma aplicação simples usando Vue e TS. Você tem liberdade para enriquecer a especificação caso queira demonstrar habilidade, mas cada feature deve ser implementada de forma simples e inteligível. Trata-se do front de um serviço de corrida de animais. O backend emitirá mensagens via WebSocket para atualização do front. As mensagens chegarão no formato `[<nome-evento>, <payload>]`, onde `<nome-evento>` é uma string e `<payload>` é uma estrutura de dados ou um valor JS qualquer. O backend emite os seguintes eventos:
> * `"largada"`, onde o payload é uma lista de `TAnimal` ao iniciar a corrida (onde todas as distâncias serão `0`).
> * `"update"`, onde o payload é uma lista de `TAnimal`.
> * `"vitoria"`, onde o payload é um `TAnimal` com a distância igual a `100`. (`TAnimal = { nome: string; distancia: number }`)
>
> Você deve:
> * Criar um display que represente a pista, onde os animais se deslocarão horizontalmente, cada um em uma linha, uma sobre a outra.
> * Criar um marcador para cada animal que terá sua posição atualizada a cada mensagem do WebSocket.
> * Ao clicar num animal um balão deve se abrir com o seu nome e posição. O balão deve acompanhar o animal e deve ser fechado ao clicar fora do animal e seu balão.
> * Quando chegar a mensagem `"vitoria"`, um modal deve se abrir com o título "Vitória" e o nome do animal.
> * Estilização. Você não será avaliad[ao] pela beleza da página, apenas pela desenvoltura com o CSS. Em especial gostaria de ver algo reagindo ao mouse e elementos irmãos com formatações diferenciadas de acordo com seu índice relativo ao elemento pai.
>
> Para ajudar no desenvolvimento desta aplicação publicamos uma imagem docker em https://hub.docker.com/r/ntopuslabs/desafio-back-corrida que provê um serviço WebSocket compatível com essa especificação.
