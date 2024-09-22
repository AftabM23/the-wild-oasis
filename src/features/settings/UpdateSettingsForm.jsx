import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import useSettings from "./useSettings";
import Spinner from "../../ui/Spinner";

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
  if (isLoadingSettings) return <Spinner />;
  return (
    <Form>
      <FormRow labelName="Minimum nights/booking">
        <Input
          type="number"
          id="minimumBookinglength"
          defaultValue={minBookinglength}
        />
      </FormRow>
      <FormRow labelName="Maximum nights/booking">
        <Input
          type="number"
          id="maximumBookinglength"
          defaultValue={maxBookingLength}
        />
      </FormRow>
      <FormRow labelName="Maximum guests/booking">
        <Input
          type="number"
          id="maxGuestsPerBooking"
          defaultValue={maxGuestsPerBooking}
        />
      </FormRow>
      <FormRow labelName="Breakfast price">
        <Input
          type="number"
          id="breakfastPrice"
          defaultValue={breakfastPrice}
        />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
