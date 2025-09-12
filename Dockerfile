FROM php:8.2-apache

# Instala extensão do PostgreSQL
RUN apt-get update && apt-get install -y \
    libpq-dev \
    && docker-php-ext-install pdo pdo_pgsql

# Copia os arquivos do projeto para o servidor Apache
COPY ./src/php /var/www/html/


# Exponha a porta padrão
EXPOSE 80
