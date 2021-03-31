import React from 'react'
import styled from 'styled-components'
// import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import theme from './../theme';


//IMPORTS NECESARIOS PARA PODER MANIPULAR EL INPUT DE DATEPICKER
import DayPickerInput from 'react-day-picker/DayPickerInput';
import { DateUtils } from 'react-day-picker';
import 'react-day-picker/lib/style.css';

import dateFnsFormat from 'date-fns/format';
import dateFnsParse from 'date-fns/parse';

//IDIOMA DEL DATEPICKER
import { es } from 'date-fns/locale'

function parseDate(str, format, locale) {
    const parsed = dateFnsParse(str, format, new Date(), { locale });
    if (DateUtils.isDate(parsed)) {
        return parsed;
    }
    return undefined;
}

function formatDate(date, format, locale) {
    return dateFnsFormat(date, format, { locale: es });
}

//PARA TRADUCIR LOS ELEMENTOS DEL DATEPICKER EN ESPAÑOL
const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre',];
const dias_semana_cortos = ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa'];

const ContenedorInput = styled.div`
    input {
        font-family: 'Roboto', sans-serif;       
        box-sizing: border-box;
        background: ${theme.grisClaro};
        border: none;
        cursor: pointer;
        border-radius: 0.625rem; /* 10px */
        height: 5rem; /* 80px */
        width: 100%;
        padding: 0 1.25rem; /* 20px */
        font-size: 1.5rem; /* 24px */
        text-align: center;
        display: flex;
        align-items: center;
        justify-content: center;
    }
 
    @media(max-width: 60rem){ /* 950px */
        & > * {
            width: 100%;
        }
    }
`;

const SelectDayPicker = ({ selectedDate, setDate }) => {
    return (
        <ContenedorInput>
            <DayPickerInput
                value={selectedDate}
                onDayChange={(day) => setDate(day)}
                format="dd 'de' MMMM 'de' yyyy"
                formatDate={formatDate}
                parseDate={parseDate}

                dayPickerProps={
                    {
                        months: meses,
                        weekdaysShort: dias_semana_cortos
                    }
                }
            />
        </ContenedorInput>
    );

}

export default SelectDayPicker;
