import { MiddlewareHandlerContext } from '$fresh/server.ts';
import { checkAuthHandler } from '../../handlers/CheckAuthHandler.ts';

export const handler = async (_: Request, ctx: MiddlewareHandlerContext): Promise <Response> => {
    return await checkAuthHandler(ctx);
}