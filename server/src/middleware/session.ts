import { Request, Response, NextFunction } from "express";

export default async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  // 1. extract SID from headers
  // 2. see if SID in database
  // 3. create or refresh the session
  // 4. set some identifier inside the headers (accessible by the client i.e. not 'set-cookie') to be sent to the client
  // 5. on the client, extract (expiry, identifier, auth) data from the headers and set the cookie
}
