import { lazy } from 'react'
const Discover = lazy(() => import('../Page/Discover'))
const Home = lazy(() => import('../Page/Home'))
const Collect = lazy(() => import('../Page/Collect'))
const routes = [
  { path: '/', element: <Discover /> },
  { path: '/netEase', element:<Home /> },
  { path: '/collect', element: <Collect /> },
]
export default routes
