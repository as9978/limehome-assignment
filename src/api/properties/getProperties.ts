import axios from "axios";
import { useQuery } from "react-query";

import { getPropertiesUrl } from "../Routes";

export const getProperties = () =>
  useQuery<IGetPropertiesResponse>("properties", async () => {
    try {
      const { data } = await axios.get<IGetPropertiesResponse>(
        getPropertiesUrl,
        {
          params: {
            cityId: 32,
            adults: 1,
          },
        }
      );

      return data;
    } catch (error) {
      throw new Error(error);
    }
  });
