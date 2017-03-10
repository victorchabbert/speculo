/**
 * Created by Administrator on 06/03/2017.
 */
"use strict";

module.exports = {

    handle: (intentObject, response) => {

        switch (intentObject.name)
        {
            case "weather":
                response("IT WORKS");
                break;
            case "temperature":
                response("hi temperature",intentObject);
                break;
            default :
                console.warn("unknown intent");
        }

    }
};