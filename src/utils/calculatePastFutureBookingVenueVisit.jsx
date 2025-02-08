import { parseISO, differenceInDays } from "date-fns";
import { load } from "./localStorage.mjs";

/**
 * calculates the next booking and visit and the days left for each of them.
 * @param {} profile - the profile data to calculate the next booking and visit
 * @returns {} nextBooking, daysLeft, nextVisit, daysLeftVisit
 */

export function calculateNextBookingAndVisit(profile) {
  let nextBooking = null;
  let daysLeft = null;
  let nextVisit = null;
  let daysLeftVisit = null;

  if (profile.name === load("profile").name) {
    const today = new Date();

    const futureBookings = profile.bookings
      .filter((booking) => parseISO(booking.dateFrom) > today)
      .sort((a, b) => parseISO(a.dateFrom) - parseISO(b.dateFrom));

    nextBooking = futureBookings.length > 0 ? futureBookings[0] : null;
    daysLeft = nextBooking
      ? differenceInDays(parseISO(nextBooking.dateFrom), today)
      : null;

    // const futureVisits = profile.venues
    //   .filter((venues) => parseISO(venues.dateFrom) > today)
    //   .sort((a, b) => parseISO(a.dateFrom) - parseISO(b.dateFrom));

    // nextVisit = futureVisits.length > 0 ? futureVisits[0] : null;
    // daysLeftVisit = nextVisit
    //   ? differenceInDays(parseISO(nextVisit.dateFrom), today)
    //   : null;
  }

  return { nextBooking, daysLeft, nextVisit, daysLeftVisit };
}

/**
 * calculates the next booking and the days left for the booking from the <profile>/bookings api endpoint
 * @param {*} booking - the booking data from the profile
 * @returns {number} nextBooking, daysLeft
 */

export function calculateNextBooking(booking) {
  let nextBooking = null;
  let daysLeft = null;

  if (
    booking.length > 0 &&
    booking[0].customer &&
    booking[0].customer.name === load("profile").name
  ) {
    const today = new Date();

    const futureBookings = booking
      .filter((booking) => parseISO(booking.dateFrom) > today)
      .sort((a, b) => parseISO(a.dateFrom) - parseISO(b.dateFrom));

    nextBooking = futureBookings.length > 0 ? futureBookings[0] : null;
    daysLeft = nextBooking
      ? differenceInDays(parseISO(nextBooking.dateFrom), today)
      : null;
  }

  return { nextBooking, daysLeft };
}

/**
 * calculates the next visit and the days left for the visit from the <profile>/venues api endpoint
 * @param {*} data - the venue data from the profile
 * @returns {number} nextVisit, daysLeft
 */

export function calculateNextVisit(data) {
  let nextVisit = null;
  let daysLeft = null;

  if (data.customer.name === load("profile").name) {
    const today = new Date();

    const futureVisits = data
      .filter((venues) => parseISO(venues.dateFrom) > today)
      .sort((a, b) => parseISO(a.dateFrom) - parseISO(b.dateFrom));

    nextVisit = futureVisits.length > 0 ? futureVisits[0] : null;
    daysLeft = nextVisit
      ? differenceInDays(parseISO(nextVisit.dateFrom), today)
      : null;
  }

  return { nextVisit, daysLeft };
}
