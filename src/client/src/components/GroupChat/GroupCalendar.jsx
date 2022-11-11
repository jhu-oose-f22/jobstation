
import { Calendar, Views, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import React, { useMemo } from 'react'

import ToDo from '../Utils/ToDo'

const localizer = momentLocalizer(moment) // or globalizeLocalizer
const ColoredDateCellWrapper = ({ children }) =>
    React.cloneElement(React.Children.only(children), {
        style: {
            backgroundColor: 'lightblue',
        },
    })


export default function MyCalendar(props) {

    const { components, defaultDate, max, views } = useMemo(
        () => ({
            components: {
                timeSlotWrapper: ColoredDateCellWrapper,
            },
            defaultDate: new Date(2015, 3, 1),
            views: Object.keys(Views).map((k) => Views[k]),
        }),
        []
    )

    return <div className="h-100 fade overflow-auto"
        id="Calendar"
        role="tabpanel" aria-labelledby="Calendar-tab"
    >
        <ToDo />
        {/* <Calendar
            localizer={localizer}
            components={components}
            defaultDate={defaultDate}
            showMultiDayTimes
            step={60}
            views={views}
        /> */}
    </div>
}