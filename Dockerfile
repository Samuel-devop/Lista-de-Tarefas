FROM php:8.2-apache

# Atualiza e instala dependências para PostgreSQL
RUN apt-get update && apt-get install -y libpq-dev \
    && docker-php-ext-install pdo pdo_pgsql

# Copia o código PHP para o servidor
COPY ./src/php /var/www/html/php

# Copia arquivos estáticos
COPY ./src/javascript /var/www/html/javascript
COPY ./src/styles /var/www/html/styles
COPY ./index.html /var/www/html/index.html

# Ajusta permissões
RUN chown -R www-data:www-data /var/www/html \
    && chmod -R 755 /var/www/html

EXPOSE 80
