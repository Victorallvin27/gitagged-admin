'use client';

import { useEffect, useState } from 'react';
import {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from '@/lib/categories';

export default function CategoriesPage() {
  const [categories, setCategories] = useState<any[]>([]);
  const [name, setName] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    const res = await getCategories();
    setCategories(res.data);
  };

  const [form, setForm] = useState({
    name: '',
    parentId: '' as string | '',
  });

  const save = async () => {
    if (!form.name.trim()) return;

    const payload = {
      name: form.name,
      parentId: form.parentId || null,
    };

    if (editingId) {
      await updateCategory(editingId, payload);
    } else {
      await createCategory(payload);
    }

    reset();
    loadCategories();
  };

  const reset = () => {
    setEditingId(null);
    setForm({ name: '', parentId: '' });
  };

  const edit = (cat: any) => {
    setEditingId(cat._id);
    setForm({
      name: cat.name,
      parentId: cat.parentId || '',
    });
  };

  const remove = async (id: string) => {
    if (!confirm('Delete category?')) return;
    await deleteCategory(id);
    loadCategories();
  };

  return (
    <div className="bg-white border rounded-xl p-6 mb-8">
      <h1 className="text-2xl font-bold mb-6">Categories</h1>

      {/* FORM */}
        <div className="grid grid-cols-2 gap-4 items-center">
          {/* Name */}
          <label className="font-medium">Category Name</label>
          <input
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="border rounded-lg px-4 py-2"
          />

          {/* Parent */}
          <label className="font-medium">Parent Category</label>
          <select
            value={form.parentId}
            onChange={(e) =>
              setForm({ ...form, parentId: e.target.value })
            }
            className="border rounded-lg px-4 py-2"
          >
            <option value="">None (Top Level)</option>
            {categories.map((c) => (
              <option key={c._id} value={c._id}>
                {c.name}
              </option>
            ))}
          </select>

          <div></div>
          <button
            onClick={save}
            className="bg-indigo-600 text-white px-6 py-2 rounded-lg"
          >
            {editingId ? 'Update Category' : 'Add Category'}
          </button>
        </div>

        <br></br>

      {/* LIST */}
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">Sub Category</th>
            <th className="border p-2">Category</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((c) => (
            <tr key={c._id}>
              <td className="border p-2 text-center">{c.name}</td>
              <td className="border p-2 text-center">
                {categories.find((x) => x._id === c.parentId)?.name || '-'}
              </td>
              <td className="border p-2 text-center">
                <button
                  onClick={() => edit(c)}
                  className="text-blue-600 mr-3"
                >
                  Edit
                </button>
                <button
                  onClick={() => remove(c._id)}
                  className="text-red-600"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
