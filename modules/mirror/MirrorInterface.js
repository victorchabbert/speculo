"use strict";

////private functions of MirrorInterface
/**
 * Options to filter the recipients
 *
 * @param mirrors
 */
const publishOptions = (mirrors) => ({
    "internal" : mirrors
    //user: this.user
});

/**
 * Interface to interact with the mirrors
 */
class MirrorInterface {

    constructor (server, pluginDefinition, intentObject) {
        this._server = server;
        this._pluginDefinition = pluginDefinition;

        //TODO retrieve from bdd using intentObject
        //this.user = user;
        //this.mirrors = mirrors;
    }

    /**
     * Send the object to be displayed to a mirror
     *
     * @param object JSON parsable object
     * @param mirrors Array[mirror]|null array of mirror contained in this.mirrors or null to send the object to every display
     */
    display(object, mirrors = null) {
        this._server.publish(`/plugin/${this._pluginDefinition.name}`, object, {
            internal : mirrors
            //user: this.user
        });
    }

    /**
     * Show the plugin on the client mirror
     *
     * @param mirrors object of this.mirrors or null to show the plugin on every display
     */
    show(mirrors = null) {
        this._server.publish(`/system`, {"show": this._pluginDefinition.name}, {
            internal : mirrors
            //user: this.user
        });
    }

    /**
     * Hide the plugin on the client mirror
     *
     * @param mirrors object of this.mirrors or null to hide the plugin on every display
     */
    hide(mirrors = null) {
        this._server.publish(`/system`, {"hide": this._pluginDefinition.name}, {
            internal : mirrors
            //user: this.user
        });
    }
}

module.exports = MirrorInterface;