import { useEffect, useState } from "react";
import AdminLayout from "../components/AdminLayout";
import { adminApi } from "../../api/adminApi";
import { buildImageUrl } from "../../utils/imageHelper";
export default function Products() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    categoryId: "",
    stock: "",
    image: null
  });

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await adminApi.getAllProducts();
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await adminApi.getAllCategories();
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("name", formData.name);
    data.append("price", formData.price);
    data.append("description", formData.description);
    data.append("categoryId", formData.categoryId);
    data.append("stock", formData.stock);

    if (formData.image) {
      data.append("image", formData.image);
    }

    try {
      if (editingProduct) {
        await adminApi.updateProduct(editingProduct.id, data);
      } else {
        await adminApi.createProduct(data);
      }

      fetchProducts();
      resetForm();
    } catch (error) {
      console.error("Error saving product:", error);
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);

    setFormData({
      name: product.name,
      price: product.price,
      description: product.description,
      categoryId: product.categoryId,
      stock: product.stock,
      image: null
    });
  };

  const handleDelete = async (id) => {
    if (confirm("Are you sure?")) {
      try {
        await adminApi.deleteProduct(id);
        fetchProducts();
      } catch (error) {
        console.error("Error deleting product:", error);
      }
    }
  };

  const resetForm = () => {
    setEditingProduct(null);
    setFormData({
      name: "",
      price: "",
      description: "",
      categoryId: "",
      stock: "",
      image: null
    });
  };

  return (
    <AdminLayout>
      <h1 className="text-2xl font-bold mb-6">Products Management</h1>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow mb-6">
        <div className="grid grid-cols-2 gap-4">

          <input
            type="text"
            placeholder="Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="border p-2 rounded"
            required
          />

          <input
            type="number"
            placeholder="Price"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
            className="border p-2 rounded"
            required
          />

          <textarea
            placeholder="Description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="border p-2 rounded col-span-2"
          />

          <select
            value={formData.categoryId}
            onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
            className="border p-2 rounded"
          >
            <option value="">Select Category</option>

            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>

          <input
            type="number"
            placeholder="Stock"
            value={formData.stock}
            onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
            className="border p-2 rounded"
          />

          <input
            type="file"
            accept="image/*"
            onChange={(e) =>
              setFormData({ ...formData, image: e.target.files[0] })
            }
            className="border p-2 rounded"
          />

        </div>

        <button
          type="submit"
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
        >
          {editingProduct ? "Update" : "Create"} Product
        </button>

        {editingProduct && (
          <button
            type="button"
            onClick={resetForm}
            className="ml-2 bg-gray-500 text-white px-4 py-2 rounded"
          >
            Cancel
          </button>
        )}
      </form>

      <div className="bg-white shadow rounded-xl overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-4 text-left">Image</th>
              <th className="p-4 text-left">Name</th>
              <th className="p-4 text-left">Price</th>
              <th className="p-4 text-left">Stock</th>
              <th className="p-4 text-left">Category</th>
              <th className="p-4 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="border-t">

                <td className="p-4">
                  {product.imageUrl && (
                    <img
                      src={buildImageUrl(product.imageUrl)}
                      className="w-16 h-16 object-cover rounded"
                    />
                  )}
                </td>

                <td className="p-4">{product.name}</td>

                <td className="p-4">{product.price}đ</td>

                <td className="p-4">{product.stock}</td>

                <td className="p-4">
                  {product.category?.name || "N/A"}
                </td>

                <td className="p-4 space-x-2">
                  <button
                    onClick={() => handleEdit(product)}
                    className="text-blue-500"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(product.id)}
                    className="text-red-500"
                  >
                    Delete
                  </button>
                </td>

              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </AdminLayout>
  );
}