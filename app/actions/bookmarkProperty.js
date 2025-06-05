"use server";
import connectDB from "@/config/database";
import User from "@/models/User";
import { getSessionUser } from "@/utils/authOptions";
import { revalidatePath } from "next/cache";

async function bookmarkProperty(propertyId) {
  await connectDB();

  const sessionUser = await getSessionUser();

  if (!sessionUser || !sessionUser.userId) {
    throw new Error("User not authenticated");
  }

  const { userId } = sessionUser;

  const user = await User.findById(userId);

  let isBookmarked = user.bookmarks.includes(propertyId);

  let message;

  if (isBookmarked) {
    // Id already bookmarked, then remove
    user.bookmarks.pull(propertyId);
    message = "Bookmark removed";
    isBookmarked = false;
  } else {
    // If not bookmarked, then add
    user.bookmarks.push(propertyId);
    message = "Bookmark Added";
    isBookmarked = true;
  }

  await user.save();

  revalidatePath("/properties/saved", "page");

  return { message, isBookmarked };
}

export default bookmarkProperty;
