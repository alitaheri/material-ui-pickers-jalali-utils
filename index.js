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

var utils = function () { };

utils.toJMoment = function toJMoment(date) {
  return jMoment(date ? date.clone() : undefined).locale('fa');
}

utils.parse = function parse(value, format) {
  return jMoment(value, format).locale('fa');
};

utils.date = utils.parse;

utils.isValid = function isValid(date) {
  return date.isValid();
}

utils.isNull = function isNull(date) {
  return date.parsingFlags().nullInput;
}

utils.isEqual = function isEqual(value, comparing) {
  return utils.date(value).isSame(comparing);
}

utils.isAfter = function isAfter(date, value) {
  return date.isAfter(value);
}

utils.isBefore = function isBefore(date, value) {
  return date.isBefore(value);
}

utils.isAfterDay = function isAfterDay(date, value) {
  return date.isAfter(value, 'day');
}

utils.isBeforeDay = function isBeforeDay(date, value) {
  return date.isBefore(value, 'day');
}

utils.isBeforeYear = function isBeforeYear(date, value) {
  return date.jYear() < value.jYear();
}

utils.isAfterYear = function isAfterYear(date, value) {
  return date.jYear() > value.jYear();
}

utils.startOfDay = function startOfDay(date) {
  return date.startOf('day');
}

utils.endOfDay = function endOfDay(date) {
  return date.endOf('day');
}

utils.format = function format(date, formatString) {
  switch (formatString) {
    case 'D': return date.format('jD');
    case 'MMMM YYYY': return date.format('jMMMM jYYYY');
    case 'YYYY': return date.format('jYYYY');
    case 'ddd, MMM D': return date.format('ddd, jMMM jDD');
    case 'MMM D': return date.format('jMMM jDD');
    case 'MMMM Do': return date.format('jMMMM jDo');
  }
  return date.format(formatString);
}

utils.formatNumber = function formatNumber(num) {
  return (num || '').replace(/\d/g, function (match) {
    return symbolMap[match];
  }).replace(/,/g, '،');
}

utils.getMeridiemText = function getMeridiemText(ampm) {
  return ampm === 'am'
    ? utils.toJMoment().hours(2).format('A')
    : utils.toJMoment().hours(14).format('A');
}

utils.addDays = function addDays(date, count) {
  return count < 0
    ? date.clone().subtract(Math.abs(count), 'days')
    : date.clone().add(count, 'days');
}

utils.isSameDay = function isSameDay(date, comparing) {
  return date.isSame(comparing, 'day');
}

utils.getHours = function getHours(date) {
  return date.get('hours');
}

utils.setHours = function setHours(date, value) {
  return date.clone().hours(value);
}

utils.getMinutes = function getMinutes(date) {
  return date.get('minutes');
}

utils.setMinutes = function setMinutes(date, value) {
  return date.clone().minutes(value);
}

utils.getMonth = function getMonth(date) {
  return date.jMonth();
}

utils.getStartOfMonth = function getStartOfMonth(date) {
  return date.clone().startOf('jMonth');
}

utils.getNextMonth = function getNextMonth(date) {
  return date.clone().add(1, 'jMonth');
}

utils.getPreviousMonth = function getPreviousMonth(date) {
  return date.clone().subtract(1, 'jMonth');
}

utils.getYear = function getYear(date) {
  return date.jYear();
}

utils.setYear = function setYear(date, year) {
  return date.clone().jYear(year);
}

utils.getWeekdays = function getWeekdays() {
  return [0, 1, 2, 3, 4, 5, 6].map(function (dayOfWeek) {
    return utils.toJMoment().weekday(dayOfWeek).format('dd');
  });
}

utils.getWeekArray = function getWeekArray(date) {
  var start = utils.toJMoment(date).startOf('jMonth').startOf('week');
  var end = utils.toJMoment(date).endOf('jMonth').endOf('week');

  var weeks = Array.from(moment.range(start, end).by('week'));

  var nestedWeeks = [];

  weeks.forEach(function (week) {
    var end = week.clone().endOf('week');
    nestedWeeks.push(Array.from(moment.range(week, end).by('day')).map(utils.toJMoment));
  });

  return nestedWeeks;
}

utils.getYearRange = function getYearRange(start, end) {
  const startDate = utils.date(start);
  const endDate = utils.date(end);
  const years = [];

  let current = startDate;
  while (current.isBefore(endDate)) {
    years.push(current);
    current = current.clone().add(1, 'jYear');
  }

  return years;
}

utils['default'] = utils;

module.exports = utils;
