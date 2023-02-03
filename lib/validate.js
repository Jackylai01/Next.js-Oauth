export default function login_validate(values) {
  const errors = {};

  if (!values.email) {
    errors.email = "請輸入信箱";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "信箱格式錯誤";
  }

  // validation for password
  if (!values.password) {
    errors.password = "請輸入密碼";
  } else if (values.password.length < 8 || values.password.length > 20) {
    errors.password = "密碼格式錯誤，密碼最小8位數，最大20位數";
  } else if (values.password.includes(" ")) {
    errors.password = "無效的密碼";
  }

  return errors;
}

export function registerValidate(values) {
  const errors = {};

  if (!values.username) {
    errors.username = "請輸入姓名";
  } else if (values.username.includes(" ")) {
    errors.username = "無效的姓名";
  }

  if (!values.email) {
    errors.email = "請輸入信箱";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "無效的信箱";
  }

  // validation for password
  if (!values.password) {
    errors.password = "請輸入密碼";
  } else if (values.password.length < 8 || values.password.length > 20) {
    errors.password = "密碼格式錯誤，密碼最小8位數，最大20位數";
  } else if (values.password.includes(" ")) {
    errors.password = "無效的密碼";
  }

  // validate confirm password
  if (!values.cpassword) {
    errors.cpassword = "請輸入確認密碼";
  } else if (values.password !== values.cpassword) {
    errors.cpassword = "密碼不一致";
  } else if (values.cpassword.includes(" ")) {
    errors.cpassword = "無效的密碼";
  }

  return errors;
}
