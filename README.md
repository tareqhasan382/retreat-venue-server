<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Project setup

Here’s a clean `README.md` for your server setup with Docker, Prisma, and NestJS:

````markdown
# Retreat Venue Manager - Server

This repository contains the backend server for the Retreat Venue Manager application. It uses **NestJS**, **PostgreSQL**, and **Prisma**. Docker is used to easily run the server and database.



## Environment Variables

Create a `.env` file in the server root directory with the following content:

```env
DATABASE_USER=admin
DATABASE_PASSWORD=secret123
DATABASE_NAME=retreatdb
DATABASE_URL=postgresql://admin:secret123@db:5432/retreatdb?schema=public
NODE_ENV=production

# Authentication
SALT_ROUND=13
ACCESS_TOKEN_SECRET=
REFRESH_TOKEN_SECRET=
ACCESS_TOKEN_EXPIREIN=''
REFRESH_TOKEN_EXPIREIN=''
# SMTP
SMTP_HOST=
SMTP_PORT=587
SMTP_USER=
SMTP_PASS=
SMTP_FROM=
````


## Docker Setup

1. **Build and run containers:**

```bash
docker compose up -d
```

2. **Check running containers:**

```bash
docker ps
```

* `retreat_db` → PostgreSQL running on port `5433`
* `retreat-app` → NestJS server running on port `5000`

3. **Stop containers:**

```bash
docker compose down
```

---

## Accessing the API

By default, the server runs on:

```
http://localhost:5000
```

### Example Endpoints

* `GET /bookings` → List all booking inquiries
* `POST /bookings` → Create a new booking inquiry
* `GET /venues` → List all venues
* `POST /venues` → Create a new venue

---

## Local Development (Optional)

If you prefer running without Docker:

1. Install dependencies:

```bash
npm install
```

2. Apply Prisma migrations:

```bash
npx prisma migrate dev
```

3. Run the server:

```bash
npm run dev
```

Server will run on `http://localhost:5000`.

---

## Notes

* Make sure the `.env` file matches the credentials in `docker-compose.yml`.
* PostgreSQL data is persisted in the `pg_data` volume.
* Docker handles service health checks; the app waits until the database is ready.

---


