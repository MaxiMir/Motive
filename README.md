### Tips
```shell
# docker build -t mmirrev/frontend:1.0.103 .
docker buildx build --platform linux/amd64 -t mmirrev/frontend:1.0.103 .

docker tag $ mmirrev/frontend:1.0.103
docker push mmirrev/frontend:1.0.103
docker pull mmirrev/frontend:1.0.103

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
    image: mmirrev/frontend:1.0.96
    depends_on:
      - backend
    restart: unless-stopped
    ports:
      - "127.0.0.1:3000:3000"

  backend:
    image: mmirrev/backend:1.0.57
    environment:
      - PORT=4000
      - CLIENT=https://2bebetter.pro
      - REDIS=redis://redis:6379
      - NEXTAUTH_COOKIE=__Secure-next-auth.session-token
      - NEXTAUTH_SECRET=LlEderlgdhSaJS6yeP2JtPiz5h60ZyanzvAmYyOjG0w=
      - POSTGRES_HOST=185.154.195.52
      - POSTGRES_USER=gen_user
      - POSTGRES_PASSWORD=81oyyyxjj7
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
    listen 80;

    server_name 2bebetter.pro www.2bebetter.pro;
    return 301 https://$host$request_uri;
}

server {
    server_name localhost;
    listen 5000;

    location ~ "^/images/(?<width>\d+)/(?<image>.+)$" {
        alias /home/client/$image;
        image_filter resize $width -;
        image_filter_jpeg_quality 95;
        image_filter_buffer 20M;
  }
}

proxy_cache_path /home/client/images-cache/ levels=1:2 keys_zone=images:10m inactive=24h max_size=2g;

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

    location ~ "^/images/(?<width>\d+)/(?<image>.+)$" {
       proxy_pass http://localhost:5000/images/$width/$image;
       proxy_cache images;
       proxy_cache_valid 200 24h;
    }

    location /images {
       # Need to explicitly define DNS resolution when using
       # variables in the proxy_pass directive. This trick resolves that.
       proxy_pass http://localhost:5000/;
    }

    if ($host ~* ^www\.(.*)$) {
       return 301 https://2bebetter.pro$request_uri;
    }
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
