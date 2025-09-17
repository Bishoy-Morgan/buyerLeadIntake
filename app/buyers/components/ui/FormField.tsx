import { ReactNode } from "react"

interface FormFieldProps {
    label: string
    error?: string
    children: ReactNode
    className?: string
}

export default function FormField({ label, error, children, className = "" }: FormFieldProps) {
    return (
        <div className={className}>
            <label>{label}</label>
            {children}
            {error && <p className="text-red-600">{error}</p>}
        </div>
    )
}