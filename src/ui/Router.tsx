import { App, AppLayout } from '@/views/app'
import { HashRouter, Routes, Route } from 'react-router-dom'
import { ReactElement } from 'react'

const Router = (): ReactElement => {
  return (
    <HashRouter>
      <Routes>
        <Route element={ <AppLayout /> }>
          <Route index element={ <App /> } />
        </Route>
      </Routes>
    </HashRouter>
  )
}

export default Router
