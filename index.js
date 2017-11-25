"use strict";

var Moment = require('moment');
var jMoment = require('moment-jalaali');
var extendMoment = require('moment-range').extendMoment;

var moment = extendMoment(Moment);
var symbolMap = {
  '1': '۱',
  '2': '۲',
  '3': '۳',
  '4': '۴',
  '5': '۵',
  '6': '۶',
  '7': '۷',
  '8': '۸',
  '9': '۹',
  '0': '۰',
};

function toJMoment(date) {
  return jMoment(date ? date.clone() : undefined).locale('fa');
}

function formatNumber(num) {
  return (num || '').replace(/\d/g, function (match) {
    return symbolMap[match];
  }).replace(/,/g, '،');
}

function getCalendarHeaderText(date) {
  return toJMoment(date).format('jMMMM jYYYY');
}

function getDatePickerHeaderText(date) {
  return toJMoment(date).format('ddd, jMMM jDD');
}

function getDateTimePickerHeaderText(date) {
  return toJMoment(date).format('jMMM jDD');
}

function getDayText(date) {
  return toJMoment(date).format('jD');
}

function getHourText(date) {
  return toJMoment(date).format('hh');
}

function getMinuteText(date) {
  return toJMoment(date).format('mm');
}

function getMeridiemText(ampm) {
  return ampm === 'am'
    ? toJMoment().hours(2).format('A')
    : toJMoment().hours(14).format('A');
}

function getYearText(date) {
  return toJMoment(date).format('jYYYY');
}

function getMonthNumber(date) {
  return toJMoment(date).jMonth();
}

function getStartOfMonth(date) {
  return toJMoment(date).startOf('jMonth');
}

function getNextMonth(date) {
  return toJMoment(date).add(1, 'jMonth');
}

function getPreviousMonth(date) {
  return toJMoment(date).subtract(1, 'jMonth');
}

function getYear(date) {
  return toJMoment(date).jYear();
}

function setYear(date, year) {
  return toJMoment(date).jYear(year);
}

function getWeekdays() {
  return [0, 1, 2, 3, 4, 5, 6].map(function (dayOfWeek) {
    return toJMoment().weekday(dayOfWeek).format('dd');
  });
}

function getWeekArray(date) {
  var start = toJMoment(date).startOf('jMonth').startOf('week');
  var end = toJMoment(date).endOf('jMonth').endOf('week');

  var weeks = Array.from(moment.range(start, end).by('week'));

  var nestedWeeks = [];

  weeks.forEach(function (week) {
    var end = week.clone().endOf('week');
    nestedWeeks.push(Array.from(moment.range(week, end).by('day')));
  });

  return nestedWeeks;
}

var utils = {
  formatNumber: formatNumber,
  getCalendarHeaderText: getCalendarHeaderText,
  getDatePickerHeaderText: getDatePickerHeaderText,
  getDateTimePickerHeaderText: getDateTimePickerHeaderText,
  getDayText: getDayText,
  getHourText: getHourText,
  getMinuteText: getMinuteText,
  getMeridiemText: getMeridiemText,
  getYearText: getYearText,
  getMonthNumber: getMonthNumber,
  getStartOfMonth: getStartOfMonth,
  getNextMonth: getNextMonth,
  getPreviousMonth: getPreviousMonth,
  getYear: getYear,
  setYear: setYear,
  getWeekdays: getWeekdays,
  getWeekArray: getWeekArray,
};

utils['default'] = utils;

module.exports = utils;
