'use client'

import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { buyerSchema } from "@/lib/validation/buyer"
import { z } from "zod"
import CustomDropdown from "@/app/buyers/components/ui/CustomDropdown"
import FormField from "@/app/buyers/components/ui/FormField"
import {
  cityOptions,
  propertyTypeOptions,
  bhkOptions,
  purposeOptions,
  timelineOptions,
  sourceOptions,
  statusOptions
} from "@/types/dropdownOptions"

// Infer form type from Zod schema
type BuyerForm = z.infer<typeof buyerSchema>

export default function AddBuyerForm({ onSuccess }: { onSuccess: () => void }) {
  const { register, handleSubmit, watch, control, formState: { errors, isSubmitting } } = useForm<BuyerForm>({
    resolver: zodResolver(buyerSchema),
  })

  const propertyType = watch("propertyType")

  const onSubmit = async (data: BuyerForm) => {
    // Set default status if not provided
    const formData = {
      ...data,
      status: data.status || "New"
    }

    // Remove BHK field for non-residential properties
    if (!["Apartment", "Villa"].includes(formData.propertyType)) {
      delete formData.bhk
    }

    try {
      const res = await fetch("/api/buyers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (res.ok) {
        onSuccess()
      } else {
        const contentType = res.headers.get('content-type')
        if (contentType && contentType.includes('application/json')) {
          const errData = await res.json()
          alert("Failed to add buyer: " + (errData.error || 'Unknown error'))
        } else {
          alert("Server error occurred. Please try again.")
        }
      }
    } catch (error) {
      alert("Network error. Please check your connection and try again.")
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 mb-6 shadow-black shadow-2xl p-8 rounded-2xl bg-[#0F2027] backdrop-blur-sm">
        <h4 className="text-2xl font-bold mb-4 text-center py-4">
          Add new buyer details
        </h4>
        
        <FormField label="Full Name" error={errors.fullName?.message}>
          <input 
            {...register("fullName")}
            placeholder="Enter full name"
            className="form-input"
          />
        </FormField>

        <FormField label="Email (Optional)" error={errors.email?.message}>
          <input 
            type="email" 
            {...register("email")} 
            placeholder="Enter email (optional)"
            className="form-input"
          />
        </FormField>

        <FormField label="Phone" error={errors.phone?.message}>
          <input 
            placeholder="Enter phone number" 
            {...register("phone")}
            className="form-input"
          />
        </FormField>

        <FormField label="City" error={errors.city?.message}>
          <Controller
            name="city"
            control={control}
            render={({ field }) => (
              <CustomDropdown
                options={cityOptions}
                value={field.value || ""}
                onChange={field.onChange}
                placeholder="Select City"
                error={errors.city?.message}
              />
            )}
          />
        </FormField>

        <FormField label="Property Type" error={errors.propertyType?.message}>
          <Controller
            name="propertyType"
            control={control}
            render={({ field }) => (
              <CustomDropdown
                options={propertyTypeOptions}
                value={field.value || ""}
                onChange={field.onChange}
                placeholder="Select Property Type"
                error={errors.propertyType?.message}
              />
            )}
          />
        </FormField>

        {["Apartment", "Villa"].includes(propertyType) && (
          <FormField label="BHK" error={errors.bhk?.message}>
            <Controller
              name="bhk"
              control={control}
              render={({ field }) => (
                <CustomDropdown
                  options={bhkOptions}
                  value={field.value || ""}
                  onChange={field.onChange}
                  placeholder="Select BHK"
                  error={errors.bhk?.message}
                />
              )}
            />
          </FormField>
        )}

        <FormField label="Purpose" error={errors.purpose?.message}>
          <Controller
            name="purpose"
            control={control}
            render={({ field }) => (
              <CustomDropdown
                options={purposeOptions}
                value={field.value || ""}
                onChange={field.onChange}
                placeholder="Select Purpose"
                error={errors.purpose?.message}
              />
            )}
          />
        </FormField>

        <FormField label="Budget Min" error={errors.budgetMin?.message}>
          <input 
            type="number" 
            {...register("budgetMin", { valueAsNumber: true })}
            placeholder="Enter minimum budget"
            className="form-input"
          />
        </FormField>

        <FormField label="Budget Max" error={errors.budgetMax?.message}>
          <input 
            type="number" 
            {...register("budgetMax", { valueAsNumber: true })}
            placeholder="Enter maximum budget"
            className="form-input"
          />
        </FormField>

        <FormField label="Timeline" error={errors.timeline?.message}>
          <Controller
            name="timeline"
            control={control}
            render={({ field }) => (
              <CustomDropdown
                options={timelineOptions}
                value={field.value || ""}
                onChange={field.onChange}
                placeholder="Select Timeline"
                error={errors.timeline?.message}
              />
            )}
          />
        </FormField>

        <FormField label="Source" error={errors.source?.message}>
          <Controller
            name="source"
            control={control}
            render={({ field }) => (
              <CustomDropdown
                options={sourceOptions}
                value={field.value || ""}
                onChange={field.onChange}
                placeholder="Select Source"
                error={errors.source?.message}
              />
            )}
          />
        </FormField>

        <FormField label="Status" error={errors.status?.message}>
          <Controller
            name="status"
            control={control}
            defaultValue="New"
            render={({ field }) => (
              <CustomDropdown
                options={statusOptions}
                value={field.value || "New"}
                onChange={field.onChange}
                placeholder="Select Status"
                error={errors.status?.message}
              />
            )}
          />
        </FormField>

        <FormField label="Notes" error={errors.notes?.message}>
          <textarea 
            {...register("notes")}
            maxLength={1000}
            placeholder="Enter any additional notes..."
            className="form-textarea"
          />
        </FormField>

        <FormField label="Tags (comma separated)" error={errors.tags?.message}>
          <input
            {...register("tags", { setValueAs: v => (v ? (v as string).split(",").map(s => s.trim()).filter(tag => tag.length > 0) : []) })}
            placeholder="tag1, tag2, tag3"
            className="form-input"
          />
        </FormField>

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Adding Buyer...' : 'Add Buyer'}
        </button>
      </form>
    </div>
  )
}