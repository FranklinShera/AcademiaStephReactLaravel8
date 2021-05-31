import React , { useState , useEffect } from 'react'


import { BrowserRouter as Router , Route, Switch } from 'react-router-dom'
import ProtectedRoute from './components/auth/ProtectedRoute'
import ClientProtectedRoute from './components/auth/ClientProtectedRoute'


import Footer from './components/Footer';
import Header from './components/Header';
import Overlay from './components/Overlay';
import Home from './pages/Home';
import PlaceOrder from './pages/PlaceOrder';
import FindWriter from './pages/FindWriter';
import NotFound from './pages/NotFound';
import Login from './pages/auth/Login';
import ClientLogin from './pages/auth/ClientLogin';
import Dashboard from './pages/auth/Dashboard';
import ClientDashboard from './pages/auth/ClientDashboard';
import Payment from './pages/auth/Payment';
import Orders from './pages/auth/Orders';
import OrderControl from './pages/auth/OrderControl';
import Messages from './pages/auth/Messages';
import Profile from './pages/auth/Profile';


import { useDispatch , useSelector} from 'react-redux'


//actions
import {  refreshUser , refreshClient } from './actions/AuthUserActions'
import Register from './pages/auth/Register';



import Swal2 from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'



const Swal = withReactContent(Swal2)

const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer)
    toast.addEventListener('mouseleave', Swal.resumeTimer)
  }
})

window.Toast = Toast;
window.Swal = Swal;



function App() {

    const dispatch =  useDispatch();

    const authUser = useSelector( state => state.authUser)

    const authClient = useSelector( state => state.authClient)

    const userInAdmin = useSelector( state => state.adminPanel)

    const { inAdminPanel } = userInAdmin;

    const { auth } = authUser;

    const { clientAuth } = authClient;





    useEffect(() => {


        if(!auth ){

                dispatch(refreshUser())

        }

        if(!clientAuth ){

                dispatch(refreshClient())

        }

          setInterval(() => {

              (auth) ?  dispatch(refreshUser(1)) : (clientAuth) && dispatch(refreshClient(1))

          }, 840000);


    },[])



  return (
  <>
    <Overlay/>

        <Router>

         <Header inAdminPanel={inAdminPanel}/>
          <Switch>
            <Route path="/place-your-order" exact component={PlaceOrder}/>
            <Route path="/find-writer" exact component={FindWriter}/>
            <Route path="/in/register" exact component={Register}/>
            <ProtectedRoute path={ `/in/dashboard/orders` } exact component={Orders}/>
            <ProtectedRoute path={ `/in/dashboard/control/order-input` } exact component={OrderControl}/>
            <ProtectedRoute path={ `/in/dashboard/messages`} exact  component={Messages}/>
            <ProtectedRoute path={`/in/dashboard/payments`}  exact component={Payment}/>
            <ProtectedRoute path={`/in/dashboard/profile`}  exact component={Profile}/>
            <ProtectedRoute path="/in/dashboard" exact  component={Dashboard}/>
            <ClientProtectedRoute path="/client/dashboard" exact  component={ClientDashboard}/>
            <Route path="/in" exact component={Login}/>
            <Route path="/client" exact component={ClientLogin}/>
            <Route path="/" exact component={Home}/>
            <Route component={NotFound}/>
          </Switch>

          {(!inAdminPanel)  &&  <Footer/>}


        </Router>


  </>
  );
}

export default App;
