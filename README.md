# URL_shortener
### This is an API for url shortener made with django rest framework. It allows you to track unique visits and get data for plotting
## Instalation
To use it, you just need to install `docker-compose`
```bash
pip install docker-compose
```
Before the start you also need to add `nginx.conf` to `nginx/sites-enabled`
Then just run the following command:
```bash
docker-compose up -d --duild
```
To stop the server:
```bash
docker-compose down
```