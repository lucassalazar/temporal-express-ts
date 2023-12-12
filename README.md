## Description

This is a simple signing message API built using Express and temporal.io. I've built this project in order to grasp the basics of how things work in the temporal.io ecosystem.

## Features

- Sign a message.
- Check the signing status of a message.

## Setup

- Start the temporal server: `npm run dev:temporal-server`
- Run the API: `npm run dev`
- Activate the worker: `npm run dev:worker`
- Open the temporal UI at: `http://localhost:8080`

API Endpoints

- `POST /sign/:id`: Sign a message
- `GET /sign/status/:id`: Verify the signing status
