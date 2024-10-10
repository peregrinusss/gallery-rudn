"use client";
import Button from "@/components/Button/Button";
import Input from "@/components/Input/Input";
import useAuth from "@/hooks/useAuth";
import { LoginArg, useLoginMutation } from "@/redux/app/apiSlice";
import Link from "next/link";
import { Controller, useForm } from "react-hook-form";

// Страница авторизации
const Page = () => {
  const { control, handleSubmit, reset } = useForm<LoginArg>();
  const [login] = useLoginMutation();
  const { setToken } = useAuth();

  const onSubmit = async (data: LoginArg) => {
    try {
      const result = await login(data).unwrap();

      // Сохраняем токен в Cookies, если авторизация успешна
      if (result.token) {
        setToken(result.token);
      }

      // Сброс формы после успешной авторизации
      reset();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="w-full h-full flex items-center justify-center mt-40">
      <div className="p-8 border border-gray rounded-[20px] w-full max-w-[500px] bg-white">
        <h2 className="text-3xl text-black font-bold">Войти в систему</h2>
        <div className="flex flex-col gap-4 mt-6">
          <Controller
            control={control}
            name="login"
            rules={{ required: true }}
            render={({ field }) => (
              <Input
                {...field}
                label="Логин"
                placeholder="Введите логин"
                type="text"
                className="[&>input]:!bg-gray"
              />
            )}
          />
          <Controller
            control={control}
            name="password"
            rules={{ required: true }}
            render={({ field }) => (
              <Input
                {...field}
                label="Пароль"
                placeholder="Введите пароль"
                type="password"
                className="[&>input]:!bg-gray"
              />
            )}
          />
        </div>
        <Button
          onClick={handleSubmit(onSubmit)}
          variant="primary"
          className="mt-6"
        >
          Войти
        </Button>
        <div className="text-center mt-4">
          <Link href="/catalog" className="text-primary text-base font-medium ">
            Войти как гость
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Page;
