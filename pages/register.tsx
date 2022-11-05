import Head from "next/head";
import Image from "next/image";
import ThemeSwitcher from "@src/components/shared/ThemeSwitcher";
import Logo from "@src/images/logo.png";
import Link from "next/link";
import { FormEvent, useEffect, useRef, useState } from "react";
import Input from "@src/components/Input";
import useRegister from "@src/hooks/user/useRegister";
import Checkbox from "@src/components/shared/Checkbox";

const Register = () => {
  const emailRef = useRef<HTMLInputElement | null>(null);
  const usernameRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const nameRef = useRef<HTMLInputElement | null>(null);

  const { isError, isLoading, mutate, error, errorFields } = useRegister();

  const [isShowPassword, setIsShowPassword] = useState(false);

  useEffect(() => {
    emailRef.current?.focus();
  }, []);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const username = usernameRef.current?.value;
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;
    const name = nameRef.current?.value;

    if (username && email && password && name) {
      mutate({
        email,
        password,
        username,
        name,
      });
    }
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen select-none min-w-screen">
      <div className="absolute top-4 right-4">
        <ThemeSwitcher />
      </div>
      <Head>
        <title>Roarr - Register</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <div className="relative w-16 h-16 mx-auto">
        <Image src={Logo} alt="logo" />
      </div>

      <h1 className="mb-10 text-3xl font-semibold text-center ">
        Login to <span className="font-bold text-yellow-500">Roarr</span>
      </h1>

      <form
        onSubmit={onSubmit}
        className="flex flex-col gap-4 w-[300px] relative"
      >
        {isError && (
          <div className="max-w-[300px] w-[300px] absolute -top-7 text-center dark:text-red-400 text-red-500 ">
            {error}
          </div>
        )}

        <Input
          error={errorFields.find((err) => err.field === "email")?.message}
          ref={emailRef}
          type="text"
          label="Email Address"
        />
        <Input
          error={errorFields.find((err) => err.field === "name")?.message}
          ref={nameRef}
          type="text"
          label="Name"
        />
        <Input
          error={errorFields.find((err) => err.field === "username")?.message}
          ref={usernameRef}
          type="text"
          label="Username"
        />
        <Input
          error={errorFields.find((err) => err.field === "password")?.message}
          ref={passwordRef}
          label="Password"
          type={isShowPassword ? "text" : "password"}
        />

        <div className="flex items-center gap-3">
          <Checkbox toggleFunction={() => setIsShowPassword((val) => !val)} />
          <label>Show Password</label>
        </div>

        <button
          disabled={isLoading}
          type="submit"
          className="self-stretch my-btn"
        >
          Register
        </button>
      </form>

      <div className="mt-6 text-sm">
        already have an account ?{" "}
        <Link className="text-blue-500 dark:text-blue-300" href={"/login"}>
          login
        </Link>
      </div>
    </div>
  );
};

export default Register;
