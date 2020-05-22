import express, { Request, Response, NextFunction } from "express";
const router = express.Router();

import { sign, verify } from "jsonwebtoken";

interface ICustomRequest extends Request {
  decoded?: string | object;
}

router.get("/", isVerify, (req: ICustomRequest, res: Response) => {
  console.log(req.decoded);

  res.render("index");
});

router.post("/download", isVerify, (req: ICustomRequest, res: Response) => {
  console.log(req.decoded);
  // console.log(req.body);
  const { fileName, htmlTag, styleTag } = req.body;

  res.setHeader("Content-type", "application/octet-stream");
  res.setHeader("Content-disposition", `attachment; filename=${fileName}.doc`);

  // const xmlTags = `xmlns:wpc="http://schemas.microsoft.com/office/word/2010/wordprocessingCanvas" xmlns:cx="http://schemas.microsoft.com/office/drawing/2014/chartex" xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006" xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" xmlns:m="http://schemas.openxmlformats.org/officeDocument/2006/math" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:wp14="http://schemas.microsoft.com/office/word/2010/wordprocessingDrawing" xmlns:wp="http://schemas.openxmlformats.org/drawingml/2006/wordprocessingDrawing" xmlns:w10="urn:schemas-microsoft-com:office:word" xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main" xmlns:w14="http://schemas.microsoft.com/office/word/2010/wordml" xmlns:w15="http://schemas.microsoft.com/office/word/2012/wordml" xmlns:w16se="http://schemas.microsoft.com/office/word/2015/wordml/symex" xmlns:wpg="http://schemas.microsoft.com/office/word/2010/wordprocessingGroup" xmlns:wpi="http://schemas.microsoft.com/office/word/2010/wordprocessingInk" xmlns:wne="http://schemas.microsoft.com/office/word/2006/wordml" xmlns:wps="http://schemas.microsoft.com/office/word/2010/wordprocessingShape" mc:Ignorable="w14 w15 w16se wp14"`;
  // const preHtml = `<html ${xmlTags}><head><meta charset='utf-8'><title>Export HTML To Doc</title></head><body>`;

  // const preHtml =
  // "<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>";
  const preHtml = "<html>";
  const preHead = `<head>`;
  const metaTag = `<meta charset='utf-8'>`;
  const titleTag = `<title>Export HTML To Doc</title>`;
  const preStyle = `<style>`;
  const stylesTag = styleTag;
  const postStyle = `</style>`;
  const postHead = `</head>`;
  const preBody = `<body>`;
  const body = htmlTag;
  const postBody = `</body>`;
  const postHtml = `</html>`;

  const arrHtml = [
    preHtml,
    preHead,
    metaTag,
    titleTag,
    preStyle,
    stylesTag,
    postStyle,
    postHead,
    preBody,
    body,
    postBody,
    postHtml,
  ];
  const htmlToWord = arrHtml.join("");
  res.send(htmlToWord);

  // response.setContentType("application/octet-stream");
  // response.setHeader("Content-Disposition", "attachment; filename="+filename2+".doc");
  // response.setHeader("Content-Description", "JSP Generated Data");
});

router.get("/login", (req: ICustomRequest, res: Response) => {
  let token = sign({ email: "abc@naver.com" }, "apple", { expiresIn: "1h" });
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

export default router;
