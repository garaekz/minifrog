// DO NOT EDIT. This file is generated by fresh.
// This file SHOULD be checked into source version control.
// This file is automatically updated during development when running `dev.ts`.

import config from "./deno.json" assert { type: "json" };
import * as $0 from "./routes/_middleware.ts";
import * as $1 from "./routes/admin/index.tsx";
import * as $2 from "./routes/api/joke.ts";
import * as $3 from "./routes/auth/[provider]/callback.tsx";
import * as $4 from "./routes/index.tsx";
import * as $5 from "./routes/login/[provider].tsx";
import * as $6 from "./routes/login/index.tsx";
import * as $$0 from "./islands/CookieMonster.tsx";
import * as $$1 from "./islands/Counter.tsx";

const manifest = {
  routes: {
    "./routes/_middleware.ts": $0,
    "./routes/admin/index.tsx": $1,
    "./routes/api/joke.ts": $2,
    "./routes/auth/[provider]/callback.tsx": $3,
    "./routes/index.tsx": $4,
    "./routes/login/[provider].tsx": $5,
    "./routes/login/index.tsx": $6,
  },
  islands: {
    "./islands/CookieMonster.tsx": $$0,
    "./islands/Counter.tsx": $$1,
  },
  baseUrl: import.meta.url,
  config,
};

export default manifest;