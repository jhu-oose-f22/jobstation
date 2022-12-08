import Events from "../models/event.js";


export const getEventsByGroup = async (req, res) => {
    try {
        const events = await Events.getEventsByGroup({ groupId: req.params.groupId });
        res.status(200).json(events);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const createEvent = async (req, res) => {
    try {
        const event = await Events.createEvent(req.body);
        res.status(201).json(event);
    } catch (error) {
        res.status(204).json({ message: error.message });
    }
}

export const deleteEvent = async (req, res) => {
    try {
        await Events.deleteEvent({ eventId: req.params.eventId });
        res.status(200).json({ message: 'Event deleted successfully' });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const updateEvent = async (req, res) => {
    try {
        const event = await Events.updateEvent({ eventId: req.params.eventId }, req.body);
        res.status(200).json(event);
    } catch (error) {
        console.log(error)
        res.status(404).json({ message: error.message });
    }
}

export const getEventById = async (req, res) => {
    try {
        const event = await Events.getEventById({ eventId: req.params.eventId });
        res.status(200).json(event);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}