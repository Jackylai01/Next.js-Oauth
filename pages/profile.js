import Link from "next/link";
import { getSession } from "next-auth/react";

export default () => {
  return (
    <section className="container mx-auto text-center">
      <h3 className="text-4xl font-bold">Profile Page</h3>

      <h1 className="mt-10">感謝您的測試</h1>
      <br />
      <p>
        這個網站使用Next.js 12版本，並使用套件NextAuth
        進行第三方登入與本地端登入與註冊，本地端的資料庫為Mongodb。
      </p>
      <Link href={"/"}>返回首頁</Link>
    </section>
  );
};

export async function getServerSideProps({ req }) {
  const session = await getSession({ req });

  //只有登入的狀態才能來到這個路由
  if (!session) {
    return {
      redirect: {
        destination: "/login",
        premanent: false,
      },
    };
  }
  // 如果有憑證就給過
  return {
    props: { session },
  };
}
