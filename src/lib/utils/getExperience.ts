export const getExperience = (fromInString: string) => {
  const from = new Date(fromInString);
  const to = new Date();

  let yearsOfExperience: number = 0;
  let monthsOfExperience: number = 0;
  if (from.getFullYear() <= to.getFullYear()) {
    const resultInMonths =
      to.getMonth() -
      from.getMonth() +
      (to.getFullYear() - from.getFullYear()) * 12;
    yearsOfExperience = Math.floor(resultInMonths / 12);
    monthsOfExperience = resultInMonths % 12;
  }
  return { years: yearsOfExperience, months: monthsOfExperience };
};
