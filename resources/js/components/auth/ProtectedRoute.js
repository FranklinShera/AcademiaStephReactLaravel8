import React from 'react'
import { useSelector } from 'react-redux'
import {Route , Redirect, useLocation} from 'react-router-dom'

const ProtectedRoute = ({ component: Component , ...rest}) => {

    const authUser = useSelector( state => state.authUser)
    const { loggedInUser , auth } = authUser;

   

        let location = useLocation();


    return (
            <Route
              {...rest} 

              render={props => {

                  if(loggedInUser != null && auth)
                  {
                      return <Component {...props} />
                      
                  }else{
                     return (
                        <Redirect to={{ 
                            pathname: "/in",
                            state: { next: location.pathname }
                         }} />
                     )
                  }

              }}/>  
    )
}

export default ProtectedRoute
