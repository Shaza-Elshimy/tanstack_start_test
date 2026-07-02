import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/student/dashboard')({
  component: StudentDashboard,
})
function StudentDashboard() {
  return <div>Hello "/student/dashboard"!</div>
}
