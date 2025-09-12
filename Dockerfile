FROM php:8.2-apache

# Instala dependências do sistema e PostgreSQL PHP extensions
RUN apt-get update && apt-get install -y libpq-dev \
    && docker-php-ext-install pdo pdo_pgsql pgsql \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

# Copia arquivos do projeto para o Apache
COPY ./src/php /var/www/html/php
COPY ./src/javascript /var/www/html/javascript
COPY ./styles /var/www/html/styles
COPY ./index.html /var/www/html/index.html

# Ajusta permissões (boa prática)
RUN chown -R www-data:www-data /var/www/html \
    && chmod -R 755 /var/www/html

EXPOSE 80
