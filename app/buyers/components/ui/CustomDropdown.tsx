'use client'

import { useState, useRef, useEffect } from "react"
import { ChevronDown, Check } from "lucide-react"

export interface DropdownOption {
    value: string
    label: string
}

interface CustomDropdownProps {
    options: DropdownOption[]
    value: string
    onChange: (value: string) => void
    placeholder: string
    error?: string
    className?: string
}

export default function CustomDropdown({ 
    options, 
    value, 
    onChange, 
    placeholder, 
    className = "" 
}: CustomDropdownProps) {
    const [isOpen, setIsOpen] = useState(false)
    const dropdownRef = useRef<HTMLDivElement>(null)

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
            return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    const selectedOption = options.find(option => option.value === value)

    return (
        <div className={`custom-dropdown ${className}`} ref={dropdownRef}>
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className={`custom-dropdown-button ${isOpen ? 'open' : ''}`}
            >
                <span className={selectedOption ? '' : 'placeholder'}>
                    {selectedOption ? selectedOption.label : placeholder}
                </span>
                <ChevronDown className={`dropdown-icon ${isOpen ? 'open' : ''}`} />
            </button>

            {isOpen && (
                <div className="custom-dropdown-menu">
                    {options.map((option) => (
                        <button
                        key={option.value}
                        type="button"
                        onClick={() => {
                            onChange(option.value)
                            setIsOpen(false)
                        }}
                        className={`custom-dropdown-option ${value === option.value ? 'selected' : ''}`}
                        >
                            <span>{option.label}</span>
                            {value === option.value && (
                                <Check className="check-icon" />
                            )}
                        </button>
                    ))}
                </div>
            )}
        </div>
    )
}