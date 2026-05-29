import { RouterProvider } from 'react-router-dom'
import { router } from './router'

export function Providers() {
  return <RouterProvider router={router} />
}
