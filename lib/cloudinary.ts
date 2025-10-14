import { v2 as cloudinary } from 'cloudinary'

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
})

export { cloudinary }

export async function uploadImage(
  file: File | Buffer,
  folder: string = 'pinkcart'
): Promise<{ url: string; public_id: string }> {
  try {
    // Convert File to Buffer if needed
    let buffer: Buffer
    if (file instanceof File) {
      buffer = Buffer.from(await file.arrayBuffer())
    } else {
      buffer = file
    }

    console.log('Uploading to Cloudinary...', {
      folder,
      bufferSize: buffer.length,
      cloudName: process.env.CLOUDINARY_CLOUD_NAME
    })

    // Convert buffer to base64 data URI
    const base64String = buffer.toString('base64')
    const dataUri = `data:image/jpeg;base64,${base64String}`

    // Use Cloudinary SDK with current timestamp (system time is now fixed)
    const result = await cloudinary.uploader.upload(dataUri, {
      folder: folder,
      resource_type: 'image',
      quality: 'auto:good',
      fetch_format: 'auto'
    })

    console.log('Upload successful:', {
      url: result.secure_url,
      public_id: result.public_id
    })

    return {
      url: result.secure_url,
      public_id: result.public_id
    }
  } catch (error) {
    console.error('Cloudinary upload failed:', error)
    throw new Error(`Failed to upload image: ${error.message}`)
  }
}

export async function deleteImage(publicId: string): Promise<void> {
  try {
    await cloudinary.uploader.destroy(publicId)
  } catch (error) {
    console.error('Cloudinary delete error:', error)
    throw new Error('Failed to delete image')
  }
}
