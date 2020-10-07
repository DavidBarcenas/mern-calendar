import React from 'react'
import { Icon, Slide, Snackbar } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import { clearAlert } from '../../redux/actions/ui'

function SlideTransition(props) {
  return <Slide {...props} direction="left" />;
}

export const Alert = () => {
  const dispatch = useDispatch()
  const {snackbarOpen, snackbarMsg, snackbarType} = useSelector(state => state.ui)
  const handleClose = () => dispatch(clearAlert())

  return (
    <Snackbar 
      anchorOrigin={{vertical: 'top', horizontal: 'right'}}
      open={snackbarOpen} 
      autoHideDuration={4000} 
      onClose={handleClose}
      TransitionComponent={SlideTransition}
      aria-describedby="client-snackbar"
    >
      <div id="client-snackbar" className={`alert_snack ${snackbarType === 'success' ? 'success' : 'error'}`}>
        <Icon>{ snackbarType === 'success' ? 'check_circle' : 'error'}</Icon>
        {snackbarMsg}
      </div>  
    </Snackbar>
  )
}
