export const dynamicSearch = (item, search, fields) => {
    return fields.some(field => {
      const value = item[field] ? item[field].toString().toLowerCase() : ''; // Перевіряємо, чи визначене значення
      return value.includes(search.toLowerCase());
    });
  };