import { App } from '@/views/app'
import { HashRouter, Routes, Route } from 'react-router-dom'
import { ReactElement } from 'react'

const Router = (): ReactElement => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={ <App /> } />
      </Routes>
    </HashRouter>
  )
}

export default Router
