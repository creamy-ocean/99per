import nodeMailer from "nodemailer";
import { config } from "../config.js";

const user = config.nodeMailer.user;
const password = config.nodeMailer.password;

export const verify = async (req, res, next) => {
  const { email } = req.body;
  const generateRandom = (min, max) => {
    const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    return randomNumber.toString();
  };

  const transporter = nodeMailer.createTransport({
    service: "gmail",
    auth: {
      user: user,
      pass: password,
    },
  });

  const number = generateRandom(111111, 999999);

  const mailOptions = {
    from: "99%",
    to: email,
    subject: "99% 회원가입을 위해 인증해주세요",
    html: `
        이메일 인증을 위한 인증번호입니다<br/>
        회원가입 페이지에서 아래 번호를 입력해주세요<br/>
        <h2>
          ${number}
        </h2>
      `,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).json({ error });
    }
    req.number = number;
    next();
  });
};
