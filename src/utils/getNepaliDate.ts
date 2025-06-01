import NepaliDate from "nepali-date-converter";

export const getNepaliDate = (dateString: string) => {
  const utcTimestamp = Date.parse(dateString);
  const nepDate = new NepaliDate(utcTimestamp).format("ddd, DD MMMM YYYY");
  return nepDate;
};
