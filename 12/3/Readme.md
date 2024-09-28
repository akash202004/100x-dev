## Mongo run on docker

- to run mongodb server locally on port 27017

```
docker run mongo
```

- to port all request that come in our big computer to mini computer of docker like porting

```
docker run  -p 27017:27017 mongo
```

- Adding -d will ensure it starts in the background

```
docker run -d -p 27017:27017 mongo
```

- Inspecting a container

```
docker ps
```

- Stopping a container

```
docker kill <container_id>
```

## postgres run on docker

- to run postgres server locally

```
 docker run -e POSTGRES_PASSWORD=mysecretpassword -d -p 5432:5432 postgres
```

- the connection string will be

```
postgresql://postgres:mysecretpassword@localhost:5432/postgres
```

- customize name

```
 docker run -e POSTGRES_PASSWORD=mysecretpassword -e POSTGRES_USER=akash -d -p 5432:5432 postgres
```

```
postgresql://akash:mysecretpassword@localhost:5432/akash
```
