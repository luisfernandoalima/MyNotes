const dateFormat = (date) => {
  const data = new Date(date);
  const format = new Intl.DateTimeFormat("pt-BR", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  }).format(data);

  return format
};

export default dateFormat;
