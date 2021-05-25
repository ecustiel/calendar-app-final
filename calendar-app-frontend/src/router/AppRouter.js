import React from 'react'
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import {
    BrowserRouter as Router,
    Switch,
    Redirect
  } from "react-router-dom";
import { startChecking } from '../actions/auth';
import { LoginScreen } from '../components/auth/LoginScreen';
import { CalendarScreen } from '../components/calendar/CalendarScreen';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';
  

export const AppRouter = () => {

    const dispatch = useDispatch();
    const {checking, uid} = useSelector(state => state.auth)

    useEffect(() => {
        
        dispatch(startChecking());

    }, [dispatch])

    //Trabajar en esto, poner algun logo de Loading o algo mas prolijo
    if(checking) {
        return (<h5>Espere...</h5>)
    }

    return (
        <Router>
            <div>
                <Switch>
                    <PublicRoute exact path='/login' component={LoginScreen} isAuthenticated={!!uid} />
                    <PrivateRoute exact path='/' component={CalendarScreen} isAuthenticated={!!uid}/> 
                    <Redirect to='/' />
                </Switch>
            </div>    
      
    </Router>
    )
}
