import React, { useState } from 'react'
import TextField from '@material-ui/core/TextField';
import { Button, useMediaQuery } from '@material-ui/core';
import { useForm } from '../../hooks/useForm';
import { useDispatch } from 'react-redux';
import { startLogin } from '../../redux/actions/auth';


export const LoginScreen = () => {
  const dispatch = useDispatch()

  const [loginAnimation, setLoginAnimation] = useState({
    signIn: false,
    animate: false
  })
  
  const [ formLoginValues, handleLoginInputChange ] = useForm({
    lEmail: 'davee@gmail.com',
    lPwd: 'dave123'
  });
  
  const mq = useMediaQuery('(min-width: 768px)');
  const {signIn, animate} = loginAnimation
  const {lEmail, lPwd} = formLoginValues

  const handleAnimation = (isLogin) => {
    setLoginAnimation({ 
      ...loginAnimation, 
      signIn: isLogin,
    })
    setTimeout(() => {
      setLoginAnimation({ 
          signIn: isLogin,
          animate: isLogin,
        })
    }, 200);
  }
  
  const handleLogin = (e) => {
    e.preventDefault()
    dispatch(startLogin(lEmail, lPwd))
  }

  return (
    <div className='login__wrapper'>
      <div className="login__box" style={{transform: signIn && mq ? 'translateX(100%)' : 'translateX(0)'}}>
        {
          !animate ? 
            <div className="login__signin">
              <h1>CalendarApp</h1>
              <h2 className="login__title">Iniciar Sesión</h2>
              <form noValidate autoComplete="off" onSubmit={handleLogin}>
                  <TextField 
                    label="Correo electrónico" 
                    variant="outlined" 
                    type="email" 
                    name="lEmail" 
                    value={lEmail}
                    onChange={handleLoginInputChange} 
                  />
                  <TextField 
                    label="Contraseña" 
                    type='password' 
                    variant="outlined" 
                    name="lPwd" 
                    value={lPwd}
                    onChange={handleLoginInputChange}  
                  />
                  <p className="forgout">¿Olvidaste tu contraseña?</p>
                  <Button type="submit" variant="outlined" color="primary"> INGRESAR </Button>
              </form>
            </div> : 
            <div className="login__signin"> 
              <h2 className="login__title">Registrarse</h2>
              <form noValidate autoComplete="off">
                <TextField label="Nombre" type="text" variant="outlined" />
                <TextField label="Correo electrònico" type="email" variant="outlined" />
                <TextField label="Contraseña" type="password" variant="outlined" />
                <TextField label="Repetir contraseña" type="password" variant="outlined" />
                <Button variant="outlined" color="primary"> Crear cuenta </Button>
              </form>
            </div>
        }
      </div>

      <div className='login__overlay' style={{transform: signIn && mq ? 'translateX(-100%)' : 'translateX(0)'}}>
        {
          !animate ? 
          <div>
              <h2 className="login__title">¡Hola Amigo!</h2>
              <p>Ingresa tus datos personales y comienza tu viaje con nosotros.</p>
              <Button variant="outlined" color="primary" onClick={() => handleAnimation(true)}> REGISTRARSE </Button>
            </div>
          : 
          <div>
              <h2 className="login__title">¡Bienvenido de nuevo!</h2>
              <p>Para mantenerte conectado con nosotros, ingresa con tus datos de acceso.</p>
              <Button variant="outlined" color="primary" onClick={() => handleAnimation(false)}> INICIAR SESIÓN </Button>
            </div>
        }
        </div>
    </div>
  )
}
