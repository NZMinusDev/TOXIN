type LibAirDatepicker = {
  classes?: string;
  prevHtml?: string;
  nextHtml?: string;
  dateFormat?: string;
  altField?: string | JQuery<HTMLElement>;
  altFieldDateFormat?: string;
  minDate?: Date;
  toggleSelected?: boolean;
  onSelect?: (
    formattedDate: string,
    date: Date | Array<Date> | '',
    inst: object
  ) => void;
};

interface JQuery {
  datepicker(options?: LibAirDatepicker): void;
}
