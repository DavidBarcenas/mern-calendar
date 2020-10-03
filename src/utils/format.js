import moment from "moment"

export const dateFormat = ( date ) => {
  if( moment(date).isValid() ) {
    const dateForInput = moment(date).format().substring(0,19)
    return dateForInput;
  }
  return '';
}