import axios from "axios";
import { useQuery } from "react-query";

import { getPropertiesUrl } from "../Routes";

export const getPropertyById = (id: string) =>
  useQuery<IGetPropertyByIdResponse>(
    ["property", id],
    async () => {
      try {
        const { data } = await axios.get<IGetPropertyByIdResponse>(
          getPropertiesUrl + `/${id}`
        );

        return data;
      } catch (error) {
        throw new Error(error);
      }
    },
    {
      enabled: !!id,
    }
  );
