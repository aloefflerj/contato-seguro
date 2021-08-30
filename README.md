# Desafio | Backend

O teste consiste em implementar uma lista de contatos. O projeto, de preferência, deve ser separado em backend e frontend.

As regras dos campos sendo utilizados são as seguintes:
- Nome: obrigatório para preenchimento
- E-mail: obrigatório para preenchimento
- Telefone: não obrigatório
- Data de nascimento: não obrigatório
- Cidade onde nasceu: não obrigatório

O backend deve conter uma API Rest.

O frontend deve usar os dados fornecidos pela API.

Você **pode** e, de preferência, **deve** utilizar bibliotecas de terceiros, usando ou não um framework.

Aqui na Contato Seguro utilizamos Docker nos nossos ambientes, então será muito bem visto caso decida utilizar. Principalmente para que tenhamos o mesmo resultado (mesma configuração de ambiente). Caso desenvolva com docker, nos envie junto com o projeto o `docker-compose.yml` e/ou os `Dockerfile`s.

Você deve utilizar um banco de dados. Pedimos para que nos sinalize com suas opções no espaço final deste documento.

## Requisitos mínimos
- [x] As 4 operações CRUD.
- [x] O filtro de registros.
- [x] Disposição do layout semelhante à imagem que enviamos. Não se preocupe ao utilizar outra imagem ou cor de background.
- [x] Noções de UX. Não esperamos nenhum estudo aprofundado, somente bom senso.
- [x] Código legível, limpo e seguindo boas práticas de Orientação a Objetos.
- [x] Um dump ou DDL do banco de dados.

## Requisitos bônus
- [x] Utilizar PHP no backend.
- [x] Utilizar React no frontend.
- [x] Utilizar Docker.
- [x] Caso queira, pode fazer melhorias no layout. Só nos diga os pontos que te levaram a essa decisão.
- [ ] Outras entidades e relacionamento entre entidades. Por exemplo: um objeto `Empresa` que tenha as `Pessoa`s vinculadas à empresa ou relacionamento entre sí das pessoas, sugerindo um vínculo familiar.

# Resposta do participante

### _Responda aqui quais foram suas dificuldades e explique a sua solução_

## Sobre o projeto

**As instruções para rodar o projeto estão no arquivo [Instrucoes.md](https://github.com/aloefflerj/contato-seguro/blob/main/INSTRUCOES.md) na pasta raiz**

Caso não consigam rodar:
**[Aqui está o projeto na minha hospedagem](http://contato.andersonjobloeffler.com/)**
e
**[Aqui o link da listagem de usuários na api de backend](http://contato-api.andersonjobloeffler.com/v1/users)**

- **As instruções para rodar o projeto estão no arquivo Instrucoes.md na pasta raiz**

## Dificuldades e soluções

### Layout
- Mudei o ícone de deletar de uma borracha para uma lixeira pois julguei que fosse mais fácil para o usuário entender
- Arredondei a parte principal para ficar com o border-radius igual ao do modal de inserção/edição

### PHP
- Tive um pouco de dificuldade ao utilizar o _slim framework_ quanto aos middlewares, de início coloquei no index
os middlewares como `header('Content-Type: application/json')` por exemplo, mas depois refatorei para fazer funcionar.
Preferi deixar acesso do _CORS_ para todos para evitar algum erro
- Ia pegar os dados por um arquivo _.env_, mas não deu tempo

### React
- Tive mais dificuldade pois ainda não estou tão acostumado com a biblioteca
- A parte que achei mais complicada foi o gerenciamento de estado, quando vi que não conseguia passar coisas de um certo
componente para o outro, coloquei o que eu precisava no componente _<App>_ e fui passando para os filhos
- Tive uns problemas com o _axios_ para puxar os dados de certos verbos da api (_put_ e _post_ principalmente), porém, acabei descobrindo que muitos erros davam-se devido aos middlewares do slim framework
- Julgo que o código de pesquisa de usuários acabou ficando ruim (o método `map` está dando um alerta no console pois não tem retorno), achei complicado buscar filtrando pelos campos, gostaria de poder refatorá-lo
- Existe, ainda, outro alerta no console relacionado aos _states_ de alguns componentes, gostaria de poder arrumar também, mas não deu tempo

### Docker
- Tive bastante dificuldade pois nunca havia mexido, testei diversas vezes e espero que consigam rodar
- Os meus maiores problemas foram com as imagens do _apache_ e do _mysql_. Quanto ao apache eu só queria expor a pasta _/public_, e a única coisa que consegui achar foi um comando pronto no Stack Overflow para conseguir fazer isso. Quanto ao mysql houve um erro na inicialização da imagem que não soube resolver, apenas depois de remover as imagens e containers tive sucesso
- Ainda não sei quase nada sobre, o que eu fiz foi apenas pesquisar e testar
