class EventEmitter {
    constructor() {
        this.events = {};
    }

    emit(event, ...arg) {
        if (!this.events[event]) {
            return null;
        }

        this.events[event].forEach(event => {
            event.apply(this, arg);
        });
    }

    subscribe(event, cb) {
        if (!this.events[event]) {
            this.events[event] = [];
        }
        this.events[event].push(cb);
    }
}

export default EventEmitter;