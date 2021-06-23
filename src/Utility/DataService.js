export const SaveData = (dataKey, data) => {

  localStorage.setItem(dataKey, JSON.stringify(data));
    console.log("added to localstorage")
};

export const GetData = (dataKey) => {
  if (dataKey in localStorage) {
    return JSON.parse(localStorage.getItem(dataKey));
  } else {
    return [];
  }
};
