import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/admin')({
  beforeLoad: ({ context }) => {
    if (!context.user.isLoggedIn) {
      throw redirect({
        to: '/login',
      })
    }

    if (context.user.role !== 'Admin') {
      throw redirect({
        to: '/unauthorized',
      })
    }
  },

  component:AdminLayout,
})
function AdminLayout() {
  return <div>Hello "/admin"!</div>
}
