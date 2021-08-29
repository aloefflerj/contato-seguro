# FROM php:7.4-apache

# # WORKDIR /var/www/html/public

# RUN docker-php-ext-install mysqli && docker-php-ext-enable mysqli
# RUN apt-get update && apt-get upgrade -y
FROM php:7.4-apache

# WORKDIR /var/www/html/public
ENV APACHE_DOCUMENT_ROOT=/var/www/html/public
RUN sed -ri -e 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/sites-available/*.conf
RUN sed -ri -e 's!/var/www/!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/apache2.conf /etc/apache2/conf-available/*.conf

RUN chmod -R 777 .
RUN docker-php-ext-install mysqli && docker-php-ext-enable mysqli
RUN apt-get update && apt-get upgrade -y
# RUN pecl install xdebug-2.9.2 && docker-php-ext-enable xdebug
RUN a2enmod rewrite && service apache2 restart

# mysql
RUN docker-php-ext-install pdo pdo_mysql