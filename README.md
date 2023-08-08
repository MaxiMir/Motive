### TODO
* Добавить модалку об опыте
* Добавить прогресс загрузки в фоне
* Goal передать для клика
* Добавить модалку о закрытии и сохранении данных
* Распознание текста в модалке обратной связи.
* прогресс чтения статьи
* up button
* нотификации о новых статьях
* теги для статьи
* просмотры и комментарии к статьям
* Сортировка комментариев
* Удаление комментария (1 час)
* https://github.com/jquense/yup/issues/159
* Stack + user in notification
* Индикатор подгрузки в Infinity Loading
* Notifications Infinity подругзка
* Scroll to up
* Modal External Links
* Show more in description
* hover in user sections
* lock icon for disabled
* Loader in stories
* Обратная связь
* Add external links
* Добавить удаление цели без очков
* useTryFullScreen
* тип сообщений в обсуждении
* (2) в title meta с обновлениями
* https://mui.com/material-ui/react-menu/#basic-menu aria
* TODO disabled control
* Loader для photo (+ для историй)
* редактирование фотки
* https://docs.nestjs.com/techniques/caching
* hydration error
* мэпинг календаря
* Загрузка нотификаций не сразу
* Генерация картинок для og
* https://validator.w3.org/nu/?doc=https%3A%2F%2F2bebetter.pro%2Fmaximir
* Redis для страниц
* Генерация картинок og
* Редактирование в течение 15 минут сообщений
* Группировка уведомлений
* Обновление сообщений
* Добавить режим для целей
* Добавить приватные цели (без баллов / удаление после прохождения)
* Уведомления (о завершении цели + ...)
* Геометаданные
* Будильник
* Наведение на хар-ки -> список пользователей
* Добавить редактирование обратной связи
* Подсказки
* Push notification

### Tips
```shell
docker build -t mmirrev/frontend:1.0.95 .
# artifactory:
docker tag <IMAGE_ID> mmirrev/frontend:1.0.95
docker push mmirrev/frontend:1.0.95
docker pull mmirrev/frontend:1.0.95

# copy:
docker cp <IMAGE_ID>:/home/node/client /home # <-
docker cp /home/client <IMAGE_ID>:/home/node # ->

# docker logs
docker logs -f --until=200s home_backend_1 

sudo lsof -i tcp:3000 # what is running on the port 3000
nginx -t # configuration check
/etc/init.d/nginx restart

# init:
sudo apt-get update
sudo apt-get install nginx docker docker-compose mc 
cd /etc/nginx 
ls # sites-available
nano 2bebetter.pro.conf

# виртуальный симлинк
sudo ln -s /etc/nginx/sites-available/2bebetter.pro.conf /etc/nginx/sites-enabled/
```
### Docker compose config:
```yaml
version: '3.3'

services:
  frontend:
    image: mmirrev/frontend:1.0.95
    depends_on:
      - backend
    restart: unless-stopped
    ports:
      - "127.0.0.1:3000:3000"

  backend:
    image: mmirrev/backend:1.0.54
    environment:
      - PORT=4000
      - CLIENT=https://2bebetter.pro
      - REDIS=redis://redis:6379
      - NEXTAUTH_COOKIE=__Secure-next-auth.session-token
      - NEXTAUTH_SECRET=******
      - POSTGRES_HOST=188.225.37.43
      - POSTGRES_USER=gen_user
      - POSTGRES_PASSWORD=******
      - POSTGRES_DB=default_db
      - POSTGRES_PORT=5432
      - EAT_AFTER_DAYS=28
      - CLEAN_NOTIFICATIONS_AFTER_DAYS=60
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
### NGINX config:
```shell
server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;

    server_name 2bebetter.pro www.2bebetter.pro;

    ssl_certificate /var/lib/dehydrated/certs/2bebetter.pro/fullchain.pem;
    ssl_certificate_key /var/lib/dehydrated/certs/2bebetter.pro/privkey.pem;

    ssl_session_cache shared:SSL:10m;
    ssl_session_timeout 10m;
    keepalive_timeout 70;

    ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
    ssl_ciphers ALL:EECDH+aRSA+AESGCM:EDH+aRSA+AESGCM:EECDH+aRSA+AES:EDH+aRSA+AES;
    ssl_prefer_server_ciphers on;

    brotli on;
    brotli_types
        application/javascript
        application/json
        image/svg+xml
        text/css
        text/plain;

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

### [SSL](https://cdnnow.ru/blog/dehydrated/)

```shell
server {
    server_name xx.ru www.2bebetter.pro;
    location ^~ /.well-known/acme-challenge {
        alias /var/lib/dehydrated/acme-challenges;
    }
    location / {
        return 301 https://$host$request_uri;
    }
}


nginx -t
nginx -s reload
dehydrated -c
```

### nginx.config for brotli:
```shell
user www-data;
worker_processes auto;
pid /run/nginx.pid;
load_module modules/ngx_http_brotli_filter_module.so;
load_module modules/ngx_http_brotli_static_module.so;
include /etc/nginx/modules-enabled/*.conf;
# ...
```
