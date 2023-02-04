import React, { useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Layout from "../layout/layout";
import Link from "next/link";
import styles from "../styles/Form.module.css";
import Image from "next/image";
import { HiAtSymbol, HiFingerPrint } from "react-icons/hi";
import { signIn } from "next-auth/react";
import { useFormik } from "formik";
import login_validdate from "../lib/validate";

const login = () => {
  const callbackUrl = "https://next-js-oauth.vercel.app"
  const [show, setShow] = useState(false);
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validate: login_validdate,
    onSubmit,
  });

  async function onSubmit(values) {
    const loginUser = await signIn("credentials", {
      redirect: false,
      email: values.email,
      password: values.password,
      callbackUrl: "/",
    });
    if (loginUser.ok) router.push(loginUser.url);
  }

  // Google Handler function
  async function handleGoogleSignin(e) {
    //須注意一定要加e.preventDefault-禁制他先POST，不然會報錯
    e.preventDefault();
    //googleOAuth會自動幫我們轉址
    signIn("google", { callbackUrl: callbackUrl });
  }

  //Github Login

  async function handleGithubSignin(e) {
    //須注意一定要加e.preventDefault-禁制他先POST，不然會報錯
    e.preventDefault();
    //githubOAuth會自動幫我們轉址
    signIn("github", { callbackUrl: callbackUrl });
  }

  return (
    <>
      <Layout>
        <Head>
          <title>Next-Oauth測試 登入系統</title>
        </Head>
        <section className="w-3/4 mb-10 mx-auto flex flex-col">
          <div className="title">
            <h1 className="text-gray-800 text-4xl font-bold py-4">Explore</h1>
            <p className="w-3/4 mx-auto text-gray-400">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores,
              officia?
            </p>
          </div>

          {/* form */}
          <form className="flex flex-col gap-5" onSubmit={formik.handleSubmit}>
            <div
              className={`${styles.input_group} ${
                formik.errors.email && formik.touched.email
                  ? "border-rose-600"
                  : ""
              }`}
            >
              <input
                type="email"
                name="email"
                placeholder="Email"
                className={styles.input_text}
                {...formik.getFieldProps("email")}
              />
              <span className="icon flex items-center px-4">
                <HiAtSymbol size={25} />
              </span>
            </div>
            {/* {formik.errors.email && formik.touched.email ? <span className='text-rose-500'>{formik.errors.email}</span> : <></>} */}

            <div
              className={`${styles.input_group} ${
                formik.errors.password && formik.touched.password
                  ? "border-rose-600"
                  : ""
              }`}
            >
              <input
                type={`${show ? "text" : "password"}`}
                name="password"
                placeholder="password"
                className={styles.input_text}
                {...formik.getFieldProps("password")}
              />
              <span
                className="icon flex items-center px-4"
                onClick={() => setShow(!show)}
              >
                <HiFingerPrint size={25} />
              </span>
            </div>

            {/* {formik.errors.password && formik.touched.password ? <span className='text-rose-500'>{formik.errors.password}</span> : <></>} */}
            {/* login buttons */}
            <div className="input-button">
              <button type="submit" className={styles.button}>
                登入
              </button>
            </div>
            <div className="input-button">
              <button
                type="button"
                onClick={handleGoogleSignin}
                className={styles.button_custom}
              >
                Sign In with Google
                <Image
                  src={"/assets/google.svg"}
                  alt=""
                  width="20"
                  height={20}
                ></Image>
              </button>
            </div>
            <div className="input-button">
              <button
                type="button"
                onClick={handleGithubSignin}
                className={styles.button_custom}
              >
                Sign In with Github
                <Image
                  src={"/assets/github.svg"}
                  width={25}
                  height={25}
                  alt=""
                ></Image>
              </button>
            </div>
          </form>

          {/* bottom */}
          <p className="text-center text-gray-400 ">
            您還沒有註冊帳戶?
            <Link href={"/register"}>
              <b className="text-blue-700">註冊</b>
            </Link>
          </p>
        </section>
      </Layout>
    </>
  );
};

export default login;
