import './App.css'
import CustomPlayer from './Compents/CustomPlayer'
import Navigation from './Compents/Navigation'
import Loding from './Compents/Loding'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import routes from './router'
import { Suspense } from 'react'
import 'antd/dist/antd.css'
import store from './store'
import { Provider } from 'react-redux'
function App() {
  return (
    <Provider store={store}>
      <div id="loading">
        <Loding />
      </div>
      <Suspense fallback={<div>组件正在加载</div>}>
        <BrowserRouter>
          <Navigation />
          <Routes path="/">
            {routes.map((item, index) => {
              return <Route key={index} path={item.path} element={item.element} />
            })}
          </Routes>
        </BrowserRouter>
      </Suspense>
      <div id="player">
        <CustomPlayer />
      </div>
    </Provider>
  )
}
export default App
