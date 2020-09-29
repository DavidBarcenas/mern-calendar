import React from 'react'
import { AppBar, Button, Icon, Toolbar } from '@material-ui/core'

export const Navbar = () => {
  return (
    <AppBar position="static">
      <Toolbar className="navbar">
        <div>
          <span className="navbar__title">Calendar App</span>
          <span className="navbar__username">Buen día, David</span>
        </div>
      
        <Button>
          <Icon>lock</Icon>
          <span>Cerrar sesión</span>
        </Button>
      </Toolbar>
    </AppBar>
  )
}
