import './App.css'
import ProductDetail from './Components/ProductDetail.jsx'
import ProductListPage from './pages/ProductListPage'
import { useSelector } from 'react-redux'
import { selectIsAuthenticated } from './store/authSlice'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import LoginForm from './Components/LoginForm'
import RegisterForm from './Components/RegisterForm'
import CartPage from './pages/CartPage'
import OrderHistoryPage from './pages/OrderHistoryPage'
import Layout from './Components/Layout.jsx'
import CategoryPage from './pages/CategoryPage.jsx'
import UserProfilePage from './pages/UserProfilePage.jsx'
import Logout from './Components/Logout.jsx'
import ChangePasswordPage from './pages/ChangePasswordPage.jsx'
import HomePage from './pages/HomePage.jsx'


function ProtectedRoute({element}) {
  const isAuthenticated=useSelector(selectIsAuthenticated)
  return isAuthenticated ? element : <Navigate to="/users/login" replace />
}


function App() {

  return (
    <>
      <BrowserRouter>
        <div>
          <Routes>
            <Route path='/users/login' element={<LoginForm/>} />
            <Route path='/users/logout' element={<ProtectedRoute element={<Logout/>}/>} />
            <Route path='/users/register' element={<RegisterForm/>} />
            <Route path="/" element={<Layout/>} >
              <Route path='' element={<HomePage/>} />
              <Route path='users/current-user' element={<ProtectedRoute element={<UserProfilePage/>}/>} />
              <Route path='/users/change-password' element={<ProtectedRoute element={<ChangePasswordPage/>}/>} />
              <Route path='products' element={<ProductListPage/>} />
              <Route path='products/:id' element={<ProductDetail/>} />
              <Route path='categories/:paramCategory' element={<CategoryPage/>} />
              <Route path='cart' element={<ProtectedRoute element={<CartPage/>}/>} />
              <Route path='order-history' element={<ProtectedRoute element={<OrderHistoryPage/>}/>} />
            </Route>
          </Routes>
        </div>
      </BrowserRouter>
    </>
  )
}

export default App
