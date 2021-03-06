import * as moment from 'moment';

export class Event {
  id: string;
  type: string;
  didRead: boolean;
  didBump: boolean;
  timestamp: string;
  duration: string;
  localeTimestamp: string;
  from: string;
  message: string;
  amount: string;
  currency: string;
  stringAmount: string;
  months: string;
  sub_plan: string;
  friendlySubPlan: string;

  constructor(event: any) {
    this.id = event.id;
    this.type = event.type;
    this.didRead = false;
    this.didBump = false;
    this.timestamp = event.timestamp;
    this.duration = this.getDuration();
    this.localeTimestamp = new Date(this.timestamp).toLocaleTimeString();
    this.from = event.from;

    if (event.message) {
      this.message = event.message;
    }

    if (event.amount) {
      this.amount = event.amount;
      this.stringAmount = event.stringAmount;
      this.currency = event.currency;
    }

    if (event.months) {
      this.months = event.months;
      this.stringAmount = event.stringAmount;
    }

    if (event.sub_plan) {
      this.sub_plan = event.sub_plan;
      this.friendlySubPlan = String(+event.sub_plan / 1000);
    }
  }

  public getDuration(): string {
    // Set moment locale //
    moment.updateLocale('en', {
      relativeTime: {
        future: '%s',
        past: '%s',
        s: '1s',
        ss: '%ds',
        m: '1m',
        mm: '%dm',
        h: '1h',
        hh: '%dh',
        d: '1d',
        dd: '%dd',
        M: '1m',
        MM: '%dm',
        y: '1y',
        yy: '%dy'
      }
    });
    // Get diff of moments and return //
    return moment(this.timestamp).fromNow();
  }
}
