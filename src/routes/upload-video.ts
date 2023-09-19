import { FastifyInstance } from "fastify";
import { fastifyMultipart} from '@fastify/multipart'
import { prisma } from "../lib/prisma";
import path from "node:path";

export async function uploadVideoRoute(app: FastifyInstance) {
    app.register(fastifyMultipart, {
        limits: {
            fileSize: 1_048_576 * 25, // 25mb
        }
    })
    
    app.post('/videos', async (request, reply) => {
        const data = await request.file()

        if (!data) {
            return reply.status(400).send({ error: 'Missing file input.' })
        }

        const extension = path.extname(data.filename)

        if (extension != '.mp3') {
            return reply.status(400).send({ error: 'Invalid input type, please upload a MP3.' })
        }

        const fileBaseName = path.basename(data.filename, extension)

        const fileUploadName = `${fileBaseName}-`
    })
}