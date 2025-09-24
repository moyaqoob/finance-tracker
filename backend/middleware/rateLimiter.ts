import type { NextFunction, Request, Response } from "express";
import rateLimit from "../config/upstash.js";

const rateLimiter = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const key = req.ip || 'my-rate-limit';
    const {success} = await rateLimit.limit(key);

    if (!success) {
      return res.status(429).json({
        message:"Too many requests. Please try again later"
       })
    }
    next();
  } catch (error) {
    next(error);
  }
};


export default rateLimiter;