import React from 'react'
import { ReduxRouter } from '@lagunovsky/redux-react-router'
import AppRouter from './router'
import store from '@/store'
import { history } from '@/store/history'

function App() {
  return (
    <ReduxRouter history={history} store={store}>
      <AppRouter />
    </ReduxRouter>
  )
}

export default App
