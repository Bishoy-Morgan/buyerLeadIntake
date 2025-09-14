'use client'

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Buyer } from "@/types/buyer"
import { BuyerHistory } from "@/types/buyerHistory"
import { buyerSchema } from "@/lib/validation/buyer"
import { ZodError } from "zod"

export default function BuyerPage() {
  const { id } = useParams()
  const router = useRouter()
  const [buyer, setBuyer] = useState<Buyer | null>(null)
  const [loading, setLoading] = useState(true)
  const [history, setHistory] = useState<BuyerHistory[]>([])
  const [formData, setFormData] = useState<Partial<Buyer>>({})
  const [error, setError] = useState("")

  // Fetch buyer and last 5 history entries
  const fetchBuyer = async () => {
    setLoading(true)
    try {
      const res = await fetch(`/api/buyers/${id}`)
      if (!res.ok) throw new Error("Failed to fetch buyer")
      const data = await res.json()
      setBuyer(data.buyer)
      setHistory(data.history || [])
      setFormData(data.buyer)
    } catch (err) {
      console.error(err)
      setError("Failed to fetch buyer")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (id) fetchBuyer()
  }, [id])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault()
  setError("")

  try {
    // Validate formData with Zod
    buyerSchema.parse(formData)

    const res = await fetch(`/api/buyers/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })

    if (res.status === 409) {
      setError("Record changed, please refresh")
      return
    }

    if (!res.ok) throw new Error("Failed to update buyer")

    // Success, refresh page
    fetchBuyer()
    alert("Buyer updated successfully")
  } catch (err: unknown) {
    if (err instanceof ZodError) {
      // use 'issues' instead of 'errors'
      setError(err.issues.map(issue => issue.message).join(", "))
    } else if (err instanceof Error) {
      setError(err.message)
    } else {
      setError("An unknown error occurred")
    }
  }
}


  if (loading) return <p>Loading...</p>
  if (!buyer) return <p>{error || "Buyer not found"}</p>

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Edit Buyer: {buyer.fullName}</h1>
      {error && <p className="text-red-600 mb-2">{error}</p>}

      {/* Edit Form */}
      <form onSubmit={handleSubmit} className="space-y-4 mb-6">
        <input
          name="fullName"
          value={formData.fullName || ""}
          onChange={handleChange}
          placeholder="Full Name"
          className="border p-2 w-full"
        />
        <input
          name="phone"
          value={formData.phone || ""}
          onChange={handleChange}
          placeholder="Phone"
          className="border p-2 w-full"
        />
        <input
          name="email"
          value={formData.email || ""}
          onChange={handleChange}
          placeholder="Email"
          className="border p-2 w-full"
        />
        <select name="city" value={formData.city || ""} onChange={handleChange} className="border p-2 w-full">
          <option value="">Select City</option>
          {["Chandigarh", "Mohali", "Zirakpur", "Panchkula", "Other"].map(c => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
        <textarea
          name="notes"
          value={formData.notes || ""}
          onChange={handleChange}
          placeholder="Notes"
          className="border p-2 w-full"
        />
        <input type="hidden" name="updatedAt" value={formData.updatedAt?.toString()} />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Save</button>
      </form>

      {/* History Section */}
      <div>
        <h2 className="text-xl font-semibold mb-2">Last 5 Changes</h2>
        {history.length === 0 ? (
          <p>No history available.</p>
        ) : (
          <ul className="space-y-1">
            {history.map((h, idx) => (
              <li key={idx} className="border p-2 bg-gray-50">
                <p><strong>Changed By:</strong> {h.changedBy}</p>
                <p><strong>Changed At:</strong> {new Date(h.changedAt).toLocaleString()}</p>
                <pre className="bg-gray-100 p-2 overflow-x-auto">{JSON.stringify(h.diff, null, 2)}</pre>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
