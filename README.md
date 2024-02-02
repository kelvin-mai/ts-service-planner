# Service Planner

## TODO: Write A Good Readme

FIXME

## Usage

### Requirements

- node
- npm
- docker

First download and run the database and storage instance using `docker compose` inside the root of the project. Use the `-d` flag if you want to run the instances in the background. The output should look something like this.

```bash
$ docker compose up -d
$ docker ps -a
CONTAINER ID   IMAGE                 COMMAND                  CREATED         STATUS         PORTS                                                                                  NAMES
afe0106f8f13   quay.io/minio/minio   "/usr/bin/docker-ent…"   3 seconds ago   Up 2 seconds   0.0.0.0:9000->9000/tcp, :::9000->9000/tcp, 0.0.0.0:9090->9090/tcp, :::9090->9090/tcp   minio
1d87bb6fb0aa   postgres              "docker-entrypoint.s…"   2 days ago      Up 2 seconds   0.0.0.0:5432->5432/tcp, :::5432->5432/tcp                                              pgsql
```

The first time booting up the instances you will need to add a bucket and service account to minio. More information about how to setup minio can be found in the [docs](/docs/minio-setup.md) file And you may need to push the database schemas on the server side if the schemas have changed since the last commit, remember that `--force-reset` is an option if you want to purge any old bad data from the local mock database.

Now you can run the server and client by running `npm run dev` in the corresponding working directories.

```bash
# from root of the project
# run the server
$ cd server
$ npx prisma db push --force-reset
$ npm run dev

# from root of the project
# run the client
$ cd client
$ npm run dev
```
