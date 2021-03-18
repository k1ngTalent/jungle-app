import react from 'react';
import { DateRangePicker } from "@blueprintjs/datetime";
import React from 'react';
import moment from 'moment';


export const dateDiff = (leftRange, rightRange) => {
    let data = {};

    data.elapsed = rightRange.getTime() - leftRange.getTime();

    data.days = Math.round((((data.elapsed / 1000) / 60) / 60) / 24);

    let monthDiff = (rightRange.getMonth() + 1) - (leftRange.getMonth() + 1);
    let yearDiff = rightRange.getFullYear() - leftRange.getFullYear();
    data.months = monthDiff + (yearDiff * 12);

    // Return data
    return data;
}
class CustomDatePicker extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedStartDate: null,
            selectedEndDate: null,
            isDatePickerActive: false,
            selectedDateRange: []
        }
    }
    static get myConstants() {
        return {
            minDate: new Date(2020, 0, 1),
            maxDate: new Date()
        }
    }
    handleDateChange = (dateRange) => {
        let startDate = dateRange[0];
        let endDate = dateRange[1];
        this.setState({ selectedStartDate: startDate, selectedEndDate: endDate, selectedDateRange: dateRange, boundaryToModify: [startDate, new Date()] });
    }


    handleRangeChange = (flag) => {
        const { selectedStartDate, selectedEndDate } = this.state;
        const { myConstants } = this.constructor;
        if (!selectedStartDate || !selectedEndDate) {
            return
        }
        if (flag == 'prev') {
            let diff = dateDiff(selectedStartDate, selectedEndDate);
            let newStartDate = new Date(selectedStartDate).setDate(selectedStartDate.getDate() - (diff.days + 1));
            let newEndDate = new Date(selectedEndDate).setDate(selectedEndDate.getDate() - (diff.days + 1));
            if ((new Date(newStartDate) < myConstants.minDate) || (new Date(newEndDate) > myConstants.maxDate)) {
                return;
            }
            let newRange = [new Date(newStartDate), new Date(newEndDate)];
            this.setState({ selectedStartDate: new Date(newStartDate), selectedEndDate: new Date(newEndDate), selectedDateRange: newRange });
            return;
        }

        if (flag == 'next') {
            let diff = dateDiff(selectedStartDate, selectedEndDate);
            let newStartDate = new Date(selectedStartDate).setDate(selectedStartDate.getDate() + (diff.days + 1));
            let newEndDate = new Date(selectedEndDate).setDate(selectedEndDate.getDate() + (diff.days + 1));
            if ((new Date(newStartDate) < myConstants.minDate) || (new Date(newEndDate) > myConstants.maxDate)) {
                return;
            }
            let newRange = [new Date(newStartDate), new Date(newEndDate)];
            this.setState({ selectedStartDate: new Date(newStartDate), selectedEndDate: new Date(newEndDate), selectedDateRange: newRange });
            return;
        }
    }

    renderDateSelected(startDate, endDate) {
        if (startDate || endDate) {
            return <span> {startDate ? moment(startDate).format("DD/MM/YYYY") : "NULL"} - {endDate ? moment(endDate).format("DD/MM/YYYY") : "NULL"}</span>
        }

        return "Today";
    }


    render() {
        const { isDatePickerActive, selectedDateRange, selectedStartDate, selectedEndDate } = this.state;
        const { singleMonthOnly } = this.props;
        const minDate = new Date(2020, 0, 1);
        const maxDate = new Date();
        let today = new Date();
        const shortcuts = [
            {
                label: "Last  24 hours",
                dateRange: [new Date(new Date(today).setDate(today.getDate() - 1)), new Date(today)]

            },
            {
                label: "Last  48 hours",
                dateRange: [new Date(new Date(today).setDate(today.getDate() - 2)), new Date(today)]

            },
            {
                label: "Last 7 days",
                dateRange: [new Date(new Date(today).setDate(today.getDate() - 6)), new Date(today)]

            },
            {
                label: "Last 14 days",
                dateRange: [new Date(new Date(today).setDate(today.getDate() - 13)), new Date(today)]

            },
            {
                label: "Last 30 days",
                dateRange: [new Date(new Date(today).setDate(today.getDate() - 29)), new Date(today)]

            },
            {
                label: "Last 90 days",
                dateRange: [new Date(new Date(today).setDate(today.getDate() - 89)), new Date(today)]

            },
            {
                label: "Last 180 days",
                dateRange: [new Date(new Date(today).setDate(today.getDate() - 179)), new Date(today)]

            }
        ]
        return (
            <div className="datepicker-container" data-testid="datepicker-container">
                <div className="date-action-container">
                    <span onClick={() => { this.handleRangeChange("prev") }} className="prev-button" data-testid="prev-button">
                        {"<"}
                    </span>
                    <span className="date-selector" data-testid="date-selector" onClick={() => { this.setState({ isDatePickerActive: !isDatePickerActive }) }}>{this.renderDateSelected(selectedStartDate, selectedEndDate)}</span>

                    <span onClick={() => { this.handleRangeChange("next") }} data-testid="next-button" className="next-button">{">"}</span>
                </div>
                {isDatePickerActive && <div className="datepicker" data-testid="datepicker">
                    <DateRangePicker shortcuts={shortcuts} onChange={this.handleDateChange} minDate={minDate} maxDate={maxDate} singleMonthOnly={singleMonthOnly} value={selectedDateRange} contiguousCalendarMonths={false} allowSingleDayRange={true} />
                </div>}
            </div>

        )
    }
}

export default CustomDatePicker;