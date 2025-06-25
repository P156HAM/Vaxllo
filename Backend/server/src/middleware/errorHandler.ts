import { Request, Response, NextFunction } from "express";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  console.error("Error:", err);

  // For XML endpoints, return a Hangup response
  if (req.path.startsWith("/telnyx")) {
    res.status(500).type("text/xml").send("<Response><Hangup/></Response>");
    return;
  }

  // For other endpoints, return JSON error
  res.status(500).json({
    error: {
      message: "An internal server error occurred",
      ...(process.env.NODE_ENV === "development" && { details: err.message }),
    },
  });
};
