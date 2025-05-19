import connectDB from "@/config/database";
import Property from "@/models/Property";

export default async function fetchProperties() {
  await connectDB();
  const docs = await Property.find({}).lean();

  return docs.map((doc) => ({
    ...doc,
    _id: doc._id.toString(),
  }));
}
