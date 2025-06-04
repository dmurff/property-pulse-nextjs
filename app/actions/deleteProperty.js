"use server";
import cloudinary from "@/config/cloudinary";
import Property from "@/models/Property";
import connectDB from "@/config/database";
import { revalidatePath } from "next/cache";
import { getSessionUser } from "@/utils/getSessionUser";

async function deleteProperty(propertyId) {

    const sessionUser = await getSessionUser()

    if(!sessionUser || !sessionUser.userId) {
        throw new Error('User ID is required')}

            const {userId} = sessionUser 

            const property = await Property.findById(propertyId)

            if(!property) {
                throw new Error('property not found')
            }
        // Verify ownership
        if(property.owner.toString() !== userId){
            throw new Error('Unauthorized');
        }

        // Extract public id from image url
        const publicIds = property.images.map((imageUrl)=>{
            const parts = imageUrl.split('/')
            return parts.at(-1).split('.')[0]
        })
    
    // Delete images from cloudinary
    if(publicIds.length > 0){
        for(let publicId of publicIds){
            await cloudinary.uploader.destroy('propertypulse/' + publicId)
        }
    }

        await property.deleteOne();

        revalidatePath('/profile');

        


}

export default deleteProperty;