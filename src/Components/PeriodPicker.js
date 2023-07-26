import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

export default function PeriodPicker(props) {
  const { startDate, setStartDate, endDate, setEndDate } = props;
  const { handleStartDateChange, handleEndDateChange } = props;
  return (
    <div className="periodPicker">
      <DatePicker
        wrapperClassName="datePicker"
        dateFormat="dd.MM.yyyy"
        selected={startDate}
        onSelect={(date) => handleStartDateChange(date)}
        onChange={(date) => setStartDate(date)}
      />
      <DatePicker
        wrapperClassName="datePicker"
        dateFormat="dd.MM.yyyy"
        selected={endDate}
        onSelect={(date) => handleEndDateChange(date)}
        onChange={(date) => setEndDate(date)}
      />
    </div>
  );
}
