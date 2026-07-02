import { createFileRoute, Outlet, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/student')({
  component: StudentLayout,
})

function StudentLayout() {
  return (
    <div>
      <nav style={{ padding: '10px', borderBottom: '1px solid #ccc' }}>
        <h2>Student Navbar</h2>

        <Link to="/student/dashboard">Dashboard</Link>
        {' | '}
        <Link to="/student/profile">Profile</Link>
      </nav>

      <div style={{ display: 'flex' }}>
        <aside
          style={{
            width: '200px',
            borderRight: '1px solid #ccc',
            padding: '10px',
          }}
        >
          <h3>Sidebar</h3>
        </aside>

        <main style={{ padding: '20px', flex: 1 }}>
          <Outlet />
        </main>
      </div>
    </div>
  )
}