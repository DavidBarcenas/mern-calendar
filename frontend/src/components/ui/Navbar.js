import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppBar, Button, Icon, Toolbar } from '@material-ui/core'
import { startLogout } from '../../redux/actions/auth'

export const Navbar = () => {

  const dispatch = useDispatch()
  const { user } = useSelector(state => state.auth)
  const handleLogout = () => dispatch(startLogout())

  return (
    <AppBar position="static" className="navbar__wrap">
      <Toolbar className="navbar">
        <div>
          <span className="navbar__title">Calendar App</span>
          <span className="navbar__username">Buen día, {user.name}</span>
        </div>
      
        <Button onClick={handleLogout}>
          <Icon>lock</Icon>
          <span>Cerrar sesión</span>
        </Button>
      </Toolbar>
    </AppBar>
  )
}
