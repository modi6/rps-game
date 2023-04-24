class EventEmitter {

    static cbObjects = {};

    static on(event, callback) {

        if (!EventEmitter.cbObjects[event]) {
            EventEmitter.cbObjects[event] = [];
        }

        EventEmitter.cbObjects[event].push(callback);

    }

    static emit(event, ...args) {

        let cbs = EventEmitter.cbObjects[event];

        if (cbs) {
            cbs.forEach(x => x(...args));
        }
    }
}

//done