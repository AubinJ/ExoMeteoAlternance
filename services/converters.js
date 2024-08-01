export const ctoF = (c) => (c * 9) / 5 + 32;

export const mpsToMph = (mps) => (mps * 2.236936).toFixed(2);

export const kmToMiles = (km) => (km / 1.609).toFixed(1);

export const timeTo12HourFormat = (time) => {
  let [hours, minutes] = time.split(":");
  return `${(hours %= 12) ? hours : 12}:${minutes}`;
};

export const degToCompass = (num) => {
  var val = Math.round(num / 22.5);
  var arr = [
    "N",
    "NNE",
    "NE",
    "ENE",
    "E",
    "ESE",
    "SE",
    "SSE",
    "S",
    "SSW",
    "SW",
    "WSW",
    "W",
    "WNW",
    "NW",
    "NNW",
  ];
  return arr[val % 16];
};

/**
 * Cette fonction retourne une chaine de caractère correspondant à l'heure
 * de la date passée en paramètre (sous la forme d'une epoch et d'une timezone)
 *
 * @param   {[type]}  unixSeconds  [unixSeconds description]
 * @param   {[type]}  timezone     [timezone description]
 *
 * @return  {[type]}               [return description]
 */
export const unixToLocalTime = (unixSeconds, timezone) => {
  let time = new Date((unixSeconds + timezone) * 1000)
    .toISOString()
    .match(/(\d{2}:\d{2})/)[0];

  return time.startsWith("0") ? time.substring(1) : time;
};

/**
 * Donne l'heure locale à partir d'une date au format local
 *
 * @param   {[type]}  timeIsoString  [timeIsoString description]
 *
 * @return  {[type]}                 [return description]
 */
export const isoStringToLocalTime = (weatherDataHourly, timezone) => {
  let date = new Date()
  const hours = date.getHours();
  const minutes = date.getMinutes();
  let formatedMinutes;
  if(minutes <= 9){
    formatedMinutes = "0" + minutes.toString()
  }
  else {
    formatedMinutes = minutes.toString()
  }
  return `${hours}:${formatedMinutes}`
}
