import { Moment } from 'moment-jalaali';

declare class PersianUtils {
  public static toJMoment(date: any): Moment;
  public static parse(value: any, format: string): Moment;
  public static date(value: any, format?: string): Moment;

  public static isValid(date: Moment): boolean;
  public static isNull(date: Moment): boolean;
  public static isEqual(value: Moment, comparing: Moment): boolean;
  public static isAfter(date: Moment, value: Moment): boolean;
  public static isBefore(date: Moment, value: Moment): boolean;
  public static isAfterDay(date: Moment, value: Moment): boolean;
  public static isBeforeDay(date: Moment, value: Moment): boolean;
  public static isBeforeYear(date: Moment, value: Moment): boolean;
  public static isAfterYear(date: Moment, value: Moment): boolean;
  public static isSameDay(date: Moment, comparing: Moment): boolean;

  public static addDays(date: Moment, count: number): Moment;
  public static startOfDay(date: Moment): Moment;
  public static endOfDay(date: Moment): Moment;

  public static format(date: Moment, format: string): string;
  public static formatNumber(num: number): string;
  public static getMeridiemText(ampm: 'am' | 'pm'): string;

  public static getHours(date: Moment): number;
  public static setHours(date: Moment, value: number): Moment;

  public static getMinutes(date: Moment): number;
  public static setMinutes(date: Moment, value: number): Moment;

  public static getMonth(date: Moment): number;
  public static getStartOfMonth(date: Moment): Moment;
  public static getNextMonth(date: Moment): Moment;
  public static getPreviousMonth(date: Moment): Moment;

  public static getYear(date: Moment): number;
  public static setYear(date: Moment, year: number): Moment;

  public static getWeekdays(): string[];
  public static getWeekArray(date: Moment): Moment[][];
  public static getYearRange(start: Moment, end: Moment): Moment[];
}

export default PersianUtils;
