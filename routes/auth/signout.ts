import {  Handlers } from "$fresh/server.ts";
import { AdminData } from "../admin/index.tsx";
import { WithSession } from "fresh_session";
import { supabase } from "../../libs/supabase.ts";

export const handler: Handlers<AdminData, WithSession> = {
  POST: async (_, ctx) => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      return new Response(error.message, {
        status: 500,
      });
    }
    
    console.log('user', ctx.state.session.get("user"));
    ctx.state.session.clear();
    console.log('user', ctx.state.session.get("user"));
    return new Response(null, {
      status: 302,
      headers: {
        Location: "/login",
      },
    });
  },
};
