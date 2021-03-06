# URL_shortener
### This is URL shortener API build with django and rest-framework. It allows you to see unique visits and get data for building graphs.
### You can test it here [80.240.25.179:8000/api](http://80.240.25.179:8000/)
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
\* - mean optional
## Redirect URL
Redirect you to real url\
\
`GET /:short_url`
## Registration
Register an account\
\
`POST /register`
* Data:
  | Key           |         Value |  Description |
  | ------------- | ------------- | -------------|
  | `username`      | `<str:username>`  |     Required |
  | `password`      | `<str:password>`  |     Required |
* Return data:\
Return your unique `token`
```json
"token" : "some-data"
```
## Login
Login to your account\
\
`POST /login`
* Data:
  | Key           |         Value |  Description |
  | ------------- | ------------- | -------------|
  | `username`      | `<str:username>`  |     Required |
  | `password`      | `<str:password>`  |     Required |
* Return data:\
Return your unique `token`
```json
"token" : "some-data"
```
## Logout
Delete your unique `token`\
\
`POST /logout`
* Headers:
  | Key           | Value              | Description   |
  | ------------- | ------------------ | ------------- |
  | `Authorization` | `token <str:token>`  | Required      |
## Create URL
Create `Short_URL` object from `base_url`\
\
`POST /create_url`
* Headers:
  | Key           | Value              | Description   |
  | ------------- | ------------------ | ------------- |
  | `Authorization` | `token <str:token>`  | Optional      |
* Data:
  | Key           |         Value |  Description |
  | ------------- | ------------- | -------------|
  | `base_url`      | `<url:base_url>`  |     Required |
  | `name`      | `<str:name>`  |     Optional |
 * Return data:\
Return `Short_URL` object
```json
"base_url": "https://example_url.com/",
"name": "my beautiful url",
"short_url": "aa70435",
"active": true,
"created": "26.09.20 01:39:28",
"all_visits": 0
```
## List URLs
Get all your URLs\
\
`GET /list_url`
* Headers:
  | Key           | Value              | Description   |
  | ------------- | ------------------ | ------------- |
  | `Authorization` | `token <str:token>`  | Required      |
* URL params:\
  For more information check [REST Framework filters](https://www.django-rest-framework.org/api-guide/filtering/)
  ```json
  "filter_fields" : ["name", "created", "base_url", "short_url", "active"],
  "ordering_fields" : ["name", "created", "base_url", "short_url"]
  "search_fields" : ["base_url", "short_url", "name"]
  ```
  | Key           | Value              | Description   |
  | ------------- | ------------------ | ------------- |
  | `filter_fields` | `<str:filter_fields>`  | Optional      |
  | `ordering_fields` | `<str:ordering_fields>`  | Optional      |
  | `search_fields` | `<str:search_fields>`  | Optional      |
 * Return data:\
 Return your URLs based on filters
 ```json
 [
    {
        "base_url": "https://example_url.com/",
        "name": "my beautiful url again",
        "short_url": "aa70435",
        "active": true,
        "created": "26.09.20 01:39:28",
        "all_visits": 0
    },
    {
        "base_url": "https://example_url.com/",
        "name": "e360d6d",
        "short_url": "e360d6d",
        "active": true,
        "created": "24.09.20 18:12:08",
        "all_visits": 3
    }
]
 ```
## Single URL
Get/Change/Delete your URL\
`GET|PUT|DELETE /list_url/<str:short_url>`
* Headers:
  | Key           | Value              | Description   |
  | ------------- | ------------------ | ------------- |
  | `Authorization` | `token <str:token>`  | Required      |
__GET:__
* Return data:\
  Return `Short_URL` object
```json
"base_url": "https://example_url.com/",
"name": "my beautiful url",
"short_url": "aa70435",
"active": true,
"created": "26.09.20 01:39:28",
"all_visits": 0
```
__DELETE:__\
Just delete `Short_URL` object\
__PUT:__
* Data:
  | Key           |         Value |  Description |
  | ------------- | ------------- | -------------|
  | `active`      | `<boolean:active>`  |     Optional |
  | `name`      | `<str:name>`  |     Optional |
* Return data:\
  Return changed `Short_URL` object
```json
"base_url": "https://example_url.com/",
"name": "my beautiful url",
"short_url": "aa70435",
"active": true,
"created": "26.09.20 01:39:28",
"all_visits": 0
```
## Data for graph
Get data for building graph based on the time period/
`POST /list_url/<str:short_url>/graph`
* Headers:
  | Key           | Value              | Description   |
  | ------------- | ------------------ | ------------- |
  | `Authorization` | `token <str:token>`  | Required      |
* Data:
    | Key           | Value              | Description   |
  | ------------- | ------------------ | ------------- |
  | `days` | `<int:days>`  | Required      |
* Return data:\
  Return point coordinates based on the period
```json
[
    [
        1,
        "20:03:35 01.10.2020"
    ],
    [
        0,
        "21:03:35 01.10.2020"
    ],
    [
        0,
        "22:03:35 01.10.2020"
    ],
    [
        0,
        "23:03:35 01.10.2020"
    ],
    [
        0,
        "00:03:35 02.10.2020"
    ],
    [
        0,
        "01:03:35 02.10.2020"
    ],
    [
        0,
        "02:03:35 02.10.2020"
    ],
    [
        0,
        "19:03:35 02.10.2020"
    ]
]
```