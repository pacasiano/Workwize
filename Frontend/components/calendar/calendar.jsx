import Topbar from '../general/topbar'
import PropTypes from 'prop-types';
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import interactionPlugin from '@fullcalendar/interaction' // a plugin!
import { useState, useEffect } from 'react';
import moment from 'moment';
import Label from '../general/label';
import { useParams } from 'react-router-dom';

export default function MyCalendar({ setChosenProj, setAddProj}){

  const { id } = useParams();
  const [project, setProject] = useState({})
  const [subtasks, setSubtasks] = useState([])
  const [Labels, setLabels] = useState([])

  useEffect(() => {
    fetch(`http://localhost:8000/api/tasks/${id}/`)
    .then(res => res.json())
    .then(data => {setProject(data)});

    fetch('http://localhost:8000/api/subtasks/')
    .then(res => res.json())
    .then(data => {setSubtasks(data)});

    fetch(`http://localhost:8000/api/labels/`)
    .then(res => res.json())
    .then(data => {setLabels(data)});
  }, [])

  MyCalendar.propTypes = {
    projectInfo: PropTypes.object.isRequired,
    setChosenProj: PropTypes.func.isRequired,
    setAddProj: PropTypes.func.isRequired
  };

  // get all subtask where project.task_id is in subtasks.task_id
  const data = subtasks.filter((subtask) => subtask.task_id === project.task_id);
  // get all labels where label.subtask_id is in data.subtask_id
  const labels = Labels.filter((label) => data.map((t) => t.subtask_id).includes(label.subtask_id));

  const myEventsList = data.map((subtask) => {
    const label = labels.filter((label) => label.subtask_id === subtask.subtask_id);
    return {
      id: subtask.subtask_id,
      title: subtask.subtask_name,
      start: subtask.start_date,
      end: subtask.end_date,
      desc: subtask.description,
      states: label.map((tag) => ({word: tag.label_name, color: tag.color})),
      color: project.color,
    }
  }
  )

  console.log(myEventsList)

  const goToProject = (id) => {
    // find the subtask where subtask_id is equal to id
    const intId = parseInt(id, 10);
    const task = subtasks.find((subtask) => subtask.subtask_id === intId)
    setChosenProj(task)
    window.location.href = '/project/calendar';
  }

  const handleDateSelect = (info) => {
    setAddProj({show: true, data: {start: info.startStr, end: moment(info.endStr).subtract(1, 'days').format('YYYY-MM-DD')}})
  };
  
  return (
  <div className="max-h-screen overflow-y-scroll">
  <Topbar setTitle={"Calendar"} search={false} />
  <div className="p-7">
    <div className="bg-white/70 p-5 rounded-xl">

      <FullCalendar
        plugins={[ dayGridPlugin, interactionPlugin ]}
        select={(info) => handleDateSelect(info)}
        eventClick={(info) => goToProject(info.event.id)}
        events={myEventsList}
        eventContent={(eventInfo) => {
          return (
            <div className="p-1">
              <div className="flex flex-wrap gap-1">
              {eventInfo.event.extendedProps.states.map((tag, index) => (
                <Label key={index} word={tag.word} color={tag.color} type={"1"} />
              ))}
              </div>
              <b>{eventInfo.event.title}</b>
              <p className="text-wrap text-xs font-light">{eventInfo.event.extendedProps.desc}</p>
            </div>
          );
        }}
        height={640}
        editable={true}
        selectable={true}
        initialView="dayGridMonth"
      />
        
    </div>
  </div>
  </div>
)
}
