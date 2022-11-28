import { useRouter } from "next/router";

const ForgotPassword = () => {
  const router = useRouter();
  return (
    <div className="p-12 bg-green-500" onClick={() => router.push("/login")}>
      <button
        className="p-4 bg-yellow-500"
        onClick={(e) => {
          e.stopPropagation();
          console.log("heading");
        }}
      >
        Forgot Password
      </button>
    </div>
  );
};

export default ForgotPassword;
