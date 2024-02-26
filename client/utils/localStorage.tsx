export const addUserToLocalStorage = (user:any) => {
    localStorage.setItem("userData", JSON.stringify(user));
  };
  
  export const removeUserFromLocalStorage = () => {
    localStorage.removeItem("userData");
  };
  
  export const getUserFromLocalStorage = () => {
    const result = localStorage.getItem("userData");
    return result ? JSON?.parse(result) : null;
  };
////////////////////weather data

  export const addCurrentDataToLS= (currentData:any) => {
    localStorage.setItem("currentData", JSON.stringify(currentData));
  };
  
  export const addPastDataToLS= (pastData:any) => {
    localStorage.setItem("pastData", JSON.stringify(pastData));
  };

  export const getCurrentDataFromLocalStorage = () => {
    const result = localStorage.getItem("currentData");
    return result ? JSON.parse(result) : null;
  };
  export const getPastDataFromLocalStorage = () => {
    const result = localStorage.getItem("pastData");
    return result ? JSON.parse(result) : null;
  };

