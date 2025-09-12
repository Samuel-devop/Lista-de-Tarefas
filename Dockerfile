FROM php:8.2-apache

# Instala extensão do PostgreSQL (pgsql, pdo_pgsql) e dependências
RUN apt-get update && apt-get install -y \
    libpq-dev \
    && docker-php-ext-install pgsql pdo pdo_pgsql

# Copia todos os arquivos do projeto para o Apache (inclusive index.html, styles, js, etc)
COPY ./src/php /var/www/html/php
# COPY ./src/assets /var/www/html/assets   # REMOVIDO, pois a pasta está vazia ou não existe
COPY ./src/javascript /var/www/html/javascript
COPY ./src/styles /var/www/html/styles
COPY ./index.html /var/www/html/index.html

# Ajusta permissões (boa prática)
RUN chown -R www-data:www-data /var/www/html \
    && chmod -R 755 /var/www/html

EXPOSE 80
