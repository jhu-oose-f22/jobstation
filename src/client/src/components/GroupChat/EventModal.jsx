import axios from "axios";
import { useCallback, useContext, useEffect, useState } from "react";
import { API_URL } from "../../context/Const";
import { UserContext } from "../../context/User";
import Error from "../Utils/Error";
import { TagSelection } from "../Utils/Tag";

export default function CalendarModal({ event, show, onHide, group }) {
    const { user } = useContext(UserContext);
    const readOnly = user._id !== group.owner;

    const [error, setError] = useState(readOnly ? "You are not the owner of this group!" : null);
    const [hasModified, setHasModified] = useState(false);

    // fields
    const [eventTitle, setEventTitle] = useState(event.title || "New Event");
    const [eventDescription, setEventDescription] = useState(event.description || "");
    const [eventStartTime, setEventStartTime] = useState(event.start || new Date());
    const [eventEndTime, setEventEndTime] = useState(event.end || new Date());
    const [eventTags, setEventTags] = useState(event.tags || []);
    const [allDay, setAllDay] = useState(event.allDay || false);

    useEffect(() => {
        setEventStartTime(event.start || new Date());
        setEventEndTime(event.end || new Date());
        setEventTitle(event.title || "New Event");
        setEventDescription(event.description || "");
        setEventTags(event.tags || []);
        setAllDay(event.allDay || false);
    }, [event.start, event.end, event.title, event.description, event.tags, event.allDay])

    useEffect(() => {
        setError(null);
        setHasModified(eventTitle !== event.title ||
            eventDescription !== event.description ||
            eventStartTime !== event.start ||
            eventEndTime !== event.end ||
            eventTags !== event.tags ||
            allDay !== event.allDay)
    }, [eventTitle, eventDescription, eventStartTime, eventEndTime, eventTags, allDay, event]);

    const onSubmit = useCallback(async (e) => {
        e.preventDefault();
        if (readOnly) {
            return;
        }
        if (eventTitle === "") {
            setError("Event title cannot be empty!");
            return;
        }
        if (eventStartTime > eventEndTime) {
            setError("Event start time cannot be after end time!");
            return;
        }
        const newEvent = {
            ...event,
            title: eventTitle,
            description: eventDescription,
            start: new Date(eventStartTime),
            end: new Date(eventEndTime),
            tags: eventTags,
            allDay: allDay,
        };
        if (newEvent._id) {
            axios.post(API_URL + "/events/update/" + newEvent._id, newEvent).then(
                (res) => {
                    console.log(res);
                    onHide();
                },
                (err) => setError(err.message)
            );
        } else {
            axios.post(API_URL + "/events/create", newEvent).then(
                (res) => {
                    console.log(res);
                    if (res.status === 201) {
                        onHide();
                    } else {
                        setError(res.data.message);
                    }
                },
                (err) => setError(err.message)
            );
        }
    }, [eventTitle, eventDescription, eventStartTime, eventEndTime, eventTags, allDay, event, onHide, readOnly]);


    return <div className={"modal fade " + (show ? "show" : "")}
        style={{ display: show ? "block" : "none" }}
        tabIndex="-1" role="dialog" aria-labelledby="eventModalLabel" aria-hidden="true"
        aria-modal="true"
    >
        <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="eventModalLabel">Event Info</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"
                        onClick={() => onHide()}
                    />
                </div>
                <div className="modal-body">
                    {error && <Error error={error} />}
                    <form className="p-3"
                        onSubmit={onSubmit}
                    >
                        {hasModified && <div className="w-100 d-flex">
                            <button className="btn btn-danger btn-sm ms-auto" type="button" onClick={
                                () => {
                                    setEventTitle(event.title);
                                    setEventDescription(event.description);
                                    setEventStartTime(event.start);
                                    setEventEndTime(event.end);
                                    setEventTags(event.tags);
                                    setAllDay(event.allDay);
                                }
                            }>
                                <i className="fa-solid fa-rotate-right me-2"></i>
                                Reset
                            </button>
                        </div>}
                        <div className={"form-group mt-2" + (event.title !== eventTitle ? " border border-warning rounded p-3" : "")}>
                            <label htmlFor="event-title" className="form-label">Title</label>
                            <input type="text" className="form-control" id="event-title" value={eventTitle} onChange={e => setEventTitle(e.target.value)} readOnly={readOnly} />
                        </div>
                        <div className="row p-3">
                            <div className={"col-md-6 form-group mt-2" + (event.start !== eventStartTime ? " border border-warning rounded p-3" : "")}>
                                <label htmlFor="event-start" className="form-label">Start</label>
                                <input type="datetime-local" className="form-control" id="event-start" value={eventStartTime.toISOString().substring(0, 16)}
                                    onChange={e => {
                                        const newStart = new Date(e.target.value);
                                        if (newStart > eventEndTime) {
                                            setError("Start time must be before end time!");
                                            return;
                                        }
                                        setError(null);
                                        setEventStartTime(newStart);
                                    }}
                                    readOnly={readOnly} />
                            </div>
                            <div className={"col-md-6 form-group mt-2" + (event.end !== eventEndTime ? " border border-warning rounded p-3" : "")}>
                                <label htmlFor="event-end" className="form-label">End</label>
                                <input type="datetime-local" className="form-control" id="event-end" value={eventEndTime.toISOString().substring(0, 16)}
                                    onChange={e => {
                                        const newEnd = new Date(e.target.value);
                                        if (newEnd < eventStartTime) {
                                            setError("End time must be after start time!");
                                            return;
                                        }
                                        setError(null);
                                        setEventEndTime(newEnd);
                                    }}
                                    readOnly={readOnly} />
                            </div>
                        </div>
                        <div className={"form-group mt-2 " + (event.tags !== eventTags ? "border border-warning rounded p-3" : "")}>
                            <TagSelection tag={eventTags} setTag={readOnly ? () => { } : setEventTags} setError={readOnly ? () => { } : setError} />
                        </div>

                        <div className={"form-group mt-2" + (event.description !== eventDescription ? " border border-warning rounded p-3" : "")}>
                            <label htmlFor="event-description" className="form-label">Description</label>
                            <textarea className="form-control" id="event-description" rows="3" value={eventDescription} onChange={e => setEventDescription(e.target.value)} readOnly={readOnly} />
                        </div>

                        {!readOnly && <button type="submit" className="w-100 btn btn-primary mt-3">Save changes</button>}
                        {!readOnly && event._id && <button type="button" className="w-100 btn btn-danger mt-3"
                            onClick={() => {
                                if (readOnly) return;
                                axios.delete(API_URL + "/events/delete/" + event._id).then(
                                    (res) => {
                                        console.log(res);
                                        onHide();
                                    },
                                    (err) => setError(err.message)
                                );

                            }}
                        >Delete Event</button>}


                    </form>

                </div>
            </div>
        </div>
    </div>
}