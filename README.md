# GoogleMapsJS
Aplicação de Mapa Interativo GoogleMaps construída apenas com HTML e JavaScript.

### Recursos
Docker PHP2 e MySQL: https://www.vivaolinux.com.br/topico/Docker/ambiente-PHP-72-no-Docker/

#### Download da imagem
  $ docker pull saitam10/apache2-php7.2 

#### Subir o ambiente e setando o volume mapeando o diretório do HOST e CONTAINER
  $ docker run --name devphp -d -p 80:80 -v /home/usuario/projeto:/var/www/html saitam10/apache2-php7.2 