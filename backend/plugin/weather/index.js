/**
 * Created by Administrator on 06/03/2017.
 */
"use strict";

module.exports = {

    handle: (intentObject, responce) => {

        switch (intentObject.name)
        {
            case "weather":
                responce("IT WORKS");
                break;
            case "temperature":
                responce("hi temperature",intentObject);
                break;
            default :
                console.warn("unknown intent");
        }

    }
};