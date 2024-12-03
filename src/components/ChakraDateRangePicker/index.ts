export { default as ChakraDateRangePicker } from "./ChakraDateRangePicker";

export interface DateRangePickerProps {
  startDate: Date | null;
  endDate: Date | null;
  onChange: (startDate: Date | null, endDate: Date | null) => void;
  locale?: string;
  dateFormat?: string;
  minDate?: Date;
  maxDate?: Date;
}
