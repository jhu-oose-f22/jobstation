
import { Calendar, Views, momentLocalizer } from 'react-big-calendar'
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop'
import moment from 'moment'
import React, { useMemo } from 'react'
import 'react-big-calendar/lib/css/react-big-calendar.css';
const localizer = momentLocalizer(moment) // or globalizeLocalizer

const demoEvents = [
    {
        id: 1,
        title: "A",
        start: new Date(2022, 11, 10),
        end: new Date(2022, 11, 11),
        resource: "OA"
    }
]

export default function MyCalendar(props) {

    const { components, defaultDate, max, views } = useMemo(
        () => ({
            views: Object.keys(Views).map((k) => Views[k]),
        }),
        []
    )

    const DnDCalendar = withDragAndDrop(Calendar);

    return <div className="h-100 fade overflow-auto fade bg-light p-3"
        id="Calendar"
        role="tabpanel" aria-labelledby="Calendar-tab"
    >
        <DnDCalendar
            localizer={localizer}
            showMultiDayTimes
            step={60}
            events={demoEvents}
            resizable
        />
    </div>
}