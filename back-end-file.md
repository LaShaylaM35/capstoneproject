# Products REST API Documentation

A Flask-based REST API for managing a product catalog backed by a PostgreSQL database.

---

## Table of Contents

- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Running the Server](#running-the-server)
- [Database Schema](#database-schema)
- [Endpoints](#endpoints)
  - [Health Check](#health-check)
  - [Get All Products](#get-all-products)
  - [Create a Product](#create-a-product)
  - [Update a Product](#update-a-product)
  - [Delete a Product](#delete-a-product)
- [Error Handling](#error-handling)

---

## Getting Started

### Prerequisites

- Python 3.8+
- PostgreSQL database
- `pip` for installing dependencies

### Installation

```bash
# Clone the repository and navigate into it
cd CapstoneLevel4

# Create and activate a virtual environment
python -m venv venv
venv\Scripts\activate        # Windows
source venv/bin/activate     # macOS/Linux

# Install dependencies
pip install -r requirements.txt
```

---

## Environment Variables

Create a `.env` file in the project root with the following keys:

| Variable      | Description                          | Example          |
|---------------|--------------------------------------|------------------|
| `DB_HOST`     | PostgreSQL host                      | `localhost`      |
| `DB_PORT`     | PostgreSQL port                      | `5432`           |
| `DB_NAME`     | Database name                        | `mydb`           |
| `DB_USER`     | Database user                        | `postgres`       |
| `DB_PASSWORD` | Database password                    | `secret`         |
| `DB_SSLMODE`  | SSL mode (`disable`, `require`, etc.)| `require`        |

---

## Running the Server

```bash
python app.py
```

The server starts in debug mode on `http://127.0.0.1:5000` by default. The database table is created automatically on startup if it does not already exist.

---

## Database Schema

**Table:** `catalog.products`

| Column       | Type           | Description                        |
|--------------|----------------|------------------------------------|
| `product_id` | `serial` (PK)  | Auto-incrementing unique identifier|
| `name`       | `varchar(100)` | Product name                       |
| `price`      | `numeric`      | Product price                      |
| `quantity`   | `int`          | Stock quantity                     |

---

## Endpoints

### Base URL

```
http://127.0.0.1:5000
```

---

### Health Check

Check whether the server is running.

```
GET /health
```

**Response**

```json
{
  "message": "Server Online"
}
```

---

### Get All Products

Retrieve a list of all products in the catalog.

```
GET /products/
```

**Response `200 OK`**

```json
[
  {
    "product_id": 1,
    "name": "Widget A",
    "price": 9.99,
    "quantity": 100
  },
  {
    "product_id": 2,
    "name": "Widget B",
    "price": 14.99,
    "quantity": 50
  }
]
```

---

### Create a Product

Add a new product to the catalog.

```
POST /products/
```

**Request Body** (`application/json`)

| Field      | Type    | Required | Description       |
|------------|---------|----------|-------------------|
| `name`     | string  | Yes      | Product name      |
| `price`    | number  | Yes      | Product price     |
| `quantity` | integer | Yes      | Stock quantity    |

**Example Request**

```json
{
  "name": "Widget C",
  "price": 4.99,
  "quantity": 200
}
```

**Response `201 Created`**

```json
{
  "message": "Object Created"
}
```

---

### Update a Product

Update an existing product by its ID.

```
PUT /products/<id>
```

**URL Parameters**

| Parameter | Type    | Description                    |
|-----------|---------|--------------------------------|
| `id`      | integer | The `product_id` of the product|

**Request Body** (`application/json`)

| Field      | Type    | Required | Description           |
|------------|---------|----------|-----------------------|
| `name`     | string  | Yes      | Updated product name  |
| `price`    | number  | Yes      | Updated price         |
| `quantity` | integer | Yes      | Updated stock quantity|

**Example Request**

```json
{
  "name": "Widget C Pro",
  "price": 6.99,
  "quantity": 150
}
```

**Response `201`**

```json
{
  "message": "Object Updated"
}
```

---

### Delete a Product

Remove a product from the catalog by its ID.

```
DELETE /products/<id>
```

**URL Parameters**

| Parameter | Type    | Description                    |
|-----------|---------|--------------------------------|
| `id`      | integer | The `product_id` of the product|

**Response `201`**

```json
{
  "message": "Object Deleted"
}
```

---

## Error Handling

All endpoints return a `500` status code with a descriptive message if an unexpected server or database error occurs.

```json
{
  "message": "An unexpected error occurred: <error details>"
}
```

---

## Tech Stack

| Layer     | Technology                  |
|-----------|-----------------------------|
| Framework | Flask 3.1.3                 |
| Database  | PostgreSQL (via psycopg2)   |
| Config    | python-dotenv               |
