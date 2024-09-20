import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  let { data, error } = await supabase.from("cabins").select("*");
  if (error) {
    console.error(error);
    throw new Error("couldn't fetch cabins");
  }
  return data;
}

export async function createCabin(newCabin) {
  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );
  const bucketUrl =
    "https://bjstfgvivrrufoflsrrj.supabase.co/storage/v1/object/public/cabins/";
  console.log(newCabin.image.name);
  const imagePath = `${bucketUrl}${imageName}`;
  console.log(imagePath);
  const { data, error } = await supabase
    .from("cabins")
    .insert([{ ...newCabin, image: imagePath }])
    .select();
  if (error) {
    console.error(error);
    throw new Error("couldn't create cabins");
  }

  //uploading the image
  const { error: storageError } = await supabase.storage
    .from("cabins")
    .upload(imageName, newCabin.image);
  if (storageError) {
    //if failed whilst uploading, deleted the same added cabin
    await supabase
      .from("cabins")
      .delete()
      .eq("id", data[data.length - 1].id);
    console.log(data);
    throw new Error("couldn't upload theimage");
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
