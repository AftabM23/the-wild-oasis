/* eslint-disable react/prop-types */
import { useForm } from "react-hook-form";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import FormRow from "../../ui/FormRow";

import useCreateCabins from "./useCreateCabins";
import useEditCabin from "./useEditCabin";

function CreateEditCabinForm({
  cabinData = {},
  editSession = false,
  setShowModal,
}) {
  const { register, handleSubmit, reset, formState, getValues } = useForm({
    defaultValues: cabinData,
  });
  const { creatingCabin, createCabin } = useCreateCabins();
  const { isUpdating, updateCabin } = useEditCabin();
  const { errors } = formState;

  const operationName = editSession ? "Done" : "Add Cabin";
  const loading = creatingCabin || isUpdating;
  const handleOnSubmit = (data) => {
    const imageIs =
      typeof data.image === "string" ? data.image : data?.image[0];
    if (editSession) {
      updateCabin({ data: { ...data, image: imageIs }, id: data.id });

      console.log(data);
    } else {
      createCabin(
        { ...data, image: imageIs },
        {
          onSuccess: () => {
            reset();
            setShowModal((show) => !show);
          },
        }
      );
    }
  };
  return (
    <Form
      onSubmit={handleSubmit(handleOnSubmit)}
      type={setShowModal ? "modal" : "regular"}
    >
      <FormRow labelName="Cabin Name" errorMessage={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          disabled={loading}
          {...register("name", { required: "name is required" })}
        />
      </FormRow>

      <FormRow
        labelName="Maximum Capicity"
        errorMessage={errors?.maxCapacity?.message}
      >
        <Input
          type="number"
          id="maxCapacity"
          disabled={loading}
          {...register("maxCapacity", { required: "Max Capacity is required" })}
        />
      </FormRow>
      <FormRow
        labelName="Regular price"
        disabled={loading}
        errorMessage={errors?.regularPrice?.message}
      >
        <Input
          type="number"
          id="regularPrice"
          disabled={loading}
          {...register("regularPrice", { required: "Regular price required" })}
        />
      </FormRow>

      <FormRow labelName="Discount" errorMessage={errors?.discount?.message}>
        <Input
          type="number"
          id="discount"
          defaultValue={0}
          disabled={loading}
          {...register("discount", {
            validate: (discount) =>
              discount < getValues().regularPrice ||
              "discount must be less than regular price",
          })}
        />
      </FormRow>

      <FormRow
        labelName="Description for website"
        errorMessage={errors?.description?.message}
      >
        <Textarea
          type="number"
          id="description"
          defaultValue=""
          disabled={loading}
          {...register("description")}
        />
      </FormRow>

      <FormRow labelName="Cabin Photo" errorMessage={errors?.image?.message}>
        <FileInput id="image" accept="image/*" {...register("image")} />
      </FormRow>

      <FormRow>
        <Button
          variation="secondary"
          type="reset"
          onClick={() => setShowModal((show) => !show)}
        >
          Cancel
        </Button>

        <Button variation="primary" disabled={loading}>
          {!loading
            ? operationName
            : creatingCabin
            ? "Adding Cabin"
            : "Updating cabin"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateEditCabinForm;
