const busReducer = (state = [], action) => {
  switch (action.type) {
    case 'ADD_BUS_NAME': {
      const newState = {
        ...state,
        busLists: action.payload,
      };
      return newState;
    }
    case 'ADD_ERROR': {
      const newState = {
        ...state,
        error: action.payload,
      };
      return newState;
    }
    case 'SEARCH_INFO-STORE': {
      const newState = {
        ...state,
        searchInfoStore: action.payload,
      };
      return newState;
    }
    case 'TRICKET_TRACKING': {
      const newState = {
        ...state,
        ticketTracking: action.payload,
      };
      return newState;
    }
    case 'WEB-SETTING': {
      const newState = {
        ...state,
        webSettingData: action.payload,
      };
      return newState;
    }
    case 'CONTACT-INFO': {
      const newState = {
        ...state,
        contactInfoData: action.payload,
      };
      return newState;
    }
    case 'LANGUAGE': {
      const newState = {
        ...state,
        languageData: action.payload,
      };
      return newState;
    }
    case 'APP-DATA-ACTION': {
      const newState = {
        ...state,
        appDataAction: action.payload,
      };
      return newState;
    }
    case 'GET-REVEIW': {
      const newState = {
        ...state,
        reveiws: action.payload,
      };
      return newState;
    }

    case 'REGULAR-BOOKING-INFORMATION': {
      const newState = {
        ...state,
        regularBookingInformation: action.payload,
      };
      return newState;
    }

    case 'UPDATE-FARE-SUMMERY': {
      const newState = {
        ...state,
        fareSummery: action.payload,
      };
      return newState;
    }

    default: {
      return state;
    }
  }
};

export default busReducer;
