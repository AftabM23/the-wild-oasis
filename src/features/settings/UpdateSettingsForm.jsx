import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import useSettings from "./useSettings";
import Spinner from "../../ui/Spinner";
import useUpdateSettings from "./useUpdateSettings";

function UpdateSettingsForm() {
  const {
    settings: {
      minBookinglength,
      maxBookingLength,
      maxGuestsPerBooking,
      breakfastPrice,
    } = {},
    isLoadingSettings,
  } = useSettings();
  const { isUpdatingSettings, updateSettings } = useUpdateSettings();
  const handleSettingsUpdate = (e, field) => {
    updateSettings({ [field]: e.target.value });
  };

  if (isLoadingSettings) return <Spinner />;
  return (
    <Form>
      <FormRow labelName="Minimum nights/booking">
        <Input
          type="number"
          id="minimumBookinglength"
          disabled={isUpdatingSettings}
          defaultValue={minBookinglength}
          onBlur={(e) => {
            handleSettingsUpdate(e, "minBookinglength");
          }}
        />
      </FormRow>
      <FormRow labelName="Maximum nights/booking">
        <Input
          type="number"
          id="maximumBookinglength"
          defaultValue={maxBookingLength}
          disabled={isUpdatingSettings}
          onBlur={(e) => {
            handleSettingsUpdate(e, "maxBookingLength");
          }}
        />
      </FormRow>
      <FormRow labelName="Maximum guests/booking">
        <Input
          type="number"
          id="maxGuestsPerBooking"
          defaultValue={maxGuestsPerBooking}
          disabled={isUpdatingSettings}
          onBlur={(e) => {
            handleSettingsUpdate(e, "maxGuestsPerBooking");
          }}
        />
      </FormRow>
      <FormRow labelName="Breakfast price">
        <Input
          type="number"
          id="breakfastPrice"
          defaultValue={breakfastPrice}
          disabled={isUpdatingSettings}
          onBlur={(e) => {
            handleSettingsUpdate(e, "breakfastPrice");
          }}
        />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
