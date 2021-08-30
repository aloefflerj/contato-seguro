# Instruções

## Docker Compose
> Tendo em vista que não conheço muito sobre docker, deve haver muitas coisas erradas, porém consegui rodar na minha máquina... Abaixo, segue o passo a passo de como eu rodei aqui.

- Na pasta **server** rodar o `composer update`
- Na pasta raiz rodar `docker-compose build`
- Na pasta raiz rodar `docker-compose up` (não rodei com a flag -d pois ele demora bastande, principalmente o mysql, espero um bom tempo mesmo)
- Abrir no **localhost:3000**
- Para teste, pode-se abrir o **localhost:8000/v1/users**, o retorno é um json dos usuários

## Rodar em PHP-Server + React

### Mysql
- Após baixar o projeto, inicie o mysql e carregue o bando de dados db.sql da raiz do projeto para seu banco
> Por exemplo, na pasta raiz execute `mysql -uroot < db.sql` ou importe através de alguma ferramenta

### PHP
- Entre na pasta **server** e rode o `composer update`
- Após terminar, ainda na pasta **server**, inicie o servidor embutido do php dessa forma `php -S localhost:8000 -t public` 
- No navegador, acesse **localhost:8000/v1/users** para ver se está tudo ok. O resultado deve ser um json com os usuários do banco

### React
- Logo apos, entre na pasta **client** e rode o `npm i`
- Após terminar, inicie o react com o `npm start`
- Acesse **localhost:3000** e veja se está tudo funcionando

