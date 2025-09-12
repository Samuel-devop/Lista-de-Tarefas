FROM php:8.2-apache

# Postgres (libpq) + extensões PHP (necessárias para pg_connect e PDO)
RUN apt-get update && apt-get install -y libpq-dev \
  && docker-php-ext-install pgsql pdo pdo_pgsql

# (opcional) habilitar rewrites se um dia usar .htaccess
# RUN a2enmod rewrite

# Copia sua árvore mantendo /src no docroot
COPY ./src /var/www/html/src
COPY ./index.html /var/www/html/index.html

# Permissões
RUN chown -R www-data:www-data /var/www/html \
  && chmod -R 755 /var/www/html

EXPOSE 80
