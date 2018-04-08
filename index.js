'use strict';

var Moment = require('moment');
var jMoment = require('moment-jalaali');
var extendMoment = require('moment-range').extendMoment;

var moment = extendMoment(Moment);
var symbolMap = {
  1: '۱',
  2: '۲',
  3: '۳',
  4: '۴',
  5: '۵',
  6: '۶',
  7: '۷',
  8: '۸',
  9: '۹',
  0: '۰'
};

function parse(value, format) {
  return jMoment(value, format).locale('fa');
}

function toJMoment(date) {
  return jMoment(date ? date.clone() : undefined).locale('fa');
}

var utils = function utils() {};

utils.prototype.toJMoment = toJMoment;

utils.prototype.date = utils.prototype.parse = parse;

utils.prototype.isValid = function isValid(date) {
  return date.isValid();
};

utils.prototype.isNull = function isNull(date) {
  return date.parsingFlags().nullInput;
};

utils.prototype.isEqual = function isEqual(value, comparing) {
  return parse(value).isSame(comparing);
};

utils.prototype.isAfter = function isAfter(date, value) {
  return date.isAfter(value);
};

utils.prototype.isBefore = function isBefore(date, value) {
  return date.isBefore(value);
};

utils.prototype.isAfterDay = function isAfterDay(date, value) {
  return date.isAfter(value, 'day');
};

utils.prototype.isBeforeDay = function isBeforeDay(date, value) {
  return date.isBefore(value, 'day');
};

utils.prototype.isBeforeYear = function isBeforeYear(date, value) {
  return date.jYear() < value.jYear();
};

utils.prototype.isAfterYear = function isAfterYear(date, value) {
  return date.jYear() > value.jYear();
};

utils.prototype.startOfDay = function startOfDay(date) {
  return date.startOf('day');
};

utils.prototype.endOfDay = function endOfDay(date) {
  return date.endOf('day');
};

utils.prototype.format = function format(date, formatString) {
  return date.format(formatString);
};

utils.prototype.formatNumber = function formatNumber(num) {
  return (num || '').replace(/\d/g, function (match) {
    return symbolMap[match];
  }).replace(/,/g, '،');
};

utils.prototype.getMeridiemText = function getMeridiemText(ampm) {
  return ampm === 'am' ? toJMoment().hours(2).format('A') : toJMoment().hours(14).format('A');
};

utils.prototype.addDays = function addDays(date, count) {
  return count < 0 ? date.clone().subtract(Math.abs(count), 'days') : date.clone().add(count, 'days');
};

utils.prototype.isSameDay = function isSameDay(date, comparing) {
  return date.isSame(comparing, 'day');
};

utils.prototype.getHours = function getHours(date) {
  return date.get('hours');
};

utils.prototype.setHours = function setHours(date, value) {
  return date.clone().hours(value);
};

utils.prototype.getMinutes = function getMinutes(date) {
  return date.get('minutes');
};

utils.prototype.setMinutes = function setMinutes(date, value) {
  return date.clone().minutes(value);
};

utils.prototype.getMonth = function getMonth(date) {
  return date.jMonth();
};

utils.prototype.getStartOfMonth = function getStartOfMonth(date) {
  return date.clone().startOf('jMonth');
};

utils.prototype.getNextMonth = function getNextMonth(date) {
  return date.clone().add(1, 'jMonth');
};

utils.prototype.getPreviousMonth = function getPreviousMonth(date) {
  return date.clone().subtract(1, 'jMonth');
};

utils.prototype.getYear = function getYear(date) {
  return date.jYear();
};

utils.prototype.setYear = function setYear(date, year) {
  return date.clone().jYear(year);
};

utils.prototype.getWeekdays = function getWeekdays() {
  return [0, 1, 2, 3, 4, 5, 6].map(function (dayOfWeek) {
    return toJMoment().weekday(dayOfWeek).format('dd');
  });
};

utils.prototype.getWeekArray = function getWeekArray(date) {
  var start = toJMoment(date).startOf('jMonth').startOf('week');
  var end = toJMoment(date).endOf('jMonth').endOf('week');

  var weeks = Array.from(moment.range(start, end).by('week'));

  var nestedWeeks = [];

  weeks.forEach(function (week) {
    var end = week.clone().endOf('week');
    nestedWeeks.push(Array.from(moment.range(week, end).by('day')).map(toJMoment));
  });

  return nestedWeeks;
};

utils.prototype.getYearRange = function getYearRange(start, end) {
  var startDate = parse(start);
  var endDate = parse(end);
  var years = [];

  var current = startDate;
  while (current.isBefore(endDate)) {
    years.push(current);
    current = current.clone().add(1, 'jYear');
  }

  return years;
};

utils.prototype.getCalendarHeaderText = function getCalendarHeaderText(date) {
  return date.format('jMMMM jYYYY');
};

utils.prototype.getYearText = function getYearText(date) {
  return date.format('jYYYY');
};

utils.prototype.getDatePickerHeaderText = function getDatePickerHeaderText(date) {
  return date.format('ddd, jMMM jD');
};

utils.prototype.getDateTimePickerHeaderText = function getDateTimePickerHeaderText(date) {
  return date.format('jMMM jD');
};

utils.prototype.getDayText = function getDayText(date) {
  return date.format('jD');
};

utils.prototype.getHourText = function getHourText(date, ampm) {
  return date.format(ampm ? 'hh' : 'HH');
};

utils.prototype.getMinuteText = function getMinuteText(date) {
  return date.format('mm');
};

utils.['default'] = utils;

module.exports = utils;
