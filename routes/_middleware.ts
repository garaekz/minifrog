import { MiddlewareHandlerContext } from '$fresh/server.ts';
import { getUserFromCookie } from '../libs/cookies.ts';
import { User } from "supabase";
import { supabase } from '../libs/supabase.ts';

export const handler = async (req: Request, ctx: MiddlewareHandlerContext): Promise <Response> => {
    const user: User | null = await getUserFromCookie(req);
    if (user) {
      const { data, error } = await supabase.from('profiles').select('*').eq('id', user.id).single();
      if (error) return ctx.next();
      const profile = data as User;
      profile.email = user.email;
      ctx.state.user = profile;
    }
    return ctx.next();
}