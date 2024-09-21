import supabase from "./supabase";

//displaying the cabins
export async function getCabins() {
  let { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error(error);
    throw new Error("couldn't fetch cabins");
  }

  return data;
}

//creating and editing the cabins
export async function createEditCabin(newCabin, id) {
  console.log(newCabin, id);
  const bucketUrl =
    "https://bjstfgvivrrufoflsrrj.supabase.co/storage/v1/object/public/cabins/";

  const hasImagePath =
    typeof newCabin?.image === "string" && newCabin.image.startsWith(bucketUrl);

  const imageName =
    !hasImagePath &&
    `${Math.random()}-${newCabin?.image.name}`.replaceAll("/", "");
  console.log(imageName);
  const imagePath = hasImagePath ? newCabin.image : `${bucketUrl}${imageName}`;
  console.log(imagePath);
  //inserting data
  let query = supabase.from("cabins");

  //updating the cabins
  if (!id) {
    query = query.insert([{ ...newCabin, image: imagePath }]);
  }
  if (id) {
    query = query.update({ ...newCabin, image: imagePath }).eq("id", id);
  }

  const { data, error } = await query.select().single();
  //uploading images to the supabase bucket
  if (error) {
    console.log("Supabase error:", error);
    throw new Error(
      id ? "Failed to update the cabin" : "Failed to create the cabin"
    );
  }
  if (hasImagePath) return data;

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

//deleting the cabins
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
