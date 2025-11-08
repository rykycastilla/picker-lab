import { AppLayout } from '@/views/app'
import { HashRouter, Navigate, Routes, Route } from 'react-router-dom'
import { Lab } from '@/views/lab'
import { Palette } from '@/views/palette'
import { ReactElement } from 'react'

const Router = (): ReactElement => {
  return (
    <HashRouter>
      <Routes>
        <Route element={ <AppLayout /> }>
          { /* Using '/lab' as index */ }
          <Route index element={ <Navigate to="/lab" replace /> } />
          <Route path="lab" element={ <Lab /> } />
          <Route path="colors" element={ <Palette /> } />
        </Route>
      </Routes>
    </HashRouter>
  )
}

export default Router
