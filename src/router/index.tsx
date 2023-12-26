/*
 * @Author: JL Guan
 * @Date: 2023-12-19 11:18:49
 * @description: file description
 * @LastEditTime: 2023-12-26 11:17:22
 * @FilePath: /react-builder/src/router/index.tsx
 */
import { lazy } from 'react'
import { createBrowserRouter } from 'react-router-dom'
import App from '../App'

const loadComponent = (modulePath: string) => {
  const Module = lazy(() => import(`../modules/${modulePath}/index.tsx`))
  return <Module />
}

const routes = [
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/test',
        index: true,
        element: loadComponent('Test'),
      },
    ],
  },
]

export { routes }

export default createBrowserRouter(routes)
