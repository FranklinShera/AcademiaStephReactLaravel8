import React from 'react'
import { useSelector } from 'react-redux'
import {Route , Redirect, useLocation} from 'react-router-dom'

const ClientProtectedRoute = ({ component: Component , ...rest}) => {

    const authClient = useSelector( state => state.authClient)
    const { loggedInClient , clientAuth } = authClient;



        let location = useLocation();


    return (
            <Route
              {...rest}

              render={props => {

                  if(loggedInClient != null && clientAuth)
                  {
                      return <Component {...props} />

                  }else{
                     return (
                        <Redirect to={{
                            pathname: "/client",
                            state: { next: location.pathname }
                         }} />
                     )
                  }

              }}/>
    )
}

export default ClientProtectedRoute
