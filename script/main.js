// Import the JSON file using require
const events = require('../data/events.json');
/* to import different event and their data:
    events[event number(integer)]
        .img: image url
        .title: name of event
        .speaker: person giving the talk
        .date: in Date time string format use javascript Date() constructor to access - new Date(events[i].date)
        .location: location string
        .locationUrl: Google maps url
        .description: description about event
*/

console.log(new Date(events[5].date)); // This will log the date of the first event