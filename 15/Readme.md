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

![image](./images/dockerfile_image.webp)

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

- docker rmi to delete image

```
docker rmi <repository_name>
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

![Volume](./images/volume.webp)

```
docker volume create volume_database
docker run -d -v volume_database:/data/db -p 27017:27017 mongo
```

# docker network

- If a node.js project we run it in conatiner then it cant connect to a database as it is isolated so for that we user network to connect and enable to talk to with conatiners like a mongo container which is also run in a conatiner.
- In Docker, a network is a powerful feature that allows containers to communicate with each other and with the outside world.

![Network](./images/nrmal_image.webp)

## types of network

- Bridge: The default network driver for containers. When you run a container without specifying a network, it's attached to a bridge network. It provides a private internal network on the host machine, and containers on the same bridge network can communicate with each other.
- Host: Removes network isolation between the container and the Docker host, and uses the host's networking directly. This is useful for services that need to handle lots of traffic or need to expose many ports.

# process to connect to conatiner with network

- Clone the repo - https://github.com/100xdevs-cohort-2/week-15-live-2.2

- Build the image

```
docker build -t image_tag .
```

- Create a network

```
docker network create my_custom_network
```

- Start the backend process with the network attached to it

```
docker run -d -p 3000:3000 --name backend --network my_custom_network image_tag
```

- Start mongo on the same network

```
docker run -d -v volume_database:/data/db --name mongo --network my_custom_network -p 27017:27017 mongo
```

- Check the logs to ensure the db connection is successful

```
docker logs <container_id>
```

- The url which we put in our node.js backend project is

```
DATABASE_URL = "mongodb://<same_name_which_you_put_in_your_mongo_conatiner>:27017/myDatabase"
```

EX: docker run -d -v volume_database:/data/db <--name mongo> --network my_custom_network -p 27017:27017 mongo
Then url mongodb://mongo:27017/myDatabase

# docker repository

- like mongo has a image deploy on docker hub we make a image and deploy it to docker hub so that everyone can pull that image from a single command
- First we make a repository which start with your username/repository_name
- then make a project and run docker build with the same name you give to your repository EX: akashlaha/test_rep
- and run docker push username/repository_name:tagname, tagname determine your version if if make any changes and you want to push in that same repository we give some tagname EX: docker psuh username/repository_name:v1 so v1 si tagname

# docker compose

- So if you have to run a a project with node.js and mongodb connection with a network and mongodb has a vloume we have to write many commnad to actually run the app with docker to make it easy for begineer we use a docker compose file to run everything in a single command.

![compose](./images/compose.png)

![compose](./images/compose.webp)

[ComposeFile](./docker-compose.yaml)

Start the compose

```
docker-compose up
```

Stop everything (including volumes)

```
docker-compose down --volumes
```

# Bind Mount

- Basically if i have a next.js project when i run and i make changes in that app it instantly reflect to the lcoal server its called hot reload but when i run a app in docker container and i make changes with bash terminal it reflect in docker if we run the docker but if you change anything in vs code it cant reflect to docker conatiner as we have to build the conatiner again and again so that we can resolve with it.

```
docker run -p 3000:3000 -v ./app:/nextapp/app test_repo
```

# delete an image and a conatiner

- An image

```
docker rmi <image_name>
```

- An container

```
docker rm <container_name>
```

# docker stop and start container

```
docker stop <container_name>
docker start <container_name>
```

# docker layer architectire

- When a container is created from an image. Docker creates an additional Container layer on top of the Image layers . Container layer is a read/write layer, that stores any data generated by the container during the runtime. If the containers need to modify anything which is under the Image layers, then it is copied into the Container layerfor modifying the image as per requirement. This procedure is also called the copy-on-write mechanism. Because of the copy-on-write mechanism, Image layers always stays intact. Therefore, an image can be used by multiple containers. See the following image for a better understanding:

![Layered](./images/layerd.webp)

# how does docker work

- Since we now understand the benefits of using Docker. Let’s talk above the functioning of Docker. Docker has a docker engine, which is the heart of Docker system. It is a client-server application. It has three main components:

- A server which is a type of long-running process called a daemon process.

- A client which is Docker CLI( Command Line Interface), and

- A REST API which is used to communicate between the client( Docker CLI ) and the server ( Docker Daemon )

- The Docker daemon receives the command from the client and manages Docker objects, such as images, containers, networks, and volumes. The Docker client and daemon can either run on the same system, or you can connect a Docker client to a remote Docker daemon. They can communicate using a REST API, over UNIX sockets or a network interface.

![Docker](./images/dcker.png)
