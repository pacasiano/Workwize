import Topbar from '../general/topbar'
import PropTypes from 'prop-types';
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import interactionPlugin from '@fullcalendar/interaction' // a plugin!
import { useEffect, useState } from 'react';
import moment from 'moment';

export default function MyCalendar({data, setWindow, setChosenProj, setAddProj}){

  MyCalendar.propTypes = {
    data: PropTypes.array.isRequired,
    setWindow: PropTypes.func.isRequired,
    setChosenProj: PropTypes.func.isRequired,
    setAddProj: PropTypes.func.isRequired
  };

  const [myEventsList, setMyEventsList] = useState([]);

  useEffect(() => {
    const events = data.map((project) => ({
      title: project.name,
      start: new Date(project.start),
      end: new Date(project.end),
    }));
    
    setMyEventsList(events);
  }, [data]);

  const goToProject = (name) => {
    const project = data.find((project) => project.name === name)
    setChosenProj(project)
    setWindow("Task")
  }

  const handleDateSelect = (info) => {
    console.log(info)
    setAddProj({show: true, data: {start: info.startStr, end: moment(info.endStr).subtract(1, 'days').format('YYYY-MM-DD')}})
  };
  
  return (
  <>
  <Topbar setTitle={"Calendar"} search={false} />
  <div className="p-7">
    <div className="bg-white/70 p-5 rounded-xl">

      <FullCalendar
        plugins={[ dayGridPlugin, interactionPlugin ]}
        select={(info) => handleDateSelect(info)}
        eventClick={(info) => goToProject(info.event.title)}
        events={myEventsList}
        eventContent={(eventInfo) => {
          // Remove the time from the event title
          return (
            <>
              <b className="pl-1">{eventInfo.event.title}</b>
            </>
          );
        }}
        height={640}
        editable={true}
        selectable={true}
        initialView="dayGridMonth"
      />
        
    </div>
  </div>
  </>
)
}
