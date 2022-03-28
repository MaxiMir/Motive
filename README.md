```shell
docker build -t maxiimir/2bebetter:1.0.0 .
docker push maxiimir/2bebetter:1.0.0
docker run -d -p 3000:3000 maxiimir/2bebetter:1.0.0

docker tag <IMAGE_ID> maximir.jfrog.io/default-docker-virtual/2bebetter:1.0.0
docker push maximir.jfrog.io/default-docker-virtual/2bebetter:1.0.0
docker pull maximir.jfrog.io/default-docker-virtual/2bebetter:1.0.0

docker run -d -p 3000:3000 maximir.jfrog.io/default-docker-virtual/2bebetter:1.0.0

ssh root@37.46.131.41

ss -a | grep 300 # грепаем процессы на порту 300
nginx -t # чекнуть конфиг
sudo service nginx restart
```
```shell
sudo apt-get update
sudo apt-get install nginx docker docker-compose mc 
cd /etc/nginx 
ls # sites-available
nano 2bebetter.pro.conf

server {
  listen 80;
  server_name 2bebetter.pro;
  
  location /backend {
    proxy_pass http://localhost:4000
  }
  
  location / {
    proxy_pass http://localhost:3000
  }
}


# виртуальный симлинк
sudo ln -s /etc/nginx/sites-available/2bebetter.pro.conf /etc/nginx/sites-enabled/
```
