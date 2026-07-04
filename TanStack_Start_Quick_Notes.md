# TanStack Start - Quick Notes

## 1. React

-   React is a UI library built from Components.
-   **Render** = Display the component on the screen.
-   **Re-render** = Happens when State changes.

## 2. useState

Used to store data that changes.

``` tsx
const [count, setCount] = useState(0);
```

-   `count` = current value.
-   `setCount()` = updates the value.
-   Updating state triggers a Re-render.

------------------------------------------------------------------------

## 3. useEffect

Runs code after rendering.

``` tsx
useEffect(() => {
  console.log("Loaded");
}, []);
```

Rules: - `useEffect(() => {})` → after every render. -
`useEffect(() => {}, [])` → once after first render. -
`useEffect(() => {}, [count])` → first render + whenever `count`
changes.

------------------------------------------------------------------------

## 4. Routing

Routing is navigation between pages.

Examples:

-   `/`
-   `/login`
-   `/profile`
-   `/admin/users`

The Router decides which page to render.

------------------------------------------------------------------------

## 5. File-Based Routing

Files inside `routes/` become URLs.

    routes/
    ├── index.tsx        -> /
    ├── login.tsx        -> /login
    └── admin/
        └── users.tsx    -> /admin/users

------------------------------------------------------------------------

## 6. Route Tree

Routes are organized as a tree.

    Root
    ├── Login
    ├── Student
    │   └── Profile
    └── Admin
        ├── Users
        └── Courses

------------------------------------------------------------------------

## 7. Nested Layout

Used to share UI like Navbar and Sidebar.

``` tsx
function AdminLayout() {
  return (
    <>
      <Navbar />
      <Sidebar />
      <Outlet />
    </>
  );
}
```

`Outlet` is where child pages are rendered.

------------------------------------------------------------------------

## 8. Route Context

Stores shared route-related data.

Examples: - Logged-in User - Role - Token - Permissions

Instead of passing props through many components.

------------------------------------------------------------------------

## 9. Loader

Fetches data **before** rendering the page.

React:

    Render -> useEffect -> API

TanStack Start:

    Loader -> API -> Render

------------------------------------------------------------------------

## 10. Pending State

Displayed while a Loader is still fetching data.

Example:

    Loading...

Mostly appears during client-side navigation.

------------------------------------------------------------------------

## 11. Error Boundary

Shows a friendly error UI if loading fails.

Example:

    Something went wrong.

Instead of crashing the page.

------------------------------------------------------------------------

## 12. SSR (Server Side Rendering)

React CSR:

    Browser -> JS -> Render

SSR:

    Server -> Render -> Browser

Benefits: - Faster first page load. - Better SEO.

------------------------------------------------------------------------

## 13. Streaming

The server sends completed parts of the page first instead of waiting
for everything.

Example:

    Welcome
    Loading Courses...
    Loading Reports...

Then the remaining sections appear as they finish.

------------------------------------------------------------------------

## 14. Server Functions

Functions that execute on the server.

Flow:

    Frontend
       ↓
    Server Function
       ↓
    Database / API

If using NestJS, Server Functions often call the NestJS API.

------------------------------------------------------------------------

## 15. Route-Level Authentication

Use `beforeLoad` to protect routes.

Flow:

    User
     ↓
    beforeLoad
     ↓
    Logged in?
     ↓
    No -> /login
    Yes -> Continue

------------------------------------------------------------------------

## 16. Role Redirect

Example:

    Admin -> /admin
    Instructor -> /instructor
    Student -> /student

Unauthorized users are redirected before the page renders.

------------------------------------------------------------------------

## 17. Typed Navigation

``` tsx
navigate({
  to: "/admin/users",
})
```

TypeScript checks: - Route exists. - Parameters are correct.

This catches navigation mistakes during development.

------------------------------------------------------------------------

# Quick Comparison

  React                TanStack Start
  -------------------- ----------------------------------
  useEffect for data   Loader
  React Context        Route Context (for routing data)
  Client Render        Supports SSR
  Manual routing       File-based routing
  Manual auth          beforeLoad + Route protection
