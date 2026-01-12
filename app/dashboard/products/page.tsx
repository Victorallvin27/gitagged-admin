'use client';

import { useEffect, useState } from 'react';
import { getProducts, createProduct, updateProduct, deleteProduct } from '@/lib/products';
import { getCategories } from '@/lib/categories';
import { getRegions } from '@/lib/gi-regions';

export default function ProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [regions, setRegions] = useState<any[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showCategories, setShowCategories] = useState(false);
  const [showRegions, setShowRegions] = useState(false);


  const [form, setForm] = useState({
    title: '',
    price: '',
    stock: '',
    categories: [] as string[],
    giRegions: [] as string[],
    status: 'active',
  });

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const [p, c, r] = await Promise.all([
      getProducts(),
      getCategories(),
      getRegions(),
    ]);
    setProducts(p.data);
    setCategories(c.data);
    setRegions(r.data);
  };

  const save = async () => {
    if (!form.title || !form.price) return;

    const payload = {
      ...form,
      slug: form.title.toLowerCase().replace(/\s+/g, '-'),
      price: Number(form.price),
      stock: Number(form.stock),
    };

    if (editingId) {
      await updateProduct(editingId, payload);
    } else {
      await createProduct(payload);
    }

    reset();
    load();
  };

  const reset = () => {
    setEditingId(null);
    setForm({
      title: '',
      price: '',
      stock: '',
      categories: [],
      giRegions: [],
      status: 'active',
    });
  };

  const edit = (p: any) => {
    setEditingId(p._id);
    setForm({
      title: p.title,
      price: p.price,
      stock: p.stock,
      categories: p.categories || [],
      giRegions: p.giRegions || [],
      status: p.status,
    });
  };

  const remove = async (id: string) => {
    if (!confirm('Delete product?')) return;
    await deleteProduct(id);
    load();
  };

  return (
    <div className="p-6 max-w-6xl center mx-auto">
      <h1 className="text-2xl font-bold mb-4">Products</h1>

      {/* Product Form */}
      <div className="border p-4 rounded mb-6 space-y-3">

        <div className="grid grid-cols-2 gap-2">
          <label htmlFor="product-title" className="w-32 font-medium">Product Title</label>
          <input
            id='product-title'
            value={form.title}
            onChange={e => setForm({ ...form, title: e.target.value })}
            className="border p-2 rounded"
          />
          <label htmlFor='product-price'>Price</label>
          <input
            id='product-price'
            type="number"
            value={form.price}
            onChange={e => setForm({ ...form, price: e.target.value })}
            className="border p-2 rounded"
          />
          <label htmlFor='product-stock'>Stock</label>
          <input
            id='product-stock'
            type="number"
            value={form.stock}
            onChange={e => setForm({ ...form, stock: e.target.value })}
            className="border p-2 rounded"
          />
        </div>

        {/* Categories */}
        <div className="grid grid-cols-2 gap-4 items-center">
          <label className="font-medium">Categories</label>

          <div className="relative">
            <div
              onClick={() => setShowCategories(!showCategories)}
              className="border rounded px-3 py-2 cursor-pointer flex justify-between bg-white"
            >
              <span className="text-gray-600">
                {form.categories.length
                  ? `${form.categories.length} selected`
                  : 'Select Categories'}
              </span>
              <span>▾</span>
            </div>

            {showCategories && (
              <div className="absolute z-10 w-full bg-white border rounded shadow max-h-48 overflow-y-auto mt-1">
                {categories.map((c) => (
                  <label
                    key={c._id}
                    className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={form.categories.includes(c._id)}
                      onChange={() =>
                        setForm({
                          ...form,
                          categories: form.categories.includes(c._id)
                            ? form.categories.filter(id => id !== c._id)
                            : [...form.categories, c._id],
                        })
                      }
                    />
                    {c.name}
                  </label>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* GI Regions */}
        <div className="grid grid-cols-2 gap-4 items-center">
          <label className="font-medium">GI Regions</label>

          <div className="relative">
            <div
              onClick={() => setShowRegions(!showRegions)}
              className="border rounded px-3 py-2 cursor-pointer flex justify-between bg-white"
            >
              <span className="text-gray-600">
                {form.giRegions.length
                  ? `${form.giRegions.length} selected`
                  : 'Select GI Regions'}
              </span>
              <span>▾</span>
            </div>

            {showRegions && (
              <div className="absolute z-10 w-full bg-white border rounded shadow max-h-48 overflow-y-auto mt-1">
                {regions.map((r) => (
                  <label
                    key={r._id}
                    className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={form.giRegions.includes(r._id)}
                      onChange={() =>
                        setForm({
                          ...form,
                          giRegions: form.giRegions.includes(r._id)
                            ? form.giRegions.filter(id => id !== r._id)
                            : [...form.giRegions, r._id],
                        })
                      }
                    />
                    {r.name}
                  </label>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 items-center">
          <div></div>

          <button
            onClick={save}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg w-full"
          >
            {editingId ? 'Update Product' : 'Add Product'}
          </button>
        </div>


        {/* Product List */}
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">Title</th>
              <th className="border p-2">Price</th>
              <th className="border p-2">Stock</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map(p => (
              <tr key={p._id}>
                <td className="border p-2 text-center">{p.title}</td>
                <td className="border p-2 text-center">₹{p.price}</td>
                <td className="border p-2 text-center">{p.stock}</td>
                <td className="border p-2 text-center">
                  <button onClick={() => edit(p)} className="text-blue-600 mr-3">
                    Edit
                  </button>
                  <button onClick={() => remove(p._id)} className="text-red-600">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
