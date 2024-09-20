"use client";
import Button from "@/components/Button/Button";
import Input from "@/components/Input/Input";

// Страница авторизации
const Page = () => {
  return (
    <div className="w-full h-full flex items-center justify-center mt-40">
      <div className="p-8 border border-gray rounded-[20px] w-full max-w-[500px] bg-white">
        <h2 className="text-3xl text-black font-bold">Войти в систему</h2>
        <div className="flex flex-col gap-4 mt-6">
          <Input
            label="Логин"
            placeholder="Введите логин"
            type="text"
            className="[&>input]:!bg-gray"
          />
          <Input
            label="Пароль"
            placeholder="Введите пароль"
            type="password"
            className="[&>input]:!bg-gray"
          />
        </div>
        <Button onClick={() => {}} variant="primary" className="mt-6">
          Войти
        </Button>
      </div>
    </div>
  );
};

export default Page;
