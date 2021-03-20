export const STORE_VERBS = "STORE_VERBS";

export const storeVerbs = (verbs) => {
  // console.log("action: " + verbs);
  return { type: STORE_VERBS, verbs };
};
