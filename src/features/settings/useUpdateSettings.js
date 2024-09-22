import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateSetting as updateSettingsApi } from "../../services/apiSettings";
import toast from "react-hot-toast";

function useUpdateSettings() {
  const queryClient = useQueryClient();

  const { isLoading: isUpdatingSettings, mutate: updateSettings } = useMutation(
    {
      mutationFn: updateSettingsApi,
      onSuccess: () => {
        queryClient.invalidateQueries(["cabins"]);
        toast.success("Settings Updated");
      },
      onError: () => {
        toast.error("Settings Update failed");
      },
    }
  );
  return { isUpdatingSettings, updateSettings };
}

export default useUpdateSettings;
