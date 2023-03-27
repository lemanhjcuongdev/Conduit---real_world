export const DateConverter = (raw_date: string) => {
  const date = new Date(raw_date);

  return date.toDateString().slice(4);
};
