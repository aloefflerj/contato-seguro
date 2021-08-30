# Instruções

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

