import { useQuery } from "@tanstack/react-query";
import { getCabins } from "../../services/apiCabin";

function useCabinData() {
  const {
    data: cabinsData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["cabins"],
    queryFn: getCabins,
  });

  return { cabinsData, isLoading, error };
}

export default useCabinData;
