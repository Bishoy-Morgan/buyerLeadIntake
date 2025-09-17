import Link from "next/link"

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1>
        Buyer Lead Intake App
      </h1>
      <p className="mb-20 text-xl max-w-md text-center tracking-widest">
        Effortless lead intake and management for real estate buyers.
      </p>
      <Link href="/buyers">
        <button>
          Login
        </button>
      </Link>
    </div>
  )
}
