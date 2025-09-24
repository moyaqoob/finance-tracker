import {neon} from "@neondatabase/serverless"

import "dotenv/config.js"

export const sql  = neon(process.env.DATABASE_URL!);