import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/unauthorized')({
  component: Unauthorized,
})

function Unauthorized() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <h1 className="text-4xl font-bold text-red-600">
        403 - Unauthorized
      </h1>

      <p className="mt-4 text-gray-600">
        You don't have permission to access this page.
      </p>

      <Link
        to="/"
        className="mt-6 rounded bg-blue-600 px-4 py-2 text-white"
      >
        Back Home
      </Link>
    </div>
  )
}