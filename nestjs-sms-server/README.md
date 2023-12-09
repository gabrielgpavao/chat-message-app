# NestJS SMS Server

A NestJS service that manages the sending and receiving of real-time text messaging through tools such as Server-Sent Events (SSE), Redis (Cache) and Bull (Queue).

## Running Locally Guide

This project requires Docker to be already installed in your device.
You can learn more about Docker [here](https://www.docker.com/).

You can run the code by following one of the two steps:

### 1. Dev Container

To make it easier for running it locally, the repository counts with a .devcontainer file that, together with the [Dev Containers](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers) (VS Code extension), can set all the Docker Containers up with just a few steps.

If you already installed the Dev Containers extension, what you want to do is simply:
- Open your Command Palette in VS Code by typing `'ctrl' + 'shift' + 'p'`;
- Search for the DevContainer command `"Reopen in Container"`;
- Click on it.

### 2. Docker Compose

Open your terminal and run:

```bash
$ docker compose up -d
```

Then run the following to open a terminal inside the Docker container:

```bash
$ docker compose exec app bash
```

#

Now you're ready for:

### Install Dependencies
Run:

```bash
$ npm install
```

### Enviroment Variables

The variables already have an assigned value.
The only thing you have to do is run the following:
```bash
$ cp .env.example .env
```

### Run the App

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```