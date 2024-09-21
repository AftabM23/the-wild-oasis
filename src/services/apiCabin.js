import supabase from "./supabase";

export async function getCabins() {
  let { data, error } = await supabase.from("cabins").select("*");
  if (error) {
    console.error(error);
    throw new Error("couldn't fetch cabins");
  }
  return data;
}

export async function createCabin(newCabin) {
  console.log(newCabin);
  console.log(newCabin.image);
  const bucketUrl =
    "https://bjstfgvivrrufoflsrrj.supabase.co/storage/v1/object/public/cabins/";
  const imageName = `${Math.random()}-${newCabin?.image.name}`.replaceAll(
    "/",
    ""
  );
  console.log(imageName);
  const imagePath = `${bucketUrl}${imageName}`;
  console.log(imagePath);
  //inserting data
  const { data, error } = await supabase
    .from("cabins")
    .insert([{ ...newCabin, image: imagePath }])
    .select();
  if (error) {
    console.log(error);
    throw new Error("failed while creating  cabin");
  }
  //uploading images to the supabase bucket
  const { error: storageError } = await supabase.storage
    .from("cabins")
    .upload(imageName, newCabin.image);

  if (storageError) {
    // If the upload fails, delete the recently added cabin
    await supabase.from("cabins").delete().eq("id", data.id);
    console.log(storageError);

    throw new Error("Couldn't upload the image");
  }

  return data;
}

export async function deleteCabin(cabinId) {
  const { data, error } = await supabase
    .from("cabins")
    .delete()
    .eq("id", cabinId);
  if (error) {
    console.error(error);
    throw new Error("couldn't delete cabins");
  }
  return data;
}
