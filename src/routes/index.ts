import express, { Request, Response, NextFunction } from "express";
const router = express.Router();

import jsonwebtoken, { sign, verify } from "jsonwebtoken";

interface ICustomRequest extends Request {
  decoded?: string | object;
}

router.get("/", isVerify, (req: ICustomRequest, res: Response) => {
  console.log(req.decoded);
  res.send("main");
});

router.get("/login", (req: Request, res: Response) => {
  let token = sign({ email: "abc@naver.com" }, "apple", { expiresIn: "30s" });

  res.cookie("user", token);
  // res.json({ token: token });
  // res.header({ Authorization: `Bearer ${token}` });
  res.redirect("/");
});

function isVerify(req: ICustomRequest, res: Response, next: NextFunction) {
  try {
    req.decoded = verify(req.cookies.user, "apple");
    return next();
  } catch (err) {
    console.log(err);
    if (err.name === "TokenExpiredError") {
      return res.status(419).json({
        resultCode: 419,
        message: "토큰 만료",
      });
    }
    return res.status(401).json({
      resultCode: 401,
      message: "토큰이 유효하지 않습니다.",
    });
  }
}

function isNotVerify(req: ICustomRequest, res: Response, next: NextFunction) {
  try {
    req.decoded = verify(req.cookies.user, "apple");
    return next();
  } catch (err) {
    // console.log(err);
    if (err.name === "TokenExpiredError") {
      return res.status(419).json({
        resultCode: 419,
        message: "토큰 만료",
      });
    }
    return res.status(401).json({
      resultCode: 401,
      message: "토큰이 유효하지 않습니다.",
    });
  }
}

export default router;
