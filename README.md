# koinx-assignment

A Node.js application that fetches and stores cryptocurrency statistics for Bitcoin, Matic, and Ethereum using the CoinGecko API. The application provides endpoints to retrieve the latest data and calculate the standard deviation of prices for the stored records.

## Table of Contents

-   [Features](#features)
-   [Technologies Used](#technologies-used)
-   [Installation](#installation)
-   [Usage](#usage)
-   [API Endpoints](#api-endpoints)
    -   [/stats](#stats)
    -   [/deviation](#deviation)
-   [Background Job](#background-job)

## Features

-   Fetches current price, market cap, and 24-hour change for Bitcoin, Matic, and Ethereum.
-   Stores fetched data in a MongoDB database.
-   Provides an API to retrieve the latest cryptocurrency stats.
-   Calculates the standard deviation of prices for the last 100 records.

## Technologies Used

-   **Node.js**: JavaScript runtime for building server-side applications.
-   **Express**: Web framework for Node.js.
-   **MongoDB**: NoSQL database for storing cryptocurrency data.
-   **Mongoose**: ODM (Object Data Modeling) library for MongoDB and Node.js.
-   **Axios**: Promise-based HTTP client for making API requests.
-   **Node-Cron**: Library for scheduling tasks in Node.js.
-   **dotenv**: Module to load environment variables from a `.env` file.

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/harshb-15/koinx-assignment.git
    cd koinx-assignment
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Create a `.env` file in the root directory and add your MongoDB connection string:
    ```
    MONGODB_URI=mongodb://<your_mongo_uri>
    PORT=3000
    ```

## Usage

1. Start the application:

    ```bash
    npm run dev
    ```

2. The server will run on `http://localhost:3000`.

## API Endpoints

### `/stats`

Fetches the latest data about a requested cryptocurrency.

**Query Parameters:**

```json
{
    "coin": "bitcoin" // Could be one of bitcoin, matic-network, ethereum
}
```

**Sample Response:**

```json
{
    "price": 40000,
    "marketCap": 800000000,
    "24hChange": 3.4
}
```

### `/deviation`

Calculates the standard deviation of the price of a requested cryptocurrency based on the last 100 records stored in the database.

**Query Parameters:**

```json
{
    "coin": "bitcoin" // Could be one of bitcoin, matic-network, ethereum
}
```

**Sample Response:**

```json
{
    "deviation": 4082.48
}
```

## Background Job

A background job runs every 2 hours to fetch current cryptocurrency data from the CoinGecko API and store it in the MongoDB database. The job is implemented using `node-cron`.
