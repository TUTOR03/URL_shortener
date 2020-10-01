# URL_shortener
### This is URL shortener API build with django and rest-framework. It allows you to see unique visits and get data for building graphs.
## Instalation
To set up the API use `docker`. Firstly create a `virtualenv` and install all requirements.
```bash
virtualenv env
source env/bin/activate
pip install -r requirements.txt
```
Then just configure `Dockerfile`, `docker-compose.yml`, `settings.py` as you need and run it with `docker-compose`.
```bash
docker-compose up -d --build
```
Also you need to configure the `url_shortener.conf` and put it into `etc/nginx/sites-enabled/`
## API Documentation
