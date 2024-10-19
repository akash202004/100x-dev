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
     -p - let’s you create a port mapping
     -d.
     - Let’s you run it in detatched mode

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

# how to make a docker file and run docker build command

![image](./dockerfile_image.webp)

```
docker build -t <name_that_upload_in_docker_hub>
```

# To pass environment varible

```
docker run -p 3000:3000 -e DATABASE_URL="db_url" image_name
```

# some more command

- docker kill

```
docker kill <conatiner_id>
```

- docker exec : to execute or go deeper into that image

1. Running an Interactive Shell

```
docker exec -it <container_name_or_id> /bin/bash
```

2. List all contents of a container folder

```
docker exec <container_name_or_id> ls
```

# layers in docker

- Each command in Dockerfile run one after the another if you run first time it will take time but if you run for second time without make changes then it would cached all previous command and run instantly. Further if you make a single line change then again the command where you copy the code again run in default means no cached so it take time.

# docker volume

- Basically if a mongo we craete and put some data and kill the data inside will be deleted so we make a volume and connect with the mongo server so that the data will store in that volume. Then when we kill a conatiner and then again run it with that volume which stores that data your data will comback or fetched.

```
docker volume create volume_database
docker run -d -v volume_database:/data/db -p 27017:27017 mongo
```
