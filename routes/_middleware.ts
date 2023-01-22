import { MiddlewareHandlerContext } from '$fresh/server.ts';
import { getUserFromCookie } from '../libs/cookies.ts';


export const handler = async (req: Request, ctx: MiddlewareHandlerContext) => {
    const user = await getUserFromCookie(req);
    ctx.state.user = user;
    return ctx.next();
}