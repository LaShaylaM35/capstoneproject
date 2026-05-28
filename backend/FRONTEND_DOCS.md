# Frontend Documentation

React + Vite frontend for the Product Catalog application.

**Repository:** [https://github.com/LaShaylaM35/capstoneproject](https://github.com/LaShaylaM35/capstoneproject)

---

## Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Components](#components)
  - [App](#app)
  - [Navbar](#navbar)
  - [ChatWidget](#chatwidget)
- [Pages](#pages)
  - [ProductsPage](#productspage)
- [Services](#services)
  - [products.js](#productsjs)
- [Connecting to the Backend](#connecting-to-the-backend)

---

## Overview

This is the frontend for the Product Catalog capstone project. It provides a UI for viewing, adding, editing, and deleting products by communicating with the Flask REST API backend. It also includes an embedded AI chat assistant powered by n8n.

---

## Tech Stack

| Tool              | Version   | Purpose                        |
|-------------------|-----------|--------------------------------|
| React             | ^18.3.1   | UI library                     |
| Vite              | ^5.4.10   | Build tool and dev server      |
| @vitejs/plugin-react-swc | ^3.5.0 | Fast Refresh via SWC      |
| ESLint            | ^9.13.0   | Linting                        |
| n8n Chat (CDN)    | latest    | Embedded AI chat widget        |

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Installation

```bash
# Clone the repository
git clone https://github.com/LaShaylaM35/capstoneproject.git
cd capstoneproject

# Install dependencies
npm install
```

### Running the Dev Server

```bash
npm run dev
```

The app will be available at `http://localhost:5173` by default.

### Other Scripts

| Command         | Description                          |
|-----------------|--------------------------------------|
| `npm run dev`   | Start the development server         |
| `npm run build` | Build for production (outputs `dist/`)|
| `npm run preview` | Preview the production build       |
| `npm run lint`  | Run ESLint across the project        |

> **Note:** The Flask backend must be running at `http://127.0.0.1:5000` for the frontend to work. See the backend `API_DOCS.md` for setup instructions.

---

## Project Structure

```
capstoneproject/
├── public/                  # Static assets
├── src/
│   ├── assets/              # Images and other assets
│   ├── components/
│   │   ├── Navbar.jsx       # Top navigation bar
│   │   └── ChatWidget.jsx   # Embedded AI chat assistant
│   ├── pages/
│   │   └── ProductsPage.jsx # Main product management page
│   ├── services/
│   │   └── products.js      # API call functions
│   ├── App.jsx              # Root component
│   ├── App.css              # App-level styles
│   ├── index.css            # Global styles
│   └── main.jsx             # React entry point
├── index.html
├── package.json
├── vite.config.js
└── eslint.config.js
```

---

## Components

### App

**File:** `src/App.jsx`

The root component. Renders the three top-level pieces of the UI in order:

```jsx
<Navbar />
<ProductsPage />
<ChatWidget />
```

No props or state — purely a layout wrapper.

---

### Navbar

**File:** `src/components/Navbar.jsx`

A simple top navigation bar that displays the app title.

```jsx
<nav className="navbar">
  <h1 className="navbar-title">Product Catalog</h1>
</nav>
```

| Prop | Type | Description        |
|------|------|--------------------|
| —    | —    | No props accepted  |

---

### ChatWidget

**File:** `src/components/ChatWidget.jsx`

Embeds an n8n-powered AI chat assistant into the page. The widget is loaded dynamically from a CDN on mount and cleaned up on unmount.

- Loads `@n8n/chat` from `cdn.jsdelivr.net`
- Opens as a floating window (`mode: 'window'`)
- Connects to an n8n webhook for responses
- Renders nothing in the DOM itself (`return null`) — the widget injects its own UI

| Prop | Type | Description       |
|------|------|-------------------|
| —    | —    | No props accepted |

---

## Pages

### ProductsPage

**File:** `src/pages/ProductsPage.jsx`

The main page of the application. Handles all CRUD operations for products.

#### State

| State variable | Type      | Description                                      |
|----------------|-----------|--------------------------------------------------|
| `products`     | `array`   | List of all products fetched from the API        |
| `form`         | `object`  | Controlled form values `{ name, price, quantity }`|
| `editingId`    | `number \| null` | ID of the product currently being edited, or `null` for a new product |
| `error`        | `string \| null` | Error message to display, or `null`        |
| `loading`      | `boolean` | Whether a fetch is in progress                   |

#### Behavior

- On mount, fetches all products via `getProducts()` and populates the table.
- The form doubles as both an **Add** and **Edit** form depending on whether `editingId` is set.
- Submitting the form calls `createProduct()` or `updateProduct()` accordingly, then refreshes the list.
- Clicking **Edit** on a table row pre-fills the form with that product's data.
- Clicking **Delete** shows a confirmation dialog, then calls `deleteProduct()` and refreshes the list.
- Clicking **Cancel** while editing clears the form and resets `editingId` to `null`.

#### UI Sections

1. **Form card** — Add or edit a product (name, price, quantity)
2. **Table card** — Displays all products with Edit and Delete buttons per row

---

## Services

### products.js

**File:** `src/services/products.js`

All API communication is centralized here. The base URL is set to `http://127.0.0.1:5000`.

#### `getProducts()`

Fetches all products.

```js
const products = await getProducts();
```

- **Method:** `GET /products/`
- **Returns:** `Promise<Array>` — array of product objects

---

#### `createProduct(product)`

Creates a new product.

```js
await createProduct({ name: 'Widget', price: 9.99, quantity: 50 });
```

- **Method:** `POST /products/`
- **Params:** `product` — `{ name: string, price: number, quantity: number }`
- **Returns:** `Promise<Object>` — `{ message: "Object Created" }`

---

#### `updateProduct(id, product)`

Updates an existing product by ID.

```js
await updateProduct(3, { name: 'Widget Pro', price: 14.99, quantity: 30 });
```

- **Method:** `PUT /products/<id>`
- **Params:** `id` — product ID; `product` — `{ name, price, quantity }`
- **Returns:** `Promise<Object>` — `{ message: "Object Updated" }`

---

#### `deleteProduct(id)`

Deletes a product by ID.

```js
await deleteProduct(3);
```

- **Method:** `DELETE /products/<id>`
- **Params:** `id` — product ID
- **Returns:** `Promise<Object>` — `{ message: "Object Deleted" }`

---

## Connecting to the Backend

The frontend expects the Flask backend to be running locally. The base URL is hardcoded in `src/services/products.js`:

```js
const BASE_URL = 'http://127.0.0.1:5000';
```

To change the backend URL (e.g., for a deployed environment), update this value. You can also move it to a `.env` file using Vite's environment variable support:

```js
// src/services/products.js
const BASE_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:5000';
```

```env
# .env
VITE_API_URL=https://your-production-api.com
```

> Make sure CORS is enabled on the Flask backend if the frontend and backend are served from different origins.
