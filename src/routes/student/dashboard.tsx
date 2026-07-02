import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/student/dashboard')({
  loader: async () => {
    const res =await fetch ('https://dummyjson.com/users')

    if(res.status !== 200) {
      throw new Error('Failed to fetch users')
    }
    await new Promise((resolve) => setTimeout(resolve, 3000))

    const data = await res.json()
    return data.users
  },
  pendingComponent: () => <div className="p-10 text-center text-2xl font-bold">Loading users...</div>
  ,
  errorComponent: ({ error }) => 
      <div className="flex min-h-[300px] flex-col items-center justify-center text-center">
        <h1 className="text-3xl font-bold text-red-600">
          Something went wrong 💥
        </h1>

        <p className="mt-2 text-gray-600">
          {error.message}
        </p>
      </div>

  ,component: StudentDashboard,
})
function StudentDashboard() {
  const users = Route.useLoaderData()
  return <div className="p-10 text-center text-2xl font-bold">
      <h1 className="mb-6 text-3xl font-bold">Users</h1>

      <div className="grid gap-4">
        {users.map((user: any) => (
          <div
            key={user.id}
            className="rounded-lg border p-4 shadow"
          >
            <h2 className="text-lg font-semibold">
              {user.firstName} {user.lastName}
            </h2>

            <p>{user.email}</p>
            <p>{user.company.name}</p>
          </div>
        ))}
      </div>
    </div>

}
