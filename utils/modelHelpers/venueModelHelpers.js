const daysIndex = require("../../enums/daysIndex");
const model = require("../../models/venues")
const bookingModelHelpers = require("../modelHelpers/bookingModelHelpers")
const { default: mongoose } = require("mongoose");

const isTimeBetween = (startTime, endTime, checkTime, isInclusive = false) => {
    const start = new Date(`1970-01-01 ${startTime}`);
    const end = new Date(`1970-01-01 ${endTime}`);
    const check = new Date(`1970-01-01 ${checkTime}`);
    // if (isInclusive) {
    //     return start <= check && check < end;
    // }
    // return start < check && check < end;

    return start <= check && check <= end;

}

const appendLeadingZero = (data) => {
    data = data.toString()
    if (data && data.length < 2) {
        return `0${data}`
    }
    return data
}

const helpers = {
    frameAvailableTimings: async (venueId, sportId, date) => {
        return new Promise(async (resolve, reject) => {
            try {
                const _id = new mongoose.Types.ObjectId(venueId);
                const timings = []
                const venue = await model.findOne({ _id })


                let searchDate = new Date(date)
                searchDate = new Date(searchDate.getTime() - searchDate.getTimezoneOffset() * -60000);
                let searchDay = daysIndex[searchDate.getDay()]

                let dayBegin = new Date(searchDate), dayEnd = new Date(searchDate);
                dayBegin.setHours(0)
                dayBegin.setMinutes(0)
                dayBegin.setSeconds(0)
                dayEnd.setHours(23)
                dayEnd.setMinutes(59)
                dayEnd.setSeconds(59)

                const bookedVenue = await bookingModelHelpers.fetchByFilterWithoutPopulate({
                    venue_id: _id,
                    $and: [
                        {
                            date: {
                                $gte: dayBegin.toISOString()
                            }
                        },
                        {
                            date: {
                                $lte: dayEnd.toISOString()
                            }
                        }
                    ]
                })

                if (venue) {
                    venue.courts.map(oneCourt => {
                        let currentCourtBookings = bookedVenue.filter(b => b.court_id == oneCourt.id);
                        if (sportId == oneCourt.sport_id &&
                            oneCourt.opening_hours[searchDay]
                        ) {
                            oneCourt.opening_hours[searchDay].forEach((timeSlots) => {
                                let from = new Date(timeSlots.from);
                                let to = new Date(timeSlots.to);

                                let checkInBooking = (currentTime) => {
                                    let isBooked = false
                                    currentCourtBookings.map(ccb => {
                                        let bookStart = new Date(ccb.start_time);
                                        let bookEnd = new Date(ccb.end_time);
                                        let bookFromTime = `${appendLeadingZero(bookStart.getHours())}:${appendLeadingZero(bookStart.getMinutes())}:00`
                                        let bookToTime = `${appendLeadingZero(bookEnd.getHours())}:${appendLeadingZero(bookEnd.getMinutes())}:00`
                                        if (isTimeBetween(bookFromTime, bookToTime, currentTime, true)) {
                                            isBooked = true
                                        }
                                    })
                                    return isBooked
                                }

                                let pushToResult = (hrs, min) => {
                                    let h = hrs % 12;
                                    let meridian = hrs > 12 ? "PM" : "AM"
                                    let timeToPush = `${appendLeadingZero(h)}:${appendLeadingZero(min)} ${meridian}`
                                    !(timings.includes(timeToPush)) && timings.push(timeToPush)
                                }

                                for (let hour = 0; hour < 24; hour++) {
                                    let minute = 0;
                                    let fromTime = `${appendLeadingZero(from.getHours())}:${appendLeadingZero(from.getMinutes())}:00`
                                    let toTime = `${appendLeadingZero(to.getHours())}:${appendLeadingZero(to.getMinutes())}:00`
                                    let currentTime = `${appendLeadingZero(hour)}:${appendLeadingZero(minute)}:00`
                                    if (isTimeBetween(fromTime, toTime, currentTime)) {
                                        let isBooked = checkInBooking(currentTime)

                                        if (!(isBooked)) {
                                            pushToResult(hour, minute)
                                        }

                                    }
                                    minute = 30;
                                    currentTime = `${appendLeadingZero(hour)}:${appendLeadingZero(minute)}:00`
                                    if (isTimeBetween(fromTime, toTime, currentTime)) {
                                        let isBooked = checkInBooking(currentTime)
                                        if (!(isBooked)) {
                                            pushToResult(hour, minute)
                                        }
                                    }
                                }
                            })
                        }
                    })
                }

                resolve(timings)
            } catch (e) {
                reject(e)
            }
        })
    },

    frameDurations: async (venueId, sportId, date, start_time) => {
        return new Promise(async (resolve, reject) => {
            try {
                const _id = new mongoose.Types.ObjectId(venueId);
                const timings = []
                const venue = await model.findOne({ _id })


                let searchDate = new Date(date)
                searchDate = new Date(searchDate.getTime() - searchDate.getTimezoneOffset() * -60000);
                let searchDay = daysIndex[searchDate.getDay()]

                let dayBegin = new Date(searchDate), dayEnd = new Date(searchDate);
                dayBegin.setHours(0)
                dayBegin.setMinutes(0)
                dayBegin.setSeconds(0)
                dayEnd.setHours(23)
                dayEnd.setMinutes(59)
                dayEnd.setSeconds(59)

                const bookedVenue = await bookingModelHelpers.fetchByFilterWithoutPopulate({
                    venue_id: _id,
                    $and: [
                        {
                            date: {
                                $gte: dayBegin.toISOString()
                            }
                        },
                        {
                            date: {
                                $lte: dayEnd.toISOString()
                            }
                        }
                    ]
                })

                if (venue) {
                    venue.courts.map(oneCourt => {
                        let currentCourtBookings = bookedVenue.filter(b => b.court_id == oneCourt.id);
                        if (sportId == oneCourt.sport_id &&
                            oneCourt.opening_hours[searchDay]
                        ) {
                            oneCourt.opening_hours[searchDay].forEach((timeSlots) => {
                                let from = new Date(timeSlots.from);
                                let to = new Date(timeSlots.to);
                                let startingTime = new Date(start_time)
                                let previouslyAddedHr = startingTime.getHours();
                                let allowedTimingInMinutes = 0
                                let checkInBooking = (currentTime) => {
                                    let isBooked = false
                                    currentCourtBookings.map(ccb => {
                                        let bookStart = new Date(ccb.start_time);
                                        let bookEnd = new Date(ccb.end_time);
                                        let bookFromTime = `${appendLeadingZero(bookStart.getHours())}:${appendLeadingZero(bookStart.getMinutes())}:00`
                                        let bookToTime = `${appendLeadingZero(bookEnd.getHours())}:${appendLeadingZero(bookEnd.getMinutes())}:00`
                                        if (isTimeBetween(bookFromTime, bookToTime, currentTime, true)) {
                                            isBooked = true
                                        }
                                    })
                                    return isBooked
                                }

                                let pushToResult = (hrs, min) => {
                                    if ((previouslyAddedHr)%12 == hrs || previouslyAddedHr == hrs) {
                                        allowedTimingInMinutes += 30
                                    } else if ((previouslyAddedHr + 1)%12 == hrs || previouslyAddedHr + 1 == hrs) {
                                        allowedTimingInMinutes += 30
                                    } else {
                                        allowedTimingInMinutes = -1
                                    }
                                    let allowedTime = `${allowedTimingInMinutes / 60} hrs`;
                                    !(timings.includes(allowedTime)) && allowedTimingInMinutes != -1 && timings.push(allowedTime);
                                    previouslyAddedHr = hrs;
                                  


                                }

                                let minute = startingTime.getMinutes();
                                if(minute == 30){
                                    startingTime.setHours(previouslyAddedHr + 1)
                                    minute = 0
                                } else {
                                    minute = 30
                                }

                                for (let hour = startingTime.getHours(); hour < 24; hour++) {

                                    let fromTime = `${appendLeadingZero(from.getHours())}:${appendLeadingZero(from.getMinutes())}:00`
                                    let toTime = `${appendLeadingZero(to.getHours())}:${appendLeadingZero(to.getMinutes())}:00`
                                    let currentTime = `${appendLeadingZero(hour)}:${appendLeadingZero(minute)}:00`
                                    if (isTimeBetween(fromTime, toTime, currentTime)) {
                                        let isBooked = checkInBooking(currentTime)

                                        if (!(isBooked) && allowedTimingInMinutes != -1) {
                                            pushToResult(hour, minute)
                                        }
                                    }
                                    if (minute != 30) {
                                        minute = 30;
                                        currentTime = `${appendLeadingZero(hour)}:${appendLeadingZero(minute)}:00`
                                        if (isTimeBetween(fromTime, toTime, currentTime)) {
                                            let isBooked = checkInBooking(currentTime)
                                            if (!(isBooked) && allowedTimingInMinutes != -1) {
                                                pushToResult(hour, minute)
                                            }
                                        }
                                       
                                    }

                                    minute = 0;

                                }
                            })
                        }
                    })
                }

                resolve(timings)
            } catch (e) {
                reject(e)
            }
        })
    },

    create: async (data) => {
        const user = new model(data);
        return await user.save();
    },

    fetchAll: async () => {
        return await model.find().populate('courts.sport_id').exec()
    },

    fetchAllFeaturedVenues: async () => {
        return await model.find({ is_featured: true, enabled: true }).populate('courts.sport_id').exec()
    },

    getUniqueLocations: async () => {
        return await model.aggregate([
            {
                $group:
                {
                    _id: null,
                    location: {
                        $addToSet: {
                            city: "$address.city",
                            state: "$address.state",
                        }
                    }
                }
            }
        ])
    },

    fetchByFilter: async (filterData) => {
        return await model.findOne(
            {
                ...filterData

            }).populate('courts.sport_id').exec()
    },

    searchForBooking: async (filterData) => {
        return await model.find(
            {
                "address.city": filterData.location.city,
                "address.state": filterData.location.state,
                "courts.sport_id": filterData.sport.id,
                "available_days": {
                    $in: [filterData.selectedDay]
                },
                "courts.number_of_courts": {
                    $gt: 0
                }
            })
    },


    deleteDocumentById: async (id) => {
        const _id = new mongoose.Types.ObjectId(id);
        return await model.deleteOne({
            _id
        })
    },

    updateDocument: async (id, data) => {
        const _id = new mongoose.Types.ObjectId(id);
        return await model.updateOne({
            _id
        }, data)
    },


}

module.exports = helpers