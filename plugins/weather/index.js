/**
 * Created by Administrator on 06/03/2017.
 */
"use strict";

module.exports = {

    /**
     *
     * @param intentObject
     * @param mirrors MirrorInterface
     */
    handle: (intentObject, mirrors) => {

        switch (intentObject.name)
        {
            case "weather":
                mirrors.display("IT WORKS");
                break;
            case "temperature":
                mirrors.display("hi temperature",intentObject);
                break;
            default :
                console.warn("unknown intent");
        }

    }
};