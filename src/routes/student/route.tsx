import { createFileRoute, Outlet, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/student')({
  component: StudentLayout,
})

function StudentLayout() {
  const { user } = Route.useRouteContext()
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="flex items-center justify-between border-b bg-white px-6 py-4 shadow-sm">
        <h2 className="text-xl font-bold text-blue-600">
          Student Panel 🎓
        </h2>
        <p className="text-gray-600">
          Welcome, {user.name}!
        </p>
        <span className="text-gray-600">
          Role: {user.role}
        </span>

        <div className="flex gap-6 text-sm font-medium">
          <Link
            to="/student/dashboard"
            className="text-gray-600 transition hover:text-blue-600"
          >
            Dashboard
          </Link>

          <Link
            to="/student/profile"
            className="text-gray-600 transition hover:text-blue-600"
          >
            Profile
          </Link>
        </div>
      </nav>

      {/* Body */}
      <div className="flex">
        {/* Sidebar */}
        <aside className="hidden w-64 border-r bg-white p-5 shadow-sm md:block">
          <h3 className="mb-4 text-sm font-bold text-gray-500">
            MENU
          </h3>

          <div className="flex flex-col gap-3 text-sm">
            <Link
              to="/student/dashboard"
              className="rounded-lg px-3 py-2 text-gray-600 hover:bg-blue-50 hover:text-blue-600"
            >
              📊 Dashboard
            </Link>

            <Link
              to="/student/profile"
              className="rounded-lg px-3 py-2 text-gray-600 hover:bg-blue-50 hover:text-blue-600"
            >
              👤 Profile
            </Link>
          </div>
        </aside>

        {/* Content */}
        <main className="flex-1 p-6">
          <div className="rounded-xl bg-white p-6 shadow-sm">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}