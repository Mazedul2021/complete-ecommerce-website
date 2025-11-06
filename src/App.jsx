
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Header from './components/header/header'
import Home from './Pages/Home'

function App() {

  return (
    <>
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route path={"/"} exact={true} element={<Home/>}/>
      </Routes>
    </BrowserRouter>
      
    </>
  )
}

export default App
