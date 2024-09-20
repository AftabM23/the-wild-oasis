import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCabin } from "../../services/apiCabin";
import toast from "react-hot-toast";
import FormRow from "../../ui/FormRow";

function CreateCabinForm() {
  const { register, handleSubmit, reset, formState, getValues } = useForm();
  const { errors } = formState;
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation({
    mutationFn: createCabin,
    onSuccess: () => {
      queryClient.invalidateQueries(["cabins"]);
      toast.success("cabin created successfully");
      reset();
    },
    onError: () => {
      toast.error("cabin creation failed");
    },
  });

  const handleOnSubmit = (data) => {
    mutate({ ...data, image: data.image[0] });
    console.log(data);
  };
  return (
    <Form onSubmit={handleSubmit(handleOnSubmit)}>
      <FormRow labelName="Cabin Name" errorMessage={errors?.name?.message}>
        <Input
          type="text"
          id="name"
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
          {...register("maxCapacity", { required: "Max Capacity is required" })}
        />
      </FormRow>
      <FormRow
        labelName="Regular price"
        errorMessage={errors?.regularPrice?.message}
      >
        <Input
          type="number"
          id="regularPrice"
          {...register("regularPrice", { required: "Regular price required" })}
        />
      </FormRow>

      <FormRow labelName="Discount" errorMessage={errors?.discount?.message}>
        <Input
          type="number"
          id="discount"
          defaultValue={0}
          {...register("discount", {
            validate: (discount) =>
              discount <= getValues().regularPrice ||
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
          {...register("description")}
        />
      </FormRow>

      <FormRow labelName="Cabin Photo" errorMessage={errors?.image?.message}>
        <FileInput id="image" accept="image/*" {...register("image")} />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset">
          Cancel
        </Button>
        <Button variation="primary" disabled={isLoading}>
          {isLoading ? "Creating Cabin" : "Create Cabin"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
