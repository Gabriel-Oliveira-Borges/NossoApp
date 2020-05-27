import React from 'react';
import CalendarPicker from 'react-native-calendar-picker';
import moment from 'moment';

const weekdays = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'];

const months = [
  'Janeiro',
  'Fevereiro',
  'Março',
  'Abril',
  'Maio',
  'Junho',
  'Julho',
  'Agosto',
  'Setembro',
  'Outubro',
  'Novembro',
  'Dezembro',
];

export default class CalendarComponent extends React.Component {
  render() {
    const {selectedDate, onDayPress, width, height} = this.props;
    return (
      <CalendarPicker
        weekdays={weekdays}
        months={months}
        previousTitle="Anterior"
        nextTitle="Próximo"
        selectedDayColor="#7300e6"
        selectedDayTextColor="#FFFFFF"
        selectMonthTitle="Selecione o mês"
        selectYearTitle="Selecione o ano"
        initialDate={selectedDate}
        todayBackgroundColor="rebeccapurple"
        maxDate={moment()}
        onDateChange={onDayPress}
        allowRangeSelection={false}
        width={width}
        height={height}
      />
    );
  }
}
