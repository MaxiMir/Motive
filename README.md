[//]: # (TODO)
* Группировка уведомлений
* Обновление сообщений
* Добавить режим для целей
* Добавить приватные цели (без баллов / удаление после прохождения)
* Уведомления (о завершении цели + ...)
* Геометаданные
* Будильник
* Наведение на хар-ки -> список пользователей
* Переделать завершенные цели
* Добавить редактирование обратной связи
* Подсказки

```shell
docker build -t maximir/frontend:1.0.74 .
# artifactory:
docker tag <IMAGE_ID> maximir.jfrog.io/default-docker-virtual/frontend:1.0.74
docker push maximir.jfrog.io/default-docker-virtual/frontend:1.0.74
docker pull maximir.jfrog.io/default-docker-virtual/frontend:1.0.74

# copy:
docker cp <IMAGE_ID>:/home/node/client /home # <-
docker cp /home/client <IMAGE_ID>:/home/node # ->

# connect
ssh root@217.25.93.198
docker logs -f --until=200s home_backend_1 # docker logs

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
```yaml
version: '3.3'

services:
  frontend:
    image: maximir.jfrog.io/default-docker-virtual/frontend:1.0.74
    depends_on:
      - backend
    restart: unless-stopped
    ports:
      - "127.0.0.1:3000:3000"

  backend:
    image: maximir.jfrog.io/default-docker-virtual/backend:1.0.39
    environment:
      - PORT=4000
      - CLIENT=https://2bebetter.pro
      - REDIS=redis://redis:6379
      - NEXTAUTH_COOKIE=__Secure-next-auth.session-token
      - NEXTAUTH_SECRET=LlEderlgdhSaJS6yeP2JtPiz5h60ZyanzvAmYyOjG0w=
      - POSTGRES_HOST=188.225.37.43
      - POSTGRES_USER=gen_user
      - POSTGRES_PASSWORD=28cmie5gy10
      - POSTGRES_DB=default_db
      - POSTGRES_PORT=5432
      - EAT_AFTER_DAYS=28
    volumes:
      - /home/client:/home/node/client
    restart: unless-stopped
    ports:
      - "127.0.0.1:4000:4000"
    depends_on:
      - redis

  redis:
    image: redis:6.2.5-alpine
    ports:
      - "127.0.0.1:6379:6379"
```

**SSL**: https://cdnnow.ru/blog/dehydrated/

```shell
server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;

    server_name 2bebetter.pro www.2bebetter.pro;

    ssl on;
    ssl_certificate /var/lib/dehydrated/certs/2bebetter.pro/fullchain.pem;
    ssl_certificate_key /var/lib/dehydrated/certs/2bebetter.pro/privkey.pem;

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

    location  ~ ^/(api\/v1|socket\.io)/ {
       client_max_body_size 64M;

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

       # WebSocket support
       proxy_http_version 1.1;
       proxy_set_header Upgrade $http_upgrade;
       proxy_set_header Connection "upgrade";
    }

    location /static/ {
       root /home/client;
       expires 30d;
    }

    if ($host ~* ^www\.(.*)$) {
       return 301 https://2bebetter.pro$request_uri;
    }
}

server {
    listen 80;

    server_name 2bebetter.pro www.2bebetter.pro;
    return 301 https://$host$request_uri;
}

```
