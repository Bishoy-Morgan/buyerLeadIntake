'use client'

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { buyerSchema } from "@/lib/validation/buyer"
import { z } from "zod"

// Infer form type from Zod schema
type BuyerForm = z.infer<typeof buyerSchema>

export default function AddBuyerForm({ onSuccess }: { onSuccess: () => void }) {
  const { register, handleSubmit, watch, formState: { errors, isSubmitting } } = useForm<BuyerForm>({
    resolver: zodResolver(buyerSchema),
  })

  const propertyType = watch("propertyType")

  const onSubmit = async (data: BuyerForm) => {
    console.log("✅ Form submit triggered")
    console.log("Form data before processing:", data)

    if (!["Apartment", "Villa"].includes(data.propertyType)) {
      delete data.bhk
      console.log("BHK removed because propertyType is not Apartment/Villa")
    }

    try {
      console.log("Sending POST request to /api/buyers...")
      const res = await fetch("/api/buyers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      console.log("Response received:", res)

      if (res.ok) {
        const resData = await res.json()
        console.log("✅ Buyer added successfully:", resData)
        onSuccess()
      } else {
        const errData = await res.json()
        console.error("❌ Failed to add buyer:", errData)
        alert("Failed to add buyer: " + errData.error)
      }
    } catch (err) {
      console.error("🚨 Network or server error:", err)
      alert("Network or server error: see console")
    }
  }

  // Debug function to test if form validation is working
  const handleFormSubmit = (e: React.FormEvent) => {
    console.log("🔍 Form submission event triggered")
    console.log("🔍 Form errors:", errors)
    console.log("🔍 Form is submitting:", isSubmitting)
    
    // Let react-hook-form handle the rest
    handleSubmit(onSubmit)(e)
  }

  return (
    <div className="w-1/2">
      <form onSubmit={handleFormSubmit} className="space-y-4 mb-6 border p-4 rounded">
        {/* Full Name */}
        <div>
          <label className="block">Full Name</label>
          <input {...register("fullName")} className="border p-2 w-full" />
          {errors.fullName && <p className="text-red-600">{errors.fullName.message}</p>}
        </div>

        {/* Email */}
        <div>
          <label className="block">Email</label>
          <input type="email" {...register("email")} className="border p-2 w-full" />
          {errors.email && <p className="text-red-600">{errors.email.message}</p>}
        </div>

        {/* Phone */}
        <div>
          <label className="block">Phone</label>
          <input {...register("phone")} className="border p-2 w-full" />
          {errors.phone && <p className="text-red-600">{errors.phone.message}</p>}
        </div>

        {/* City */}
        <div>
          <label className="block">City</label>
          <select {...register("city")} className="border p-2 w-full">
            <option value="">Select City</option>
            <option value="Chandigarh">Chandigarh</option>
            <option value="Mohali">Mohali</option>
            <option value="Zirakpur">Zirakpur</option>
            <option value="Panchkula">Panchkula</option>
            <option value="Other">Other</option>
          </select>
          {errors.city && <p className="text-red-600">{errors.city.message}</p>}
        </div>

        {/* Property Type */}
        <div>
          <label className="block">Property Type</label>
          <select {...register("propertyType")} className="border p-2 w-full">
            <option value="">Select Property Type</option>
            <option value="Apartment">Apartment</option>
            <option value="Villa">Villa</option>
            <option value="Plot">Plot</option>
            <option value="Office">Office</option>
            <option value="Retail">Retail</option>
          </select>
          {errors.propertyType && <p className="text-red-600">{errors.propertyType.message}</p>}
        </div>

        {/* BHK (conditional) */}
        {["Apartment", "Villa"].includes(propertyType) && (
          <div>
            <label className="block">BHK</label>
            <select {...register("bhk")} className="border p-2 w-full">
              <option value="">Select BHK</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="Studio">Studio</option>
            </select>
            {errors.bhk && <p className="text-red-600">{errors.bhk.message}</p>}
          </div>
        )}

        {/* Purpose */}
        <div>
          <label className="block">Purpose</label>
          <select {...register("purpose")} className="border p-2 w-full">
            <option value="">Select Purpose</option>
            <option value="Buy">Buy</option>
            <option value="Rent">Rent</option>
          </select>
          {errors.purpose && <p className="text-red-600">{errors.purpose.message}</p>}
        </div>

        {/* Budget Min */}
        <div>
          <label className="block">Budget Min</label>
          <input type="number" {...register("budgetMin", { valueAsNumber: true })} className="border p-2 w-full" />
          {errors.budgetMin && <p className="text-red-600">{errors.budgetMin.message}</p>}
        </div>

        {/* Budget Max */}
        <div>
          <label className="block">Budget Max</label>
          <input type="number" {...register("budgetMax", { valueAsNumber: true })} className="border p-2 w-full" />
          {errors.budgetMax && <p className="text-red-600">{errors.budgetMax.message}</p>}
        </div>

        {/* Timeline */}
        <div>
          <label className="block">Timeline</label>
          <select {...register("timeline")} className="border p-2 w-full">
            <option value="">Select Timeline</option>
            <option value="0-3m">0-3m</option>
            <option value="3-6m">3-6m</option>
            <option value=">6m">&gt;6m</option>
            <option value="Exploring">Exploring</option>
          </select>
          {errors.timeline && <p className="text-red-600">{errors.timeline.message}</p>}
        </div>

        {/* Source */}
        <div>
          <label className="block">Source</label>
          <select {...register("source")} className="border p-2 w-full">
            <option value="">Select Source</option>
            <option value="Website">Website</option>
            <option value="Referral">Referral</option>
            <option value="Walk-in">Walk-in</option>
            <option value="Call">Call</option>
            <option value="Other">Other</option>
          </select>
          {errors.source && <p className="text-red-600">{errors.source.message}</p>}
        </div>

        {/* Notes */}
        <div>
          <label className="block">Notes</label>
          <textarea {...register("notes")} className="border p-2 w-full" maxLength={1000}></textarea>
          {errors.notes && <p className="text-red-600">{errors.notes.message}</p>}
        </div>

        {/* Tags */}
        <div>
          <label className="block">Tags (comma separated)</label>
          <input
            {...register("tags", { setValueAs: v => (v ? (v as string).split(",").map(s => s.trim()) : []) })}
            className="border p-2 w-full"
          />
          {errors.tags && <p className="text-red-600">{errors.tags.message}</p>}
        </div>

        <button 
          type="submit" 
          disabled={isSubmitting}
          className="bg-blue-600 text-white px-4 py-2 rounded cursor-pointer disabled:opacity-50"
        >
          {isSubmitting ? 'Adding Buyer...' : 'Add Buyer'}
        </button>
      </form>
      
      {/* Debug Panel */}
      <div className="mt-4 p-4 bg-gray-100 rounded">
        <h3 className="font-bold">Debug Info:</h3>
        <p>Form Errors: {Object.keys(errors).length > 0 ? JSON.stringify(errors, null, 2) : 'None'}</p>
        <p>Is Submitting: {isSubmitting ? 'Yes' : 'No'}</p>
        <p>Property Type: {propertyType || 'Not selected'}</p>
      </div>
    </div>
  )
}