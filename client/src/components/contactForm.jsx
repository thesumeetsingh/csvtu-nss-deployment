import { useState } from 'react';
import axios from 'axios';

function ContactForm() {
  const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://csvtu-nss-deployment.onrender.com/api';
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [response, setResponse] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_BASE_URL}/feedback/send`, form);
      setResponse(res.data.message);
      setForm({ name: '', email: '', message: '' });
    } catch (err) {
      setResponse('Failed to send enquiry.');
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Send Enquiry</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Your Name"
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Your Email"
          className="w-full border p-2 rounded"
          required
        />
        <textarea
          name="message"
          value={form.message}
          onChange={handleChange}
          placeholder="Your Message"
          className="w-full border p-2 rounded"
          rows="5"
          required
        ></textarea>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Submit
        </button>
      </form>
      {response && <p className="mt-4 text-green-600">{response}</p>}
    </div>
  );
}

export default ContactForm;
