# Common docker commands

    - docker images
    - docker ps
    - docker run
    - docker build

1. docker images

- Shows you all the images that you have on your machine

2. docker ps

- Shows you all the containers you are running on your machine

3. docker run

- Lets you start a container
  -p ⇒ let’s you create a port mapping
  -d. ⇒ Let’s you run it in detatched mode

4. docker build

- Lets you build an image. We will see this after we understand how to create your own Dockerfile

5. docker push

- Lets you push your image to a registry

6. Extra commands

- docker kill
- docker exec

# docker for mongo and postgres

- -d : to run in detach mode or background
- -p : port mapping
- -e : environment varialble

```
docker run -d -p 57017:57017 mongo
docker run -d --name my-postgres -e POSTGRES_PASSWORD=mysecretpassword -p 5432:5432 postgres

```

- connection url

```
postgresql://postgres:mysecretpassword@localhost:5432/postgres
mongodb://localhost:57017

```
![image](./dockerfile_image.webp)

```
docker build -t <name_that_uploa_in_docker_hub>
```
