import { Calendar, momentLocalizer } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import moment from 'moment'
import Topbar from '../general/topbar'
import PropTypes from 'prop-types';

export default function MyCalendar({data, setWindow, setChosenProj}){

  MyCalendar.propTypes = {
    data: PropTypes.array.isRequired,
    setWindow: PropTypes.func.isRequired,
    setChosenProj: PropTypes.func.isRequired,
  };

  const localizer = momentLocalizer(moment)
  
  const myEventsList = data.map((project) => {

    return {
      title: project.name,
      start: new Date(project.created),
      end: new Date(project.deadline),
    }
    
  }
  )

  const goToProject = (name) => {
   
    const project = data.find((project) => project.name === name)
    setChosenProj(project)
    setWindow("Task")
    
  }
  
  return (
  <>
  <Topbar setTitle={"Calendar"} search={false} />
  <div className="p-7">
    <div className="bg-white/70 p-5 rounded-xl">
      <Calendar
        localizer={localizer}
        events={myEventsList}
        startAccessor="start"
        endAccessor="end"
        onSelectEvent={(event) => goToProject(event.title)}
        style={{ height: 500 }}
      />
    </div>
  </div>
  </>
)
}