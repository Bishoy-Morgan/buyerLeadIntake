'use client'

import { useEffect, useState } from "react"
import AddBuyerForm from "./components/AddBuyerForm"
import { Buyer } from "@/types/buyer"

export default function BuyersPage() {
  const [buyers, setBuyers] = useState<Buyer[]>([])
  const [loading, setLoading] = useState(true)

  // Fetch buyers from API
  const fetchBuyers = async () => {
    setLoading(true)
    try {
      const res = await fetch("/api/buyers")
      if (!res.ok) throw new Error("Failed to fetch buyers")
      const data = await res.json()
      setBuyers(data)
    } catch (err) {
      console.error(err)
      alert("Failed to fetch buyers")
    } finally {
      setLoading(false)
    }
  }

  // useEffect(() => {
  //   fetchBuyers()
  // }, [])

  return (
    <div className="flex flex-col items-center pt-32">

      {/* Add Buyer Form */}
      <div className="w-4/5 flex items-start justify-between gap-x-6 ">
        <h2 className="w-1/2 ">
          Capture New Buyer Details and Manage Existing Leads
        </h2>
        <div className="w-2/5">
          <AddBuyerForm onSuccess={fetchBuyers} />
        </div>
      </div>

      {/* Buyers Table */}
      {loading ? (
        <p>Loading...</p>
      ) : buyers.length === 0 ? (
        <p>No buyers found.</p>
      ) : (
        <table className="w-full border-collapse border border-gray-300 mt-4">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">Name</th>
              <th className="border p-2">Phone</th>
              <th className="border p-2">City</th>
              <th className="border p-2">Property Type</th>
              <th className="border p-2">Budget</th>
              <th className="border p-2">Timeline</th>
              <th className="border p-2">Status</th>
              <th className="border p-2">Updated At</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {buyers.map((buyer) => (
              <tr key={buyer.id} className="hover:bg-gray-50">
                <td className="border p-2">{buyer.fullName}</td>
                <td className="border p-2">{buyer.phone}</td>
                <td className="border p-2">{buyer.city}</td>
                <td className="border p-2">{buyer.propertyType}</td>
                <td className="border p-2">
                  {buyer.budgetMin ? `₹${buyer.budgetMin.toLocaleString()}` : "-"}{" "}
                  - {buyer.budgetMax ? `₹${buyer.budgetMax.toLocaleString()}` : "-"}
                </td>
                <td className="border p-2">{buyer.timeline}</td>
                <td className="border p-2">{buyer.status}</td>
                <td className="border p-2">{new Date(buyer.updatedAt).toLocaleString()}</td>
                <td className="border p-2">
                  <button className="text-blue-600 mr-2">View</button>
                  <button className="text-green-600">Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}
