const BASE_URL = 'http://127.0.0.1:5000';

// GET /products/
export async function getProducts() {
  const response = await fetch(`${BASE_URL}/products/`);
  if (!response.ok) throw new Error('Failed to fetch products');
  return response.json();
}

// POST /products/
export async function createProduct(product) {
  const response = await fetch(`${BASE_URL}/products/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(product),
  });
  if (!response.ok) throw new Error('Failed to create product');
  return response.json();
}

// PUT /products/<id>
export async function updateProduct(id, product) {
  const response = await fetch(`${BASE_URL}/products/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(product),
  });
  if (!response.ok) throw new Error('Failed to update product');
  return response.json();
}

// DELETE /products/<id>
export async function deleteProduct(id) {
  const response = await fetch(`${BASE_URL}/products/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) throw new Error('Failed to delete product');
  return response.json();
}
