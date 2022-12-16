
import { Calendar, Views, momentLocalizer } from 'react-big-calendar'
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop'
import moment from 'moment'
import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react'
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.scss'
import { UserContext } from '../../context/User';
import CalendarModal from './EventModal';
import axios from 'axios';
import { API_URL } from '../../context/Const';
const localizer = momentLocalizer(moment) // or globalizeLocalizer

export default function MyCalendar({ group, socket }) {

    const { user } = useContext(UserContext);

    const [showModal, setShowModal] = useState(false);
    const [event, setEvent] = useState({});

    const [events, setEvents] = useState([]);

    const [view, setView] = useState(Views.MONTH);
    const [date, setDate] = useState(new Date());


    useEffect(() => {
        socket.on("refreshCalendar", () => {

            axios.get(API_URL + "/events/group/" + group._id).then(
                (res) => {
                    setEvents(res.data.map((ev) => ({ ...ev, start: new Date(ev.start), end: new Date(ev.end) })));
                },
                (err) => {
                    console.log(err);
                }
            );
        });
        return () => {
            socket.off('refreshCalendar')
        }
    }, []);

    useEffect(() => {
        axios.get(API_URL + "/events/group/" + group._id).then(
            (res) => {
                setEvents(res.data.map((ev) => ({ ...ev, start: new Date(ev.start), end: new Date(ev.end) })));
            },
            (err) => {
                console.log(err);
            }
        );
    }, [group._id])



    const onEventResize = useCallback(({ event, start, end }) => {
        axios.post(API_URL + "/events/update/" + event._id, { ...event, start, end }).then(
            () => {
                setEvents((prev) => {
                    const filtered = prev.filter((ev) => ev._id !== event._id);
                    return [...filtered, { ...event, start, end }];
                });
                socket.emit("refreshCalendar");
            }, (err) => {
                console.log(err);
            });
    }, [setEvents, socket]);

    const onEventDrop = useCallback(({ event, start, end, isAllDay = false }) => {
        let newEnd = end;
        if (event.allDay && !isAllDay) {
            newEnd = moment(start).endOf('day').toDate();
        }
        axios.post(API_URL + "/events/update/" + event._id, { ...event, start, end: newEnd, allDay: isAllDay ? true : false }).then(
            () => {
                setEvents((prev) => {
                    const filtered = prev.filter((ev) => ev._id !== event._id);
                    return [...filtered, { ...event, start, end: newEnd, allDay: isAllDay ? true : false }];
                });
                socket.emit("refreshCalendar");
            }, (err) => {
                console.log(err);
            });

    }, [setEvents, socket]);

    const onSelectSlot = useCallback(({ start, end, action }) => {
        // setEvents((prev) => {
        //     const newEvent = { start, end, id: prev.length + 1, title: "New Event" };
        //     return [...prev, newEvent];

        // })
        if (action === "select") {
            setEvent({
                start, end,
                title: "New Event",
                description: "",
                tags: [],
                _groupId: group._id,
                _id: null,
                allDay: false
            });
            setShowModal(true);
        }
    }, [setEvent, setShowModal, group]);

    const onSelectEvent = useCallback((event) => {
        setEvent(event);
        setShowModal(true);
    }, [setEvent, setShowModal]);




    const DnDCalendar = withDragAndDrop(Calendar);

    return <div className="h-100 fade overflow-auto fade bg-light p-3"
        id="Calendar"
        role="tabpanel" aria-labelledby="Calendar-tab"
    >
        <CalendarModal show={showModal}
            onHide={() => { setShowModal(false); socket.emit('refreshCalendar'); }}
            group={group}
            event={event}
        />
        {showModal && <div className='modal-backdrop fade show'></div>}
        <DnDCalendar
            localizer={localizer}
            showMultiDayTimes
            step={60}


            onView={setView}
            view={view}

            date={date}
            onNavigate={setDate}


            events={events}
            onEventResize={onEventResize}
            onEventDrop={onEventDrop}
            onSelectSlot={onSelectSlot}
            onSelectEvent={onSelectEvent}

            resizable
            selectable={group.owner === user._id}
            draggableAccessor={group.owner !== user._id}
            popup
        />
    </div>
}