import { Buffer } from "buffer";

import { ONET_PASSWORD, ONET_SEARCH_ENDPOINT, ONET_USERNAME } from "@env";
import axios from "axios";

export const searchOccupations = async (
  keyword: string,
  start = 1,
  end = 50
) => {
  const token = Buffer.from(
    `${ONET_USERNAME}:${ONET_PASSWORD}`,
    "utf8"
  ).toString("base64");
  return await axios.get(ONET_SEARCH_ENDPOINT, {
    headers: {
      Authorization: `Basic ${token}`,
    },
    params: {
      keyword,
      start,
      end,
    },
  });
};
