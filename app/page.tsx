'use client'
import { useState } from 'react'

//  Define the response type from the API
type PriceSuggestionResponse = {
  priceRange: {
    min: number
    max: number
  }
  confidence: number
  reason: string
}

export default function Home() {
  const [priceData, setPriceData] = useState<PriceSuggestionResponse | null>(null)

  const [form, setForm] = useState({
    brand: '',
    condition: '',
    category: '',
    originalPrice: '',
    rarity: '',
    material: ''
  })

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async () => {
    const res = await fetch('/api/price-suggestion', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    })

    const data: PriceSuggestionResponse = await res.json()
    setPriceData(data)
  }

  return (
    <div className="p-8 max-w-3xl mx-auto bg-white bg-opacity-90 shadow-2xl rounded-3xl mt-10">
      <h1 className="text-4xl font-extrabold mb-6 text-center text-pink-600">Trendies Price Suggestion</h1>
      <div className="grid grid-cols-2 gap-6 text-gray-800">
        <select name="brand" className="p-3 border-2 border-pink-300 rounded-lg shadow-sm" onChange={handleChange}>
          <option value="">Select Brand</option>
          <option value="Zara">Zara</option>
          <option value="H&M">H&M</option>
          <option value="Coach">Coach</option>
          <option value="Gucci">Gucci</option>
          <option value="Louis Vuitton">Louis Vuitton</option>
        </select>
        <select name="condition" className="p-3 border-2 border-yellow-300 rounded-lg shadow-sm" onChange={handleChange}>
          <option value="">Select Condition</option>
          <option value="new">New</option>
          <option value="like new">Like New</option>
          <option value="used">Used</option>
          <option value="heavily used">Heavily Used</option>
        </select>
        <select name="category" className="p-3 border-2 border-green-300 rounded-lg shadow-sm" onChange={handleChange}>
          <option value="">Select Category</option>
          <option value="bag">Bag</option>
          <option value="shoes">Shoes</option>
          <option value="watch">Watch</option>
          <option value="clothing">Clothing</option>
        </select>
        <select name="rarity" className="p-3 border-2 border-indigo-300 rounded-lg shadow-sm" onChange={handleChange}>
          <option value="">Select Rarity</option>
          <option value="common">Common</option>
          <option value="rare">Rare</option>
          <option value="limited">Limited Edition</option>
        </select>
        <select name="material" className="p-3 border-2 border-red-300 rounded-lg shadow-sm" onChange={handleChange}>
          <option value="">Select Material</option>
          <option value="leather">Leather</option>
          <option value="synthetic">Synthetic</option>
          <option value="cotton">Cotton</option>
        </select>
        <input
          name="originalPrice"
          type="number"
          placeholder="Original Price"
          className="p-3 border-2 border-blue-300 rounded-lg shadow-sm"
          onChange={handleChange}
        />
      </div>
      <button
        onClick={handleSubmit}
        className="mt-8 w-full bg-gradient-to-r from-pink-500 to-indigo-500 text-white p-3 rounded-full font-bold hover:scale-105 transition transform duration-200 shadow-md"
      >
        Predict My Price
      </button>

      {priceData && (
        <div className="mt-8 p-6 bg-white bg-opacity-80 border-2 border-indigo-400 rounded-xl text-center shadow-lg">
          <p className="text-xl font-semibold text-indigo-700">Suggested Price Range</p>
          <p className="text-3xl text-green-600 my-2">
            ${priceData.priceRange.min} – ${priceData.priceRange.max}
          </p>
          <p className="text-sm text-gray-600">
            Confidence Level: <span className="font-bold text-indigo-800">{priceData.confidence}%</span>
          </p>
          <p className="text-xs italic text-gray-500 mt-2">{priceData.reason}</p>
        </div>
      )}
    </div>
  )
}
