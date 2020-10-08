import React, { useEffect } from 'react'
import { BrowserRouter as Router, Switch, Redirect } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { LoginScreen } from '../components/auth/LoginScreen'
import { CalendarScreen } from '../components/calendar/CalendarScreen'
import { startChecking } from '../redux/actions/auth'
import { PublicRoute } from './PublicRoute'
import { PrivateRoute } from './PrivateRoute'

export const AppRouter = () => {

  const dispatch = useDispatch()
  const {observable, user} = useSelector(state => state.auth)

  useEffect(() => {
    dispatch(startChecking())
  }, [dispatch])

  if(observable) {
    return <div></div>
  }

  return (
    <Router>
      <div>
        <Switch>
          <PublicRoute isAuth={!!user.uid} exact path='/login' component={LoginScreen} />
          <PrivateRoute isAuth={!!user.uid} exact path='/' component={CalendarScreen} />
          <Redirect to='/' />
        </Switch>
      </div>
    </Router>
  )
}
