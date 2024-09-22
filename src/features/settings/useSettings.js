import { useQuery } from "@tanstack/react-query";
import { getSettings } from "../../services/apiSettings";

function useSettings() {
  const { data: settings, isLoading: isLoadingSettings } = useQuery({
    queryFn: getSettings,
    queryKey: ["settings"],
  });

  return { settings, isLoadingSettings };
}

export default useSettings;
