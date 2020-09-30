import React, { useState } from 'react'
import moment from 'moment'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Slide, TextField } from '@material-ui/core';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const CalendarModal = ({ event, open, setOpen  }) => {

  const [date, setDate] = useState({
    start: '',
    end: '',
  })
  
  const handleStartDate = e => {
    setDate({
      ...date,
      start: moment(e.target.value).toDate()
    })
  }
  
  const handleEndDate = e => {
    setDate({
      ...date,
      end: moment(e.target.value).toDate()
    })
  }

  return (
    <Dialog
      open={open}
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
          onChange={ handleStartDate }
          id="datetime-local"
          label="Fecha y hora de inicio"
          type="datetime-local"
          name="startDate"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          onChange={ handleEndDate }
          error={ date.end < date.start }
          id="datetime-local"
          label="Fecha y hora final"
          type="datetime-local"
          name="endDate"
          helperText={ date.end < date.start ? 'La fecha final no puede ser menor a la de inicio' : ''}
          InputLabelProps={{
            shrink: true
          }}
        />

        <TextField id="outlined-basic" label="Titulo" variant="outlined" name="title" />

        <TextField
          id="outlined-multiline-static"
          label="Notas"
          multiline
          rows={4}
          variant="outlined"
        />
      </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setOpen(false)} color="primary">
          Cancelar
        </Button>
        <Button variant="contained" onClick={() => setOpen(false)} color="primary" className="btn-primary">
          Guardar
        </Button>
      </DialogActions>
    </Dialog>
  )
}
