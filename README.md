```shell
docker build -t maximir/frontend:1.0.7 .
# artifactory:
docker tag <IMAGE_ID> maximir.jfrog.io/default-docker-virtual/frontend:1.0.7
docker push maximir.jfrog.io/default-docker-virtual/frontend:1.0.7
docker pull maximir.jfrog.io/default-docker-virtual/frontend:1.0.7

# copy:
docker cp <IMAGE_ID>:/home/node/client /home # <-
docker cp /home/client <IMAGE_ID>:/home/node # ->
```
```yaml
version: '3.3'

services:
  frontend:
    image: maximir.jfrog.io/default-docker-virtual/frontend:1.0.0
    depends_on:
      - backend
    restart: unless-stopped
    ports:
      - "127.0.0.1:3000:3000"

  backend:
    image: maximir.jfrog.io/default-docker-virtual/backend:1.0.0
    environment:
      - PORT=4000
      - CLIENT=https://2bebetter.pro
      - NEXTAUTH_COOKIE=__Secure-next-auth.session-token
      - NEXTAUTH_SECRET=LlEderlgdhSaJS6yeP2JtPiz5h60ZyanzvAmYyOjG0w=
      - POSTGRES_HOST=188.225.37.43
      - POSTGRES_USER=gen_user
      - POSTGRES_PASSWORD=28cmie5gy10
      - POSTGRES_DB=default_db
      - POSTGRES_PORT=5432
    volumes:
      - /home/client:/home/node/client
    restart: unless-stopped
    ports:
      - "127.0.0.1:4000:4000"
```
```shell
##
# You should look at the following URL's in order to grasp a solid understanding
# of Nginx configuration files in order to fully unleash the power of Nginx.
# https://www.nginx.com/resources/wiki/start/
# https://www.nginx.com/resources/wiki/start/topics/tutorials/config_pitfalls/
# https://wiki.debian.org/Nginx/DirectoryStructure
#
# In most cases, administrators will remove this file from sites-enabled/ and
# leave it as reference inside of sites-available where it will continue to be
# updated by the nginx packaging team.
#
# This file will automatically load configuration files provided by other
# applications, such as Drupal or Wordpress. These applications will be made
# available underneath a path with that package name, such as /drupal8.
#
# Please see /usr/share/doc/nginx-doc/examples/ for more detailed examples.
##

# Default server configuration
#

server {
        listen 443 ssl default_server;
        listen [::]:443 ssl default_server;

        server_name 2bebetter.pro www.2bebetter.pro;

        ssl on;
        ssl_certificate /etc/ssl/certs/2bebetter.pro.crt;
        ssl_certificate_key /etc/ssl/private/2bebetter-private.key;

        ssl_session_cache shared:SSL:10m;
        ssl_session_timeout 10m;
        keepalive_timeout 70;

        ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
        ssl_ciphers ALL:EECDH+aRSA+AESGCM:EDH+aRSA+AESGCM:EECDH+aRSA+AES:EDH+aRSA+AES;
        ssl_prefer_server_ciphers on;

        location / {
           proxy_pass          http://localhost:3000;
           proxy_set_header    Host             $host;
           proxy_set_header    X-Real-IP        $remote_addr;
           proxy_set_header    X-Forwarded-For  $proxy_add_x_forwarded_for;
           proxy_set_header    X-Client-Verify  SUCCESS;
           proxy_set_header    X-Client-DN      $ssl_client_s_dn;
           proxy_set_header    X-SSL-Subject    $ssl_client_s_dn;
           proxy_set_header    X-SSL-Issuer     $ssl_client_i_dn;
           proxy_read_timeout 1800;
           proxy_connect_timeout 1800;
        }

        location /api/v1/ {
          client_max_body_size 10M;

           proxy_pass          http://localhost:4000;
           proxy_set_header    Host             $host;
           proxy_set_header    X-Real-IP        $remote_addr;
           proxy_set_header    X-Forwarded-For  $proxy_add_x_forwarded_for;
           proxy_set_header    X-Client-Verify  SUCCESS;
           proxy_set_header    X-Client-DN      $ssl_client_s_dn;
           proxy_set_header    X-SSL-Subject    $ssl_client_s_dn;
           proxy_set_header    X-SSL-Issuer     $ssl_client_i_dn;
           proxy_read_timeout 1800;
           proxy_connect_timeout 1800;
        }

        location /static/ {
           root /home/client;
           expires 30d;
        }
}

server {
    listen 80;

    server_name 2bebetter.pro www.2bebetter.pro;
    return 301 https://2bebetter.pro;
}
```
```shell
ssh root@37.46.131.41

ss -a | grep 300 # грепаем процессы на порту 300
nginx -t # чекнуть конфиг
/etc/init.d/nginx restart

sudo apt-get update
sudo apt-get install nginx docker docker-compose mc 
cd /etc/nginx 
ls # sites-available
nano 2bebetter.pro.conf

# виртуальный симлинк
sudo ln -s /etc/nginx/sites-available/2bebetter.pro.conf /etc/nginx/sites-enabled/
```
