import React from 'react';
import CustomDatePicker from './Datepicker';
import {render,within,fireEvent} from '@testing-library/react';

const renderDatePicker = () => render(<CustomDatePicker singleMonthOnly={false}/>);

const IDMAPS = {
  PREV_BUTTON:'prev-button',
  NEXT_BUTTON:'next-button',
  DATE_SELECTOR:'date-selector',
  DATEPICKER_CONTAINER:'datepicker-container',
  DATEPICKER:'datepicker'
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
    });

    test('initial state of date picker to be hidden or falsy',()=>{
        const {
            getByTestId,
            queryByTestId
        } = renderDatePicker();
        const datePickerContainer = getByTestId(IDMAPS.DATEPICKER_CONTAINER);
     expect(within(datePickerContainer).queryByTestId(IDMAPS.DATEPICKER)).toBeFalsy();
    });

    test('the date picker should not be hidden on clicking date-selector',()=>{

        let dateSelectorBtn

        const {
            getByTestId,
            queryByTestId
        } = renderDatePicker();
        const datePickerContainer = getByTestId(IDMAPS.DATEPICKER_CONTAINER);

        let elements = within(datePickerContainer);
       expect(elements.queryByTestId(IDMAPS.DATEPICKER)).toBeFalsy();
       

       dateSelectorBtn = elements.getByTestId(IDMAPS.DATE_SELECTOR);
       fireEvent.click(dateSelectorBtn);

       expect(elements.queryByTestId(IDMAPS.DATEPICKER)).toBeTruthy();

    })
});