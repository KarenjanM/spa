export default function getFormattedDate(dateToParse) {
    let date = new Date(Date.parse(dateToParse))
    let dateString = date.toDateString().split(' ').slice(1)

    let temp = dateString[1]
    dateString[1] = dateString[0]
    dateString[0] = temp
    for (let i = 0; i < dateString.length; i++) {
      if (i == 0)
        dateString[i] = dateString[i].toUpperCase() + ". "
      else
        dateString[i] = dateString[i].toUpperCase() + " "
    }
    return dateString;
  }