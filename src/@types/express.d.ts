declare module Express {
  export interface Request {
    decoded?: string | object;
  }
}
