export const formatDate = (date) => {
    const options = {
      calendar: 'gregory',
      day: 'numeric',
      locale: 'pt-BR',
      month: 'numeric',
      numberingSystem: 'latn',
      timeZone: 'America/Bahia',
      year: 'numeric',
    };
    
    return date.toLocaleDateString(date, options);
};