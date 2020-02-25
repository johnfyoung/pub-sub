(function () {
  var EventEmitter = {
    /**
     * Suscribe to an event
     * @param {String} ev event label
     * @param {Function} listener a callback function
     * @return {Object} a subscription reciept in the form of a tuple: event name and reciept token
     */
    on: function (ev, listener) {
      var calls = this._listeners || (this._listeners = {});
      var token = this._uuid();
      (this._listeners[ev] || (this._listeners[ev] = {}))[token] = listener;

      return {
        ev,
        token
      };
    },

    /**
     * Unsubscribe from an events
     * @param {IObject} ev a tuple of event name and reciept token
     */
    off: function (reciept) {
      if (this._exists(reciept.ev) && typeof this._listeners[ev][reciept.token] != "undefined") {
        delete this._listeners[ev][reciept.token];
      }

      return this;
    },

    /**
     * Dispatches the event
     * 
     * First argument is the event name, after which akes an optional argument list to be used by the callbacks
     * @param {String} ev event label
     */
    dispatch: function () {
      var args = Array.prototype.slice.call(arguments, 0);

      var ev = args.shift();

      var i, l;

      if (this._exists(ev)) {
        var tokens = Object.keys(this._listeners[ev]);
        for (i = 0, l = tokens.length; i < l; i++)
          this._listeners[ev][tokens[i]].apply(this, args);
      }

      return this;
    },

    /**
     * Checks for the existence of an event name
     * @param {*} ev 
     */
    _exists: function (ev) {
      var list, calls;
      if (!(calls = this._listeners)) return false;
      if (!(list = this._listeners[ev])) return false;

      return true;
    },

    _uuid: function () {
      var dt = new Date().getTime();
      var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (dt + Math.random() * 16) % 16 | 0;
        dt = Math.floor(dt / 16);
        return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
      });
      return uuid;
    }
  };

  window.EventEmitter = EventEmitter;
})();