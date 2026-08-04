# HNP Project 2

A Node.js backend application built with a modular architecture, separating application logic into controllers, routes, models, middleware, configuration, and tests.

## Live Demo

https://hnp-project2.vercel.app

## Overview

HNP Project 2 is a backend web application designed with a structured and maintainable server-side architecture.

The project separates different responsibilities across dedicated directories, making the codebase easier to understand, test, maintain, and extend.

## Features

- RESTful API architecture
- Modular backend structure
- Request and response handling
- Middleware implementation
- Database models
- Dedicated controllers for business logic
- Organized API routes
- Environment variable configuration
- Automated testing with Jest
- Vercel deployment configuration

## Technologies Used

- Node.js
- Express.js
- JavaScript
- Jest
- Vercel

## Project Structure

```text
hnp-project2/
│
├── Middleware/
│   └── Application middleware
│
├── Model/
│   └── Database models
│
├── Routes/
│   └── API route definitions
│
├── config/
│   └── Application configuration
│
├── controller/
│   └── Controllers and business logic
│
├── tests/
│   └── Automated tests
│
├── .env
├── README.md
├── jest.config.js
├── package-lock.json
├── package.json
├── server.js
├── sync.js
└── vercel.json
