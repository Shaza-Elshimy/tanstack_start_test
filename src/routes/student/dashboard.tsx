import { Suspense, use } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'

type DashboardUser = {
  name: string
  email: string
  cohort: string
}

type Post = {
  id: number
  title: string
  excerpt: string
}

type AnalyticsMetric = {
  label: string
  value: string
}

type Notification = {
  id: number
  message: string
  time: string
}

export const getDashboardUser = createServerFn({
  method: 'GET',
}).handler(async () => {
  await new Promise((resolve) => setTimeout(resolve, 500))

  return {
    name: 'Shaza',
    email: 'shaza@example.com',
    cohort: 'Frontend Engineering',
  } satisfies DashboardUser
})

export const getDashboardPosts = createServerFn({
  method: 'GET',
}).handler(async () => {
  await new Promise((resolve) => setTimeout(resolve, 1500))

  return [
    {
      id: 1,
      title: 'Streaming with Suspense',
      excerpt: 'Independent boundaries let each section appear when ready.',
    },
    {
      id: 2,
      title: 'Route Data Patterns',
      excerpt: 'Deferred promises keep the page shell from being blocked.',
    },
    {
      id: 3,
      title: 'TanStack Start Notes',
      excerpt: 'Server functions can be composed with route loaders.',
    },
  ] satisfies Array<Post>
})

export const getDashboardAnalytics = createServerFn({
  method: 'GET',
}).handler(async () => {
  await new Promise((resolve) => setTimeout(resolve, 3000))

  return [
    {
      label: 'Completed lessons',
      value: '42',
    },
    {
      label: 'Average score',
      value: '91%',
    },
    {
      label: 'Study streak',
      value: '12 days',
    },
  ] satisfies Array<AnalyticsMetric>
})

export const getDashboardNotifications = createServerFn({
  method: 'GET',
}).handler(async () => {
  await new Promise((resolve) => setTimeout(resolve, 4500))

  return [
    {
      id: 1,
      message: 'Your next React Suspense lesson is ready.',
      time: 'Today',
    },
    {
      id: 2,
      message: 'Project feedback was added to your dashboard.',
      time: 'Yesterday',
    },
  ] satisfies Array<Notification>
})

export const Route = createFileRoute('/student/dashboard')({
  component: StudentDashboard,
})

function StudentDashboard() {
  const userPromise = getDashboardUser()
  const postsPromise = getDashboardPosts()
  const analyticsPromise = getDashboardAnalytics()
  const notificationsPromise = getDashboardNotifications()

  return (
    <div className="space-y-6 text-left">
      <header>
        <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
          Dashboard
        </p>
        <h1 className="mt-2 text-3xl font-bold text-gray-950">
          Student overview
        </h1>
      </header>

      <div className="grid gap-4 lg:grid-cols-2">
        <Suspense fallback={<SectionFallback label="Loading user..." />}>
          <UserSection userPromise={userPromise} />
        </Suspense>

        <Suspense fallback={<SectionFallback label="Loading posts..." />}>
          <PostsSection postsPromise={postsPromise} />
        </Suspense>

        <Suspense fallback={<SectionFallback label="Loading analytics..." />}>
          <AnalyticsSection metricsPromise={analyticsPromise} />
        </Suspense>

        <Suspense
          fallback={<SectionFallback label="Loading notifications..." />}
        >
          <NotificationsSection notificationsPromise={notificationsPromise} />
        </Suspense>
      </div>
    </div>
  )
}

function UserSection({ userPromise }: { userPromise: Promise<DashboardUser> }) {
  const user = use(userPromise)

  return (
    <section className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
      <p className="text-sm font-semibold text-gray-500">User Section</p>
      <h2 className="mt-3 text-2xl font-bold text-gray-950">{user.name}</h2>
      <dl className="mt-4 space-y-3 text-sm">
        <InfoRow label="Email" value={user.email} />
        <InfoRow label="Cohort" value={user.cohort} />
      </dl>
    </section>
  )
}

function PostsSection({
  postsPromise,
}: {
  postsPromise: Promise<Array<Post>>
}) {
  const posts = use(postsPromise)

  return (
    <section className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-lg font-bold text-gray-950">Posts Section</h2>
        <span className="text-sm text-gray-500">{posts.length} posts</span>
      </div>

      <div className="mt-4 space-y-4">
        {posts.map((post) => (
          <article key={post.id} className="border-t border-gray-100 pt-4">
            <h3 className="font-semibold text-gray-950">{post.title}</h3>
            <p className="mt-1 text-sm text-gray-500">{post.excerpt}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

function AnalyticsSection({
  metricsPromise,
}: {
  metricsPromise: Promise<Array<AnalyticsMetric>>
}) {
  const metrics = use(metricsPromise)

  return (
    <section className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
      <h2 className="text-lg font-bold text-gray-950">Analytics Section</h2>
      <div className="mt-4 grid gap-4 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
        {metrics.map((metric) => (
          <article key={metric.label} className="rounded-md bg-gray-50 p-4">
            <p className="text-sm font-medium text-gray-500">{metric.label}</p>
            <p className="mt-2 text-2xl font-bold text-gray-950">
              {metric.value}
            </p>
          </article>
        ))}
      </div>
    </section>
  )
}

function NotificationsSection({
  notificationsPromise,
}: {
  notificationsPromise: Promise<Array<Notification>>
}) {
  const notifications = use(notificationsPromise)

  return (
    <section className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
      <h2 className="text-lg font-bold text-gray-950">Notifications Section</h2>
      <div className="mt-4 space-y-3">
        {notifications.map((notification) => (
          <article
            key={notification.id}
            className="rounded-md border border-gray-100 p-4"
          >
            <p className="text-sm font-medium text-gray-950">
              {notification.message}
            </p>
            <p className="mt-1 text-sm text-gray-500">{notification.time}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <dt className="text-gray-500">{label}</dt>
      <dd className="font-medium text-gray-950">{value}</dd>
    </div>
  )
}

function SectionFallback({ label }: { label: string }) {
  return (
    <section className="rounded-lg border border-dashed border-gray-300 bg-gray-50 p-5 text-sm font-medium text-gray-500">
      {label}
    </section>
  )
}

/*

import { createFileRoute } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'

export const getUsers = createServerFn({
  method: 'GET',
}).handler( async () => {
    const res = await fetch('https://dummyjson.com/users')
    const data = await res.json()
    return data.users

})

export const Route = createFileRoute('/student/dashboard')({
  loader: async () => {
    return await getUsers()
  },
  // loader: async () => {
  //   const res =await fetch ('https://dummyjson.com/users')

  //   if(res.status !== 200) {
  //     throw new Error('Failed to fetch users')
  //   }
  //   await new Promise((resolve) => setTimeout(resolve, 3000))

  //   const data = await res.json()
  //   return data.users
  // },

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
*/
