import mongoose, { mongo } from "mongoose";
import Group from "./group.js";

const eventSchema = mongoose.Schema({
    title: { type: String, required: true },
    start: { type: Date, required: true },
    end: { type: Date, required: true },
    allDay: { type: Boolean, default: false },
    tags: [String],
    description: String,
    _groupId: { type: mongoose.ObjectId, ref: "Group" },
}, { timestamps: true });

class EventClass {
    static async getEventsByGroup({ groupId }) {
        const events = await this.find({ _groupId: groupId });
        if (!events) {
            const group = await Gro
            if (!group) {
                throw new Error('The group is not valid');
            } else {
                return [];
            }
        }
        return events;
    }

    static async createEvent({ title, start, end, allDay = false, tags = [], description = "", _groupId }) {
        if (title && start && end && _groupId) {
            const group = await Group.findById(_groupId);
            if (!group) {
                throw new Error('The group is not valid');
            }
            const event = await this.create({
                title, start: new Date(start), end: new Date(end), allDay, tags, description, _groupId
            });
            return event;
        }
        else {
            throw new Error('Missing component of an event');
        }
    }

    static async deleteEvent({ eventId }) {
        const event = await this.findById(eventId);
        if (!event) {
            throw new Error('The event is not valid');
        }
        await event.remove();
    }

    static async updateEvent({ eventId }, { title, start, end, allDay = false, tags = [], description = "" }) {
        if (title && start && end) {
            const event = await this.findById(eventId);
            if (!event) {
                throw new Error('The event is not valid');
            }
            event.title = title;
            event.start = new Date(start);
            event.end = new Date(end);
            event.allDay = allDay;
            event.tags = tags;
            event.description = description;
            await event.save();
            return event;
        } else {
            throw new Error('Missing component of an event');
        }
    }

    static async getEventById({ eventId }) {
        const event = await this.findById(eventId);
        if (!event) {
            throw new Error('The event is not valid');
        }
        return event;
    }
}

eventSchema.loadClass(EventClass);
const Events = mongoose.model("Event", eventSchema);

export default Events;