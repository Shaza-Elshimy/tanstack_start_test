import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/admin/profile')({
  component: AdminProfile,
})

function AdminProfile() {
  return <div>Hello "/admin/profile"!</div>
}
