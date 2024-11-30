export const uniqKrainaZorKrainaR = (arr) => {
  // Створення Set для унікальних значень країн завантаження та розвантаження
  let newArray = arr.map((item) => ({
    countryZav: item.ZAVKRAINA,
    countryRozv: item.ROZVKRAINA,
  }));

  const filteredArray = newArray.filter(
    (item) => item.countryRozv !== null && item.countryZav !== null
  );

  let krainaFilter = [...new Set(filteredArray)];

  const uniqueArray = Array.from(
    new Set(krainaFilter.map((obj) => JSON.stringify(obj)))
  ).map((str) => JSON.parse(str));

  return uniqueArray;
};
