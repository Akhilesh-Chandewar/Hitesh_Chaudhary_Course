import { NextResponse, NextRequest } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';
import { auth } from '@clerk/nextjs/server';
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME!,
    api_key: process.env.CLOUDINARY_API_KEY!,
    api_secret: process.env.CLOUDINARY_API_SECRET!,
});

interface CloudinaryUploadResult {
    public_id: string;
    secure_url: string;
    bytes: number;
    duration?: number;
    [key: string]: any;
}

export async function POST(request: NextRequest) {
    const { userId } = await auth();

    if (!userId) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (
        !process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME ||
        !process.env.CLOUDINARY_API_KEY ||
        !process.env.CLOUDINARY_API_SECRET
    ) {
        return NextResponse.json({ error: 'Cloudinary configuration is missing' }, { status: 500 });
    }

    try {
        const formData = await request.formData();
        const file = formData.get('video') as File | null;
        const title = formData.get('title') as string;
        const description = formData.get('description') as string;
        const originalSize = formData.get('originalSize') as string;

        if (!file) {
            return NextResponse.json({ error: 'No file provided' }, { status: 400 });
        }

        if (!title || !originalSize) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        const result = await new Promise<CloudinaryUploadResult>((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
                {
                    resource_type: 'auto',
                    folder: `cloudvault_videos/${userId}`,
                    transformation: [{ quality: 'auto', fetch_format: 'auto' }],
                },
                (error, result) => {
                    if (error || !result) {
                        reject(error || new Error('Upload failed'));
                    } else {
                        resolve(result);
                    }
                }
            );
            uploadStream.end(buffer);
        });

        const video = await prisma.video.create({
            data: {
                title,
                description,
                originalSize,
                publicId: result.public_id,
                compressedSize: String(result.bytes),
                duration: result.duration || 0,
            },
        });

        return NextResponse.json({ message: 'Upload successful', video });
    } catch (error) {
        console.error('Video upload error:', error);
        return NextResponse.json({ error: 'Upload video failed' }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}
