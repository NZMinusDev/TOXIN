interface JQuery {
  datepicker(options?: LibAirDatepicker);
}
type LibAirDatepicker = {
  classes?: string;
  prevHtml?: string;
  nextHtml?: string;
  dateFormat?: string;
  minDate?: Date;
  toggleSelected?: boolean;
  onSelect?: (formattedDate, date, inst) => void;
};
