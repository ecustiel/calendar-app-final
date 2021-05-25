import React, { useState } from 'react'
import {Calendar, momentLocalizer} from 'react-big-calendar'
import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment'

import { Navbar } from '../ui/Navbar'

import 'react-big-calendar/lib/css/react-big-calendar.css'
import { messages } from '../../helpers/calendar-messages-es'

import { CalendarEvent } from './CalendarEvent'
import { CalendarModal } from './CalendarModal'
//importaciones para poner el calendario en español
import 'moment/locale/es';
import { uiOpenModal } from '../../actions/ui'
import { eventSetActive, eventClearActiveEvent, eventStartLoading } from '../../actions/events'
import { AddNewFab } from '../ui/AddNewFab'
import { DeleteEventFab } from '../ui/DeleteEventFab'
import { useEffect } from 'react'
moment.locale('es');
//localizer para usar la localizacion de moment
const localizer = momentLocalizer(moment) 

//Los eventos, estan guardados en un array y son objetos con las descripciones requeridas por calendar


export const CalendarScreen = () => {

    const dispatch = useDispatch()
    const {events, activeEvent} = useSelector(state => state.calendar)
    const {uid} = useSelector(state => state.auth);

    const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'month');
    

    useEffect(() => {
        dispatch(eventStartLoading())
    }, [dispatch])

    //evento que se dispara cuando se hace doble click
    const onDoubleClick = (e) => {
        dispatch(uiOpenModal());
        
    }
    //evento que se dispara cuando se selecciona un evento
    const onSelectEvent = (e) => {
        
        dispatch(eventSetActive(e));
        
    }
    //evento para cuando cambio de vista
    const onViewChange = (e) => {
        setLastView(e);
        localStorage.setItem('lastView', e);
    }

    const onSelectorSlot = (e) => {
        dispatch(eventClearActiveEvent());
    }

    const eventStyleGetter = (event, start, end, isSelected) => {

       
        
        const style = {
            'background-color': (uid === event.user._id) ? "#367CF7" : "#465660",
            borderRadius: '0pc',
            opacity: 0.8,
            display: 'block',
            color: 'white'
        }

        return {
            style
        }
    }

    return (
        <div className='calendar-screen'>
            <Navbar />

            <Calendar
      localizer={localizer}
      events={events}
      startAccessor="start"
      endAccessor="end"
      messages={messages}
      eventPropGetter={eventStyleGetter}
      onDoubleClickEvent={onDoubleClick}
      onSelectEvent={onSelectEvent}
      onSelectorSlot={onSelectorSlot}
      selectable={true}
      onView={onViewChange}
      view={lastView}
      components={{
          event: CalendarEvent
      }}
    />

      <AddNewFab />
          {
              (activeEvent) && <DeleteEventFab />
              
          }
          
      <CalendarModal />
        </div>
    )
}
