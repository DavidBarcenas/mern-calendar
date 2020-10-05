import React, { useEffect, useState } from 'react'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Icon, IconButton, Slide, TextField } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { addNewEvent, deleteEvent, eventSetActive, updateEvent } from '../../redux/actions/events';
import { uiCloseModal } from '../../redux/actions/ui';
import { dateFormat } from '../../utils/format';
import moment from 'moment'

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ ref } { ...props } />;
});

const initEvent = {
  title: '',
  notes: '',
  start: '',
  end:   ''
}

export const CalendarModal = () => {

  const dispatch = useDispatch()
  const {modalOpen} = useSelector(state => state.ui)
  const {activeEvent} = useSelector(state => state.calendar)
  const [formValues, setFormValues] = useState(initEvent)
  const [inputError, setInputError] = useState({
    startError: false,
    endError:   false,
    titleError: false
  })

  const { title, notes, start, end } = formValues
  const { startError, endError, titleError } = inputError

  useEffect(() => {
    if(activeEvent) {
      setFormValues({
        ...activeEvent,
        start: dateFormat(activeEvent.start),
        end: dateFormat(activeEvent.end),
      })
    } else {
      setFormValues(initEvent)
    }
  }, [activeEvent])

  const handleInputChange = ({target}) => {
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

    if (startDay.isSameOrAfter(endDate)) {
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
    if(validateForm()) {
      if(activeEvent && !activeEvent.slot) {
        dispatch(updateEvent({
          ...formValues,
          start: moment(start).toDate(),
          end: moment(end).toDate(),
        }))
      } else {
        dispatch(addNewEvent({ 
          ...formValues, 
          start: moment(start).toDate(),
          end: moment(end).toDate(),
          id: new Date().getTime() ,
          user: {
            _id: 'abc123',
            name: 'David Barcenas'
          }
        }))
      }

      closeModal()
    }
  }

  const closeModal = () => {
    dispatch( uiCloseModal() )
    dispatch( eventSetActive(null) )
  }

  const handleDelete = () => {
    dispatch(deleteEvent())
    dispatch(uiCloseModal())
  }

  return (
    <Dialog
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
      className="calendarModal"
      open={modalOpen}
      TransitionComponent={Transition}
      keepMounted
    >
      <DialogTitle id="alert-dialog-slide-title">
        <span>{activeEvent && !activeEvent.slot ? 'Editar evento' : 'Crear evento'}</span>
        <IconButton onClick={closeModal}> <Icon>Cancel</Icon> </IconButton >
      </DialogTitle>
      <DialogContent>
        <form noValidate autoComplete="off">
          <TextField
            onChange={handleInputChange}
            onBlur={validateForm}
            error={startError}
            id="datetime-local"
            label="Fecha y hora de inicio"
            type="datetime-local"
            name="start"
            helperText={startError ? 'Este campo es obligatorio' : ''}
            value={start}
            InputLabelProps={{
              shrink: true,
            }}
            
          />
          <TextField
            onChange={handleInputChange}
            onBlur={validateForm}
            error={endError}
            id="datetime-local"
            label="Fecha y hora final"
            type="datetime-local"
            name="end"
            helperText={endError ? 'Este campo es obligatorio y no puede ser menor a la fecha de inicio' : ''}
            value={end}
            InputLabelProps={{
              shrink: true
            }}
          />
          <TextField 
            id="outlined-basic" 
            label="Titulo" 
            name="title" 
            variant="outlined" 
            value={title}
            error={titleError}
            helperText={titleError ? 'Este campo es obligatorio' : ''}
            onChange={handleInputChange} 
            onBlur={validateForm}
          />
          <TextField
            id="outlined-multiline-static"
            label="Notas"
            multiline
            rows={4}
            variant="outlined"
            name="notes"
            value={notes}
            onChange={handleInputChange} 
          />
        </form>
      </DialogContent>
      <DialogActions>
        {
          activeEvent && !activeEvent.slot  ? 
            <Button onClick={handleDelete} color="secondary"> Eliminar </Button> :
            <Button onClick={closeModal} color="primary"> Cancelar </Button>
        }
        <Button variant="contained" type="button" color="primary" className="btn-primary" onClick={handleSubmit}> Guardar </Button>
      </DialogActions>
    </Dialog>
  )
}
