import { S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3"
import { getSignedUrl } from "@aws-sdk/s3-request-presigner"
import 'dotenv/config'

const bucketName = process.env.BUCKET_NAME
const bucketRegion = process.env.BUCKET_REGION
const accessKey = process.env.ACCESS_KEY
const secretAccessKey = process.env.SECRET_ACCESS_KEY

const s3Client = new S3Client({
    credentials: {
        accessKeyId: accessKey!,
        secretAccessKey: secretAccessKey!,
    },
    region: bucketRegion
})

export function uploadFile(fileBuffer: Buffer, fileName: string, mimetype: string) {
    const uploadParams = {
        Bucket: bucketName,
        Body: fileBuffer,
        Key: fileName,
        ContentType: mimetype,
    }
    return s3Client.send(new PutObjectCommand(uploadParams));
}

export function deleteFile(fileName: string) {
    const deleteParams = {
        Bucket: bucketName,
        Key: fileName,
    }
    return s3Client.send(new DeleteObjectCommand(deleteParams))
}

export async function getObjectSignedUrl(key: string, expiresInSeconds = 14400) {
    const params = {
        Bucket: bucketName,
        Key: key
    }
    try {
        const command = new GetObjectCommand(params);
        const url = await getSignedUrl(s3Client, command, { expiresIn: expiresInSeconds });
        return url;
    } catch (error) {
        console.error('Error getting signed URL:', error);
        throw error;
    }
}