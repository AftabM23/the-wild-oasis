import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditCabin } from "../../services/apiCabin";
import toast from "react-hot-toast";

function useCreateCabins() {
  const queryClient = useQueryClient();

  const { isLoading: creatingCabin, mutate: createCabin } = useMutation({
    mutationFn: createEditCabin,
    onSuccess: () => {
      queryClient.invalidateQueries(["cabins"]);
      toast.success("Cabin created successfully");
    },
    onError: () => {
      toast.error("Cabin creation failed");
    },
  });
  return { creatingCabin, createCabin };
}

export default useCreateCabins;
