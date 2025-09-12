FROM php:8.2-apache

# Instala dependências e extensões PostgreSQL necessárias (pdo_pgsql e pgsql)
RUN apt-get update && apt-get install -y libpq-dev \
    && docker-php-ext-install pdo pdo_pgsql pgsql

# Copia todos os arquivos do projeto para o Apache
COPY ./php /var/www/html/php
COPY ./javascript /var/www/html/javascript
COPY ./styles /var/www/html/styles
COPY ./index.html /var/www/html/index.html

# Ajusta permissões (boa prática)
RUN chown -R www-data:www-data /var/www/html \
    && chmod -R 755 /var/www/html

EXPOSE 80
