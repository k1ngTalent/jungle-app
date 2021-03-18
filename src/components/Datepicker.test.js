import React from 'react';
import CustomDatePicker from './Datepicker';
import {render,within} from '@testing-library/react';

const renderDatePicker = () => render(<CustomDatePicker singleMonthOnly={false}/>);

const IDMAPS = {
  PREV_BUTTON:'prev-button',
  NEXT_BUTTON:'next-button',
  DATE_SELECTOR:'date-selector',
  DATEPICKER_CONTAINER:'datepicker-container'
}

describe("test date picker component", () => {

    test('inititai state of date action container',()=>{
        const {
            getByTestId
        } = renderDatePicker();
        const datePickerContainer = getByTestId(IDMAPS.DATEPICKER_CONTAINER)
        expect(within(datePickerContainer).getByTestId(IDMAPS.PREV_BUTTON).innerHTML).toEqual('&lt;');
        expect(within(datePickerContainer).getByTestId(IDMAPS.NEXT_BUTTON).innerHTML).toEqual('&gt;');
        expect(within(datePickerContainer).getByTestId(IDMAPS.DATE_SELECTOR).innerHTML).toEqual('Today');
    })
});