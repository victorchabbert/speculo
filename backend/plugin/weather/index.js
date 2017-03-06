/**
 * Created by Administrator on 06/03/2017.
 */
"use strict";

module.exports = {

    //call on weather intent
    //must define together intentObject struct
    weather: (intentObject, responce) => {
        //process...
        //return obj to display
        responce("hi weather",intentObject);
    },

    temperature: (intentObject, responce) => {
        responce("hi temperature",intentObject);
    }
};