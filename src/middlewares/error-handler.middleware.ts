import { NextFunction, Request, Response } from "express";

const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.error(err);
  res
    .status(500)
    .send({ errors: [{ message: "an internal server error occurred" }] });
};

export default errorHandler;
