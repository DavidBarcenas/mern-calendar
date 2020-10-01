import React, { useState } from 'react'
import moment from 'moment'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Slide, TextField } from '@material-ui/core';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const CalendarModal = ({ event, open, setOpen  }) => {

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
    console.log('form', validateForm())

    if( validateForm() ) {
      console.log('el value', formValues)
    }
  }

  return (
    <Dialog
      open={true}
      TransitionComponent={Transition}
      keepMounted
      onClose={() => setOpen(false)}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
      className="calendarModal"
    >
      <DialogTitle id="alert-dialog-slide-title">Crear un evento</DialogTitle>

      <DialogContent>
      <form noValidate autoComplete="off">
        <TextField
          onChange={ handleInputChange }
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
        <Button onClick={() => setOpen(false)} color="primary">
          Cancelar
        </Button>
        <Button variant="contained" type="button" color="primary" className="btn-primary" onClick={ handleSubmit }>
          Guardar
        </Button>
      </DialogActions>
    </Dialog>
  )
}
