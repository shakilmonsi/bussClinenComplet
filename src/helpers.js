import moment from "moment";

export const dateForm = (date) => {
  const selectedDate = new window.Date(date);
  const fullYear = selectedDate.getFullYear();
  const month = selectedDate.getMonth() + 1;
  const day = selectedDate.getDate();

  return `${fullYear}-${month}-${day}`;
};

export const getLocation = (item, boardingAndDroppingPoint) => {
  const drop_location_id = item?.drop_location_id;
  const pick_location_id = item?.pick_location_id;
  const pick = boardingAndDroppingPoint.find(
    (pickLocation) => pickLocation?.id === pick_location_id
  );
  const drop = boardingAndDroppingPoint.find(
    (dropLocation) => dropLocation?.id === drop_location_id
  );

  return `${pick?.name} - ${drop?.name}`;
};

export const getMaxValue = (array) => {
  return array?.reduce(function (prev, current) {
    return Math.max(prev, current.adult_fair);
  }, 0);
};

export const getMinValue = (array) => {
  var len = array.length,
    min = Infinity;
  while (len--) {
    if (Number(array[len].adult_fair) < min) {
      min = Number(array[len].adult_fair);
    }
  }
  return min;
};

export const compareTime = (busObj) => {
  const { busType, arrivalTime, departureTime, filterBus, durationArray } =
    busObj;
  const arrivalArray = [];
  const departureArray = [];
  const array = [];
  const format = "hh:mm:ss";

  if (arrivalTime) {
    for (let i = 0; i < durationArray?.length; i++) {
      const start = durationArray[i].start;
      const end = durationArray[i].end;
      const startTime = moment(start, format);
      const endTime = moment(end, format);
      for (let j = 0; j < filterBus?.length; j++) {
        const item = filterBus[j];
        const Time = convertTime12to24(item.end_time);
        const arrivalTime = moment(Time, format);
        if (arrivalTime.isBetween(startTime, endTime)) {
          arrivalArray.push(item);
        }
      }
    }
    return arrivalArray;
  } else if (departureTime) {
    for (let i = 0; i < durationArray?.length; i++) {
      const start = durationArray[i].start;
      const end = durationArray[i].end;
      const startTime = moment(start, format);
      const endTime = moment(end, format);
      for (let j = 0; j < filterBus?.length; j++) {
        const item = filterBus[j];
        const Time = convertTime12to24(item.start_time);
        const arrivalTime = moment(Time, format);
        if (arrivalTime.isBetween(startTime, endTime)) {
          departureArray.push(item);
        }
      }
    }
    return departureArray;
  } else if (busType) {
    for (let i = 0; i < durationArray?.length; i++) {
      const item = durationArray[i];
      for (let j = 0; j < filterBus?.length; j++) {
        const element = filterBus[j];
        if (element.fleet_id === item) {
          array.push(element);
        }
      }
    }
    return array;
  }
};

export const convertTime12to24 = (time12h) => {
  const [time, modifier] = time12h.split(" ");

  let [hours, minutes] = time.split(":");

  if (hours === "12") {
    hours = "00";
  }

  if (modifier === "PM") {
    hours = parseInt(hours, 10) + 12;
  }
  return `${hours}:${minutes}`;
};

export const getPicLocation = (location, values) => {
  return location.findIndex((locationName) => {
    return String(locationName.id) === String(values.pick_location);
  });
};

export const getDropLocation = (location, values) => {
  return location.findIndex((locationName) => {
    return String(locationName.id) === String(values.drop_location);
  });
};

export const isRegurnDateValid = (date) => date?.split("-").includes("NaN");

export const toUpperFirst = (string) =>
  string?.charAt(0).toUpperCase() + string?.slice(1).toLowerCase();

export const FirstLetterUppercase = (text) => {
  const arr = text.split(" ");

  for (let i = 0; i < arr.length; i++) {
    arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
  }

  const str2 = arr.join(" ");
  return str2;
};

const api_url = `${process.env.REACT_APP_API_MODULE_DOMAIN}/website/seetings`;

export const getSettingsData = async () => {
  const response = await fetch(api_url);
  var data = await response.json();
  return data;
};

export const busType = (fleet, fleetId) => {
  const result = fleet?.find((item) => item?.id === fleetId);
  return result?.type;
};
