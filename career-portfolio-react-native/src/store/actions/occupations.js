export const STORE_OCCUPATIONS = "STORE_OCCUPATIONS";

export const storeOccupations = (occupations) => {
  // console.log("action: " + occupations);
  return { type: STORE_OCCUPATIONS, occupations };
};
