import { Moment } from 'moment-jalaali';

declare class PersianUtils {
  public toJMoment(date: any): Moment;
  public parse(value: any, format: string): Moment;
  public date(value: any, format?: string): Moment;

  public isValid(date: Moment): boolean;
  public isNull(date: Moment): boolean;
  public isEqual(value: Moment, comparing: Moment): boolean;
  public isAfter(date: Moment, value: Moment): boolean;
  public isBefore(date: Moment, value: Moment): boolean;
  public isAfterDay(date: Moment, value: Moment): boolean;
  public isBeforeDay(date: Moment, value: Moment): boolean;
  public isBeforeYear(date: Moment, value: Moment): boolean;
  public isAfterYear(date: Moment, value: Moment): boolean;
  public isSameDay(date: Moment, comparing: Moment): boolean;

  public addDays(date: Moment, count: number): Moment;
  public startOfDay(date: Moment): Moment;
  public endOfDay(date: Moment): Moment;

  public format(date: Moment, format: string): string;
  public formatNumber(num: number): string;
  public getMeridiemText(ampm: 'am' | 'pm'): string;

  public getHours(date: Moment): number;
  public setHours(date: Moment, value: number): Moment;

  public getMinutes(date: Moment): number;
  public setMinutes(date: Moment, value: number): Moment;

  public getMonth(date: Moment): number;
  public getStartOfMonth(date: Moment): Moment;
  public getNextMonth(date: Moment): Moment;
  public getPreviousMonth(date: Moment): Moment;

  public getYear(date: Moment): number;
  public setYear(date: Moment, year: number): Moment;

  public getDiff(date: Moment, comparing: Moment): number;
  public getWeekdays(): string[];
  public getWeekArray(date: Moment): Moment[][];
  public getYearRange(start: Moment, end: Moment): Moment[];
  public 
  public getCalendarHeaderText(date: Moment): string;
  public getDatePickerHeaderText(date: Moment): string;
  public getDateTimePickerHeaderText(date: Moment): string;
  public getDayText(date: Moment): string;
  public getHourText(date: Moment, ampm: boolean): string;
  public getMinuteText(date: Moment): string;
  public getYearText(date: Moment): string;
}

export default PersianUtils;
