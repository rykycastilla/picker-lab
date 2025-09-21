import { AppLayout } from '@/views/app'
import { HashRouter, Navigate, Routes, Route } from 'react-router-dom'
import { Lab } from '@/views/lab'
import { ReactElement } from 'react'

const Router = (): ReactElement => {
  return (
    <HashRouter>
      <Routes>
        <Route element={ <AppLayout /> }>
          { /* Using '/lab' as index */ }
          <Route index element={ <Navigate to="/lab" replace /> } />
          <Route path="lab" element={ <Lab /> } />
        </Route>
      </Routes>
    </HashRouter>
  )
}

export default Router
