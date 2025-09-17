// constants/dropdownOptions.ts
import { DropdownOption } from "@/app/buyers/components/ui/CustomDropdown"

export const cityOptions: DropdownOption[] = [
    { value: "Chandigarh", label: "Chandigarh" },
    { value: "Mohali", label: "Mohali" },
    { value: "Zirakpur", label: "Zirakpur" },
    { value: "Panchkula", label: "Panchkula" },
    { value: "Other", label: "Other" },
]

export const propertyTypeOptions: DropdownOption[] = [
    { value: "Apartment", label: "Apartment" },
    { value: "Villa", label: "Villa" },
    { value: "Plot", label: "Plot" },
    { value: "Office", label: "Office" },
    { value: "Retail", label: "Retail" },
]

export const bhkOptions: DropdownOption[] = [
    { value: "1", label: "1 BHK" },
    { value: "2", label: "2 BHK" },
    { value: "3", label: "3 BHK" },
    { value: "4", label: "4 BHK" },
    { value: "Studio", label: "Studio" },
]

export const purposeOptions: DropdownOption[] = [
    { value: "Buy", label: "Buy" },
    { value: "Rent", label: "Rent" },
]

export const timelineOptions: DropdownOption[] = [
    { value: "0-3m", label: "0-3 months" },
    { value: "3-6m", label: "3-6 months" },
    { value: ">6m", label: "More than 6 months" },
    { value: "Exploring", label: "Just Exploring" },
]

export const sourceOptions: DropdownOption[] = [
    { value: "Website", label: "Website" },
    { value: "Referral", label: "Referral" },
    { value: "Walk-in", label: "Walk-in" },
    { value: "Call", label: "Call" },
    { value: "Other", label: "Other" },
]

export const statusOptions: DropdownOption[] = [
    { value: "New", label: "New" },
    { value: "Qualified", label: "Qualified" },
    { value: "Contacted", label: "Contacted" },
    { value: "Visited", label: "Visited" },
    { value: "Negotiation", label: "Negotiation" },
    { value: "Converted", label: "Converted" },
    { value: "Dropped", label: "Dropped" },
]