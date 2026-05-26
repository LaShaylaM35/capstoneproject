import { useEffect, useState } from 'react';
import { getProducts, createProduct, updateProduct, deleteProduct } from '../services/products';

const emptyForm = { name: '', price: '', quantity: '' };

function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      name: form.name,
      price: parseFloat(form.price),
      quantity: parseInt(form.quantity),
    };
    try {
      if (editingId !== null) {
        await updateProduct(editingId, payload);
      } else {
        await createProduct(payload);
      }
      setForm(emptyForm);
      setEditingId(null);
      fetchProducts();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEdit = (product) => {
    setEditingId(product.product_id);
    setForm({
      name: product.name,
      price: product.price,
      quantity: product.quantity,
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this product?')) return;
    try {
      await deleteProduct(id);
      fetchProducts();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleCancel = () => {
    setForm(emptyForm);
    setEditingId(null);
  };

  return (
    <div className="page">
      {/* Form */}
      <div className="card">
        <h2 className="card-title">{editingId !== null ? 'Edit Product' : 'Add Product'}</h2>
        {error && <p className="error-msg">{error}</p>}
        <form onSubmit={handleSubmit} className="product-form">
          <input
            className="input"
            type="text"
            name="name"
            placeholder="Product name"
            value={form.name}
            onChange={handleChange}
            required
          />
          <input
            className="input"
            type="number"
            name="price"
            placeholder="Price"
            value={form.price}
            onChange={handleChange}
            min="0"
            step="0.01"
            required
          />
          <input
            className="input"
            type="number"
            name="quantity"
            placeholder="Quantity"
            value={form.quantity}
            onChange={handleChange}
            min="0"
            required
          />
          <div className="form-actions">
            <button className="btn btn-primary" type="submit">
              {editingId !== null ? 'Update' : 'Add'}
            </button>
            {editingId !== null && (
              <button className="btn btn-secondary" type="button" onClick={handleCancel}>
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Table */}
      <div className="card">
        <h2 className="card-title">All Products</h2>
        {loading ? (
          <p className="loading-msg">Loading...</p>
        ) : products.length === 0 ? (
          <p className="empty-msg">No products found.</p>
        ) : (
          <table className="product-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p.product_id}>
                  <td>{p.product_id}</td>
                  <td>{p.name}</td>
                  <td>${parseFloat(p.price).toFixed(2)}</td>
                  <td>{p.quantity}</td>
                  <td>
                    <button className="btn btn-edit" onClick={() => handleEdit(p)}>Edit</button>
                    <button className="btn btn-delete" onClick={() => handleDelete(p.product_id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default ProductsPage;
