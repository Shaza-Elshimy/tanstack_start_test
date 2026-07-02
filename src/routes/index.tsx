import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: Home,
})

function Home() {
  const pages = [
    {
      title: 'Login',
      path: '/login',
    },
    {
      title: 'Student Dashboard',
      path: '/student/dashboard',
    },
    {
      title: 'Student Profile',
      path: '/student/profile',
    },
    {
      title: 'Admin Dashboard',
      path: '/admin/dashboard',
    },
  ]

  return (
    <div className="min-h-screen bg-slate-100 p-10">
      <div className="mx-auto max-w-5xl">
        <h1 className="mb-3 text-5xl font-bold text-slate-800">
          TanStack Start Demo
        </h1>

        <p className="mb-10 text-slate-600">
          Practice Project for Routing, Layouts, Loaders and SSR.
        </p>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {pages.map((page) => (
            <Link
              key={page.path}
              to={page.path}
              className="rounded-xl border border-slate-200 bg-white p-6 shadow transition hover:-translate-y-1 hover:shadow-xl"
            >
              <h2 className="text-xl font-semibold text-slate-800">
                {page.title}
              </h2>

              <p className="mt-2 text-sm text-slate-500">
                Go to {page.title}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}