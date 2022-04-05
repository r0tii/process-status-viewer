Getting Up and Running Locally With Docker
==========================================

Docker Prerequisites
-------------

* Docker; if you don't have it, follow the [installation instructions;](https://docs.docker.com/install/#supported-platforms)
* Docker Compose; refer to the official documentation for the [installation guide.](https://docs.docker.com/compose/install/)

!!! note
    The steps below will get you up and running with a local development environment.
    All of these commands assume you are in the root of project (dir where `compose-local.yml` is located).

After the installation is complete you can check the versions:

```bash
docker --version
Docker version 20.10.12, build e91ed57

docker-compose --version
docker-compose version 1.29.2, build 5becea4c
```

Environment Files
-------------

Docker relies heavily on environment variables. Several utility environment variables are set by the build process,
and are available during automated builds, automated tests, and while executing hooks. You can find them in `.envs/` directory.

Build the Stack
---------------

This can take a while (~5min), especially the first time you run this particular command on your development system:

```bash
docker-compose -f compose-local.yml build
```

Run the Stack
-------------

This brings up Django, Postgres, PgAdmin, React with Webpack and MkDocs. The first time when it is run it might take a while to get started, but subsequent runs will occur quickly (Docker layer caching).

Cd at the project root and run the following for local development::

```bash
docker-compose -f compose-local.yml up
```

You can also set the environment variable ``COMPOSE_FILE`` pointing to ``compose-local.yml`` like this::

```bash
Linux
export COMPOSE_FILE=compose-local.yml

Windows
SET COMPOSE_FILE=compose-local.yml
```

And then run:

```bash
docker-compose up
```

To run in a detached/background (leaves the working console free) mode, just:

```bash
docker-compose up -d
```

To combine build + run **(recommended)**:

```bash
docker-compose -f compose-local.yml up --build
```

!!! tip
    **I know it sounds a bit overwhelming, I usually use `docker-compose -f compose-local.yml up --build` and use `docker-compose -f compose-local.yml build --no-cache` if something looks out of place.**

!!! tip
    Learn more about Docker and Docker-Compose commands [on their official website.](https://docs.docker.com/compose/compose-file/compose-file-v3/)

Configuring Postgres with pgAdmin
---------------------------

First, access the pgAdmin via your web browser by vising the URL [http://127.0.0.1:5050/](http://127.0.0.1:5050/). Use credentials from **docker.zip (Slack #General channel)** to log in.

1. Right click **Servers > Register > Server** to create a new server:
      1. Open the **/backend/.envs/.local/.postgres** in your editor.
      2. Select the **General** tab.
      3. For the name field, use `POSTGRES_DB`
2. Now move to the **Connection** tab:
      1. Hostname/address = `POSTGRES_HOST`
      2. Port = `POSTGRES_PORT`
      3. Maintenanance database = `postgres`
      4. Username = `POSTGRES_USER`
      5. Password = `POSTGRES_PASSWORD`

Finally, click the save button.

!!! tip
    Close pgAdmin browser tab when debugging other services. It clogs the main console with constant logging (ajax polling).

Access the application servers in your browser
---------------------------

Before you can see the application UI, you need to know the port in the host that mapped
to the port in the Web server container:

```bash
docker-compose -f compose-local.yml ps

process-status-viewer_django_1         /entrypoint /start               Up      0.0.0.0:8000->8000/tcp
process-status-viewer_frontend_1       docker-entrypoint.sh npm r ...   Up      0.0.0.0:3000->3000/tcp
process-status-viewer_pgadmin_1        /entrypoint.sh                   Up      443/tcp, 0.0.0.0:5050->5050/tcp,80/tcp
process-status-viewer_postgres_1       docker-entrypoint.sh postgres    Up      0.0.0.0:6543->5432/tcp,0.0.0.0:5432->5432/tcp
process-status-viewer_project_docs_1   mkdocs serve --dev-addr=0. ...   Up      0.0.0.0:4000->8000/tcp
```

In the above example, port 8000 in the host is mapped to port 8000 in the django
container. Therefore, you can see the web app of that particular service with your web browser by opening:

* [Django](http://127.0.0.1:8000)
* [pgAdmin](http://127.0.0.1:5050/)
* [Project docs](http://127.0.0.1:4000/)

Execute Management Commands
---------------------------

Execute commands in a running container

We need to execute commands in running containers quite often, especially during local development. We can easily do this with the use of the containere name:

```bash
docker exec -it <container_id> bash
```

Run one-off commands in a new container

Sometimes you want to run one-off commands inside a container. This is different form the `exec` subcommand, because run is not executed against a running container, **run will start a new container to execute the command**. This is useful if you don’t want to mess with the running containers.

```bash
docker-compose -f compose-local.yml run --rm django python manage.py shell_plus
```

Debugging
---------------------------

Docker Debugging

A `container id` can be used to check on containers with docker commands, for example:

```bash
# Fetch the logs of a container
docker logs <container_name>/<container_id>

# Display the running processes of a container
docker top <container_name>/<container_id>

# Run a one-off commands in a new containers:
docker-compose -f compose-local.yml run --rm <service_name> <command>

# Run a command in a running container
docker exec -it <container_name>/<container_id> bash or sh (if Alpine OS image is used)

# Validate and view the Compose file
docker-compose -f compose-local.yml config
```
