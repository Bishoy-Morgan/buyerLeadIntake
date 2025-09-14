import Link from "next/link"

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold mb-4">Buyer Leads CRM</h1>
      <p className="mb-6">Manage and track buyer leads easily.</p>
      <Link href="/buyers">
        <button className="bg-blue-600 text-white px-6 py-3 rounded">
          View Buyers
        </button>
      </Link>
    </div>
  )
}
