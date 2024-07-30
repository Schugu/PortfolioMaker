// Home.tsx
import DownloadJson from "@/components/DownloadJson.tsx";
import { useState } from "react";
import { useForm } from "react-hook-form";
import TitleInput from "./TitleInput.tsx";
import SocialInput from "./SocialInput.tsx";
import SkillsInput from "./SkillsInput.tsx";
import WorkExperienceInput from "./WorkExperienceInput.tsx";
import AboutMeInput from "./AboutMeInput.tsx";
import HobbiesInput from "./HobbiesInput.tsx";
import { FormData } from "@/types/types.ts";

export default function Home() {
  const { register, handleSubmit, formState: { errors }, setValue } = useForm<FormData>();
  const [dataJSON, setDataJSON] = useState({});

  const onSubmit = handleSubmit(data => {
    const dataValid = {
      ...data,
      profilePicture: "/profile/profilePicture.png"
    };
    console.log(dataValid);
    setDataJSON(dataValid);
  });

  return (
    <section className="w-full h-screen p-2 flex flex-col gap-20">
      <form className='w-1/2 flex flex-col items-center gap-3.5' onSubmit={onSubmit}>
        <div className="flex flex-col gap-2 w-full">
          <label htmlFor="fullName" className="text-3xl">Nombre y apellido:</label>
          <input
            id="fullName"
            className="block w-full p-2.5 text-2xl bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            type="text"
            {...register('fullName', { required: true, maxLength: 30, pattern: /^[A-Za-záéíóúÁÉÍÓÚ\s]+$/ })}
            placeholder="Jon Doe"
          />
          {errors.fullName && (
            <p className="text-sm text-red-500">Falta ingresar el nombre y el apellido.</p>
          )}
        </div>

        <TitleInput
          register={register}
          setValue={setValue}
        />

        <div className="flex flex-col gap-2 w-full">
          <label htmlFor="years" className="text-3xl">Años:</label>
          <input
            id="years"
            className="block w-full p-2.5 text-2xl bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            type="number"
            {...register('years', { required: true, min: 12, max: 99 })}
            placeholder="24 años"
          />
          {errors.years && (
            <p className="text-sm text-red-500">Edad inválida.</p>
          )}
        </div>

        <div className="flex flex-col gap-2 w-full">
          <label htmlFor="nacionality" className="text-3xl">Nacionalidad:</label>
          <input
            id="nacionality"
            className="block w-full p-2.5 text-2xl bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            type="text"
            {...register('nacionality', { required: true })}
            placeholder="Argentina"
          />
          {errors.nacionality && (
            <p className="text-sm text-red-500">Falta ingresar la nacionalidad.</p>
          )}
        </div>

        <AboutMeInput setValue={setValue} />

        <HobbiesInput setValue={setValue} />


        <SocialInput
          register={register}
          setValue={setValue}
        />

        <SkillsInput
          setValue={setValue}
        />

        <WorkExperienceInput setValue={setValue} />



        <button type="submit" className="bg-blue-500 text-white rounded-lg p-2">Enviar</button>
      </form>

      <DownloadJson data={dataJSON} />
    </section>
  );
}
