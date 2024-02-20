export const addUserToLocalStorage = (user:any) => {
    localStorage.setItem("userData", JSON.stringify(user));
  };
  
  export const removeUserFromLocalStorage = () => {
    localStorage.removeItem("userData");
  };
  
  export const getUserFromLocalStorage = () => {
    const result = localStorage.getItem("userData");
    return result ? JSON.parse(result) : null;
  };
  