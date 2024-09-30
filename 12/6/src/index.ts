import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';

export interface Env {
	DATABASE_URL: string;
}

export default {
	async fetch(request: Request, env: Env, etx: ExecutionContext): Promise<Response> {
		const prisma = new PrismaClient({
			datasourceUrl: env.DATABASE_URL,
		}).$extends(withAccelerate());

		const response = await prisma.log.create({
			data: {
				level: 'Info',
				message: 'Hello World',
				meta: {
					Headers: JSON.stringify(request.headers),
				},
			},
		});
		console.log(JSON.stringify(response));
		return new Response(`request method: ${request.method}, response: ${JSON.stringify(response)}`);
	},
};
