# π» Process Status Monitoring Web App

![projectdescimg](https://user-images.githubusercontent.com/25624642/161682024-30820bb0-2252-4c05-9508-cafc4e621416.png)

## π Project Overview

A hobby Django/React/Bash web application which displays the output of ps aux command inside a Linux container (for now).

## π Requirements

Make sure you have [Docker](https://docs.docker.com/get-docker/) installed on your computer.

## π Usage

Just run the following command at the root of app project (directory where `compose-local.yml` is located):

```bash
docker-compose -f compose-local.yml up --build
```

This will start all dependent services inside Docker containers. Once they're up and running, you can visit [http://127.0.0.1:3000/](http://127.0.0.1:3000/) to view the web app in the browser.

Also, you can visit [http://127.0.0.1:8000/api](http://127.0.0.1:8000/api) to view and to test Django Rest API endpoints in the browser. This url will open the browsable API UI that Django REST framework provides ootb. Beside DRF browsable API you can use Postman or a similar software.

## π° Project Docs

You can read the project documentation at [http://127.0.0.1:4000/](http://127.0.0.1:4000/).

## βοΈ Todo List

- [ ] Add multistage Docker builds and Nginx dockerfile
- [ ] Create automation that fully automatically creates a virtual server on AWS
- [ ] Add Celery to periodically populate the db with currently running processes
- [ ] Add real-time be <-> fe websocket communication (Django Channels)
- [ ] Add TypeScript
- [ ] A couple of charts

## β οΈ Warning

Donβt dual develop! When developing locally, run this app either in the Docker containers (recommended) or on the host system (manually adjust code and env vars), never on both (cross platform issues, Docker dependencies fuckery, intellisense and linting issues, etc)!!!

There is a tradeoff when developing locally with Docker (i.e waiting 20min+ for rsync to finish copying dependencies from container to the host vs cross platform issues) and there is no perfect solution (maybe VSCode remote containers).

Read: <https://stackoverflow.com/questions/51097652/install-node-modules-inside-docker-container-and-synchronize-them-with-host>

*NOTE:*
This web app was developed in Windows 10 using Docker + WSL2.

## Β©οΈ License

This project is [MIT](https://opensource.org/licenses/MIT) licensed.
