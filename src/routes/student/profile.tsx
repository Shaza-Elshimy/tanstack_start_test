import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/student/profile')({
  component: StudentProfile,
})

function StudentProfile() {
  return <div>Hello "/student/profile"!</div>
}
