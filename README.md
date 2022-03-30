```shell
docker build -t maximir/frontend:1.0.0 .
docker push maximir/frontend:1.0.0
docker run -d -p 3000:3000 maximir/frontend:1.0.0

docker tag <IMAGE_ID> maximir.jfrog.io/default-docker-virtual/frontend:1.0.0
docker push maximir.jfrog.io/default-docker-virtual/frontend:1.0.0
docker pull maximir.jfrog.io/default-docker-virtual/frontend:1.0.0
```
```yaml
version: '3.3'

services:
  frontend:
    image: maximir.jfrog.io/default-docker-virtual/frontend:1.0.0
    environment:
      - NEXTAUTH_URL=https://2bebetter.pro
      - NEXTAUTH_SECRET=LlEderlgdhSaJS6yeP2JtPiz5h60ZyanzvAmYyOjG0w=
      - GITHUB_ID=Iv1.783b28b16644a42a
      - GITHUB_SECRET=932f94d4af139288422f81ec2dc9dd61d2ace0d9
      - GOOGLE_ID=773653438269-1emlak7ceb4e55k82vcog6flv59c5e0e.apps.googleusercontent.com
      - GOOGLE_SECRET=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
    depends_on:
      - backend
    restart: unless-stopped
    ports:
      - "3000:3000"

  backend:
    image: maximir.jfrog.io/default-docker-virtual/backend:1.0.0
    environment:
      - NEXTAUTH_SECRET=LlEderlgdhSaJS6yeP2JtPiz5h60ZyanzvAmYyOjG0w=
      - POSTGRES_HOST=188.225.37.43
      - POSTGRES_USER=gen_user
      - POSTGRES_PASSWORD=28cmie5gy10
      - POSTGRES_DB=default_db
      - POSTGRES_PORT=5432
    volumes:
      - .:/usr/src/app
      - /usr/src/app/node_modules
    restart: unless-stopped
    ports:
      - "4000:4000"
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
