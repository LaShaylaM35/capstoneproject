# Front-End Project Plan

A React + Vite front end for the Products REST API (Flask / PostgreSQL).

---

## Tech Stack

| Layer      | Technology          |
|------------|---------------------|
| Framework  | React 18 (Vite)     |
| Styling    | Plain CSS (pink theme) |
| HTTP       | Fetch API           |
| Backend    | Flask on `http://127.0.0.1:5000` |

---

## Project Structure

```
src/
├── components/
│   ├── Navbar.jsx        ← shared navigation bar
│   └── ChatWidget.jsx    ← n8n chat bubble widget
├── pages/
│   └── ProductsPage.jsx  ← main product catalog page
├── services/
│   └── products.js       ← all API fetch logic
├── App.jsx               ← root component, wires everything together
├── App.css               ← global styles, pink theme, chat widget theme
├── index.css             ← base reset
└── main.jsx              ← React entry point
```

---

## Step-by-Step Execution

### Step 1 — Read the API Documentation
- Read `back-end-file.md` to understand the available endpoints, request/response shapes, and database schema.
- Identified four endpoints to consume:
  - `GET /products/`
  - `POST /products/`
  - `PUT /products/<id>`
  - `DELETE /products/<id>`

---

### Step 2 — Plan the Folder Structure
- Decided on three folders inside `src/`:
  - `components/` — reusable UI components shared across pages
  - `pages/` — full page-level components
  - `services/` — all fetch/API logic isolated from UI

---

### Step 3 — Create the Services Layer (`services/products.js`)
- Created `products.js` with four exported async functions:
  - `getProducts()` — fetches all products
  - `createProduct(product)` — posts a new product
  - `updateProduct(id, product)` — puts updated data for a product
  - `deleteProduct(id)` — deletes a product by ID
- All functions throw an error if the response is not OK, so the UI can catch and display it.

---

### Step 4 — Create the Navbar Component (`components/Navbar.jsx`)
- Simple nav bar displaying the app title "Product Catalog".
- Styled with a hot pink background and white text.

---

### Step 5 — Create the Products Page (`pages/ProductsPage.jsx`)
- Built a full CRUD page with the following state:
  - `products` — list fetched from the API
  - `form` — controlled inputs for name, price, quantity
  - `editingId` — tracks which product is being edited (null = add mode)
  - `error` — displays API error messages
  - `loading` — shows a loading message while fetching
- **Add Product** — form submits a POST request, then refreshes the list
- **Edit Product** — clicking Edit populates the form; submit sends a PUT request
- **Cancel** — resets the form back to add mode
- **Delete Product** — confirms with a dialog, then sends a DELETE request and refreshes the list
- Products are displayed in a table with ID, Name, Price, and Quantity columns.

---

### Step 6 — Wire Everything in App.jsx
- Replaced the default Vite boilerplate in `App.jsx`.
- Imported and rendered `Navbar` and `ProductsPage`.

---

### Step 7 — Apply the Pink Theme (`App.css`)
- Replaced the default Vite styles with a custom pink color palette:
  - Primary: `#e91e8c` (hot pink)
  - Background: `#fff0f5` (soft pink)
  - Borders/accents: `#f48fb1`, `#fce4ec`
  - Text: `#3b0a20` (dark pink/maroon)
- Styled components: Navbar, cards, form inputs, buttons (primary, secondary, edit, delete), table, and message states.

---

### Step 8 — Center the Form
- Updated `.product-form` in `App.css` to use `flex-direction: column`, `align-items: center`, and `margin: 0 auto` with a `max-width: 400px`.
- Set inputs to `width: 100%` to fill the centered container.
- Centered the form action buttons with `justify-content: center`.

---

### Step 9 — Center Page Content Horizontally
- Updated `.page` in `App.css` to include `align-items: center`.
- Added `.page .card { width: 100% }` so cards still stretch full width inside the centered layout.

---

### Step 10 — Document the Project (`front-end-plan.md`)
- Created `front-end-plan.md` in the project root.
- Documented the full plan including tech stack, folder structure, and a step-by-step breakdown of every change made during the build.

---

### Step 11 — Add n8n Chat Widget (`components/ChatWidget.jsx`)
- Created `ChatWidget.jsx` which dynamically imports the `@n8n/chat` bundle from jsDelivr CDN.
- Configured `createChat()` with the n8n webhook URL: `https://automations.pathway4.click/webhook/a03216de-13ac-4dd2-9841-ac7c3e510625/chat`
- Set mode to `window` with a welcome screen and default English messages.
- Added the `@n8n/chat` stylesheet link to `index.html`.
- Registered `<ChatWidget />` in `App.jsx` so the bubble appears on every page.

---

### Step 12 — Apply Pink Theme to Chat Widget
- Added CSS variable overrides in `App.css` under `:root` to theme the n8n chat widget:
  - Toggle bubble: hot pink `#e91e8c`
  - Header background: hot pink, text: dark pink `#3b0a20`
  - Bot messages: soft pink background, dark pink text
  - User messages: light pink `#f48fb1` background
  - Input field: soft pink background with pink border and send button

---

### Step 13 — Remove White Text from Chat Widget
- Replaced all `#ffffff` (white) text colors in the chat CSS variables with dark pink `#3b0a20`.
- Changed user message background from hot pink to lighter `#f48fb1` to maintain readability without white text.
- Updated send button icon color and toggle icon color to dark pink.

---

### Step 14 — Light Purple User Message Text
- Updated `--chat--message--user--color` to light purple `#c084fc` for user messages in the chat widget.

---

## CORS Note

Since the Vite dev server runs on `http://localhost:5173` and the Flask API runs on `http://127.0.0.1:5000`, the browser will block requests unless Flask has CORS enabled.

**Fix on the backend:**

```bash
pip install flask-cors
```

```python
# app.py
from flask_cors import CORS
CORS(app)
```

---

## Running the Project

```bash
# Start the React front end
npm run dev

# Start the Flask back end (in the backend folder)
python app.py
```
