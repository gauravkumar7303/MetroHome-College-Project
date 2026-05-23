import { NextResponse } from 'next/server'
import cloudinary from 'cloudinary'

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

export async function POST(request) {
  try {
    const formData = await request.formData()
    const file = formData.get('file')
    
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    
    const result = await new Promise((resolve, reject) => {
      cloudinary.v2.uploader.upload_stream({ folder: 'metrohome' }, (error, result) => {
        if (error) reject(error)
        else resolve(result)
      }).end(buffer)
    })
    
    return NextResponse.json({ success: true, url: result.secure_url })
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}