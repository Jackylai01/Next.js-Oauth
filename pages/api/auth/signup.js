import connectMongo from "../../../database/conn";
import Users from "../../../model/UserSchema";
import { hash } from "bcryptjs";

export default async function handler(req, res) {
  connectMongo().catch((err) => res.json({ err: err }));

  if (req.method === "POST") {
    if (!req.body) return res.status(404).json({ err: "發生錯誤" });

    //stpe1 使用者在form-input送出的請求就是req.body
    const { username, email, password } = req.body;

    //stpe2 找到對應的email
    const foundUsersEmail = await Users.findOne({ email });

    //stpe3檢查資料庫是否有重複註冊的信箱
    if (foundUsersEmail) return res.status(422).json({ msg: "信箱已存在" });

    //stpe4 前面檢查通過-建立資料-並加密碼加密
    await Users.create(
      { username, email, password: await hash(password, 12) },
      function (err, data) {
        if (err) return res.status(404).json({ err });
        res.status(201).json({ status: true, user: data });
      }
    );
  } else {
    res.status(500).json({ msg: "HTTP methpd not valid only POST Accepted" });
  }
}
