import React, { useState } from 'react'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Slide, TextField } from '@material-ui/core';
import { useSelector } from 'react-redux';
import moment from 'moment'

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ ref } { ...props } />;
});

export const CalendarModal = ({ closeModal }) => {

  const { modalOpen } = useSelector(state => state.ui)

  const [inputError, setInputError] = useState({
    startError: false,
    endError:   false,
    titleError: false
  })

  const [formValues, setFormValues] = useState({
    title: 'Evento',
    notes: '',
    start: '',
    end:   ''
  })

  const { title, notes, start, end } = formValues
  const { startError, endError, titleError } = inputError

  const handleInputChange = ({ target }) => {
    setFormValues({
      ...formValues,
      [target.name]: target.value
    })
  }

  const validateForm = () => {
    let startDay = moment(start)
    let endDate = moment(end)    

    setInputError({ 
      startError: !startDay.isValid(),
      endError:   !endDate.isValid(),
    })

    if (!startDay.isValid() || !endDate.isValid()) {
      return false
    }

    if (title.trim().length <= 2) {
      setInputError({
        ...formValues,
        titleError: true,
      })
      return false;
    }

    if (startDay.isSameOrAfter( endDate )) {
      setInputError({
        ...formValues,
        endError: true,
      })
      return false;
    }

    setInputError({ 
      startError: false,
      endError:   false,
      titleError: false
    })

    return true;
  }

  const handleSubmit = () => {
    if( validateForm() ) {
      console.log('el value', formValues)
    }
  }

  return (
    <Dialog
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
      className="calendarModal"
      onClose={ closeModal }
      open={ modalOpen }
      TransitionComponent={ Transition }
      keepMounted
    >
      <DialogTitle id="alert-dialog-slide-title">Crear un evento</DialogTitle>
      <DialogContent>
        <form noValidate autoComplete="off">
          <TextField
            onChange={ handleInputChange }
            onBlur={ validateForm }
            error={ startError }
            id="datetime-local"
            label="Fecha y hora de inicio"
            type="datetime-local"
            name="start"
            helperText={ startError ? 'Este campo es obligatorio' : ''}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            onChange={ handleInputChange }
            onBlur={ validateForm }
            error={ endError }
            id="datetime-local"
            label="Fecha y hora final"
            type="datetime-local"
            name="end"
            helperText={ endError ? 'Este campo es obligatorio y no puede ser menor a la fecha de inicio' : ''}
            InputLabelProps={{
              shrink: true
            }}
          />
          <TextField 
            id="outlined-basic" 
            label="Titulo" 
            name="title" 
            variant="outlined" 
            value={ title }
            error={ titleError }
            helperText={ titleError ? 'Este campo es obligatorio' : ''}
            onChange={ handleInputChange } 
            onBlur={ validateForm }
          />
          <TextField
            id="outlined-multiline-static"
            label="Notas"
            multiline
            rows={4}
            variant="outlined"
            name="notes"
            value={ notes }
            onChange={ handleInputChange } 
          />
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={ closeModal } color="primary"> Cancelar </Button>
        <Button variant="contained" type="button" color="primary" className="btn-primary" onClick={ handleSubmit }> Guardar </Button>
      </DialogActions>
    </Dialog>
  )
}
