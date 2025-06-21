import { useEffect, useState } from "react";
import axios from "../axiosInstance";

export default function ProductForm() {
  const [form, setForm] = useState({
    name: "",
    price: "",
    originalPrice: "",
    description: "",
    category: "",
    isNew: false,
  });

  const [images, setImages] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");

  // Load all products
  const fetchProducts = async () => {
    const res = await axios.get("/products");
    setProducts(res.data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleFileChange = (e) => {
    const newFiles = Array.from(e.target.files);
    const combinedFiles = [...images, ...newFiles].slice(0, 6);
    setImages(combinedFiles);
    const previewUrls = combinedFiles.map((file) => URL.createObjectURL(file));
    setPreviews(previewUrls);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.price || !form.originalPrice) {
      alert("Fill all required fields");
      return;
    }

    const data = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      data.append(key, value);
    });
    images.forEach((img) => data.append("images", img));

    try {
      setUploading(true);
      if (selectedId) {
        await axios.put(`/products/${selectedId}`, form);
        setMessage("Product updated successfully!");
      } else {
        await axios.post("/products", data, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        setMessage("Product created successfully!");
      }
      resetForm();
      fetchProducts();
    } catch (err) {
      console.error(err);
      alert("Error occurred");
    } finally {
      setUploading(false);
    }
  };

  const handleEdit = (product) => {
    setForm({
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice,
      description: product.description || "",
      category: product.category || "",
      isNew: product.isNew || false,
    });
    setSelectedId(product._id);
    setPreviews(product.images || []);
    setImages([]);
  };

  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this product?")) {
      await axios.delete(`/products/${id}`);
      fetchProducts();
      resetForm();
    }
  };

  const resetForm = () => {
    setForm({
      name: "",
      price: "",
      originalPrice: "",
      description: "",
      category: "",
      isNew: false,
    });
    setImages([]);
    setPreviews([]);
    setSelectedId(null);
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-4">Admin Product Manager</h2>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Form Section */}
        <div className="space-y-4">
          <input name="name" placeholder="Name *" value={form.name} onChange={handleChange} required className="w-full border px-3 py-2 rounded" />
          <input name="price" type="number" placeholder="Price *" value={form.price} onChange={handleChange} required className="w-full border px-3 py-2 rounded" />
          <input name="originalPrice" type="number" placeholder="Original Price *" value={form.originalPrice} onChange={handleChange} required className="w-full border px-3 py-2 rounded" />
          <input name="category" placeholder="Category" value={form.category} onChange={handleChange} className="w-full border px-3 py-2 rounded" />
          <textarea name="description" placeholder="Description" value={form.description} onChange={handleChange} className="w-full border px-3 py-2 rounded" />
          <label className="flex items-center gap-2">
            <input type="checkbox" name="isNew" checked={form.isNew} onChange={handleChange} />
            Mark as New
          </label>
          <input type="file" multiple accept="image/*" onChange={handleFileChange} />
          <button type="submit" disabled={uploading} className="bg-black text-white px-6 py-2 rounded">
            {uploading ? "Saving..." : selectedId ? "Update Product" : "Add Product"}
          </button>
          {message && <p className="text-green-600">{message}</p>}
        </div>

        {/* Right Preview Section */}
        <div>
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
            {previews.map((src, i) => (
              <img key={i} src={typeof src === "string" ? src : URL.createObjectURL(src)} className="w-full h-24 object-cover rounded border" />
            ))}
          </div>
        </div>
      </form>

      {/* Product List */}
      <div className="mt-10">
        <h3 className="text-lg font-semibold mb-4">Existing Products</h3>
        <div className="overflow-auto">
          <table className="min-w-full table-auto border">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Price</th>
                <th className="px-4 py-2">Category</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((prod) => (
                <tr key={prod._id} className="border-t">
                  <td className="px-4 py-2">{prod.name}</td>
                  <td className="px-4 py-2">${prod.price}</td>
                  <td className="px-4 py-2">{prod.category}</td>
                  <td className="px-4 py-2 space-x-2">
                    <button onClick={() => handleEdit(prod)} className="text-blue-600 hover:underline">Edit</button>
                    <button onClick={() => handleDelete(prod._id)} className="text-red-600 hover:underline">Delete</button>
                  </td>
                </tr>
              ))}
              {products.length === 0 && (
                <tr>
                  <td colSpan="4" className="text-center py-4 text-gray-500">No products found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
