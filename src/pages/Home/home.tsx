import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import TitleInput from "./TitleInput.tsx";
import SocialInput from "./SocialInput.tsx";
import SkillsInput from "./SkillsInput.tsx";
import WorkExperienceInput from "./WorkExperienceInput.tsx";
import AboutMeInput from "./AboutMeInput.tsx";
import HobbiesInput from "./HobbiesInput.tsx";
import TextContactInput from "./TextContactInput.tsx";
import LinksAndImagesInput from "./LinksAndImagesInput.tsx";
import { FormData } from "@/types/types.ts";

export default function Home() {
  const { register, handleSubmit, formState: { errors }, setValue } = useForm<FormData>();
  const [dataJSON, setDataJSON] = useState({});
  const [media, setMedia] = useState<{ profilePicture: File | null; cv: File | null; certificates: File[] }>({
    profilePicture: null,
    cv: null,
    certificates: []
  });

  const handleProfilePictureChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setMedia((prevState) => ({
        ...prevState,
        profilePicture: event.target.files![0]
      }));
    }
  };

  const handleCVChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setMedia((prevState) => ({
        ...prevState,
        cv: event.target.files![0]
      }));
    }
  };

  const handleDownloadAllMedia = async () => {
    const zip = new JSZip();
    const profileFolder = zip.folder("profile");
    const educationFolder = profileFolder?.folder("education");

    if (media.profilePicture) {
      profileFolder?.file('profilePicture.png', media.profilePicture);
    }

    if (media.cv) {
      profileFolder?.file('CV.pdf', media.cv);
    }

    media.certificates.forEach((file, index) => {
      educationFolder?.file(`${index + 1}.png`, file);
    });

    profileFolder?.file('profile.json', JSON.stringify(dataJSON, null, 2));

    const content = await zip.generateAsync({ type: "blob" });
    saveAs(content, "profile.zip");
  };

  const onSubmit: SubmitHandler<FormData> = (data) => {
    const dataValid = {
      ...data,
      profilePicture: "/profile/profilePicture.png"
    };
    console.log(dataValid);
    setDataJSON(dataValid);
  };

  return (
    <section className="w-full h-full p-2 flex flex-col gap-20">
      <form className='w-1/2 flex flex-col items-center gap-3.5' onSubmit={handleSubmit(onSubmit)}>
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

        <TitleInput register={register} setValue={setValue} />

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

        <TextContactInput setValue={setValue} />

        <SocialInput register={register} setValue={setValue} />

        <SkillsInput setValue={setValue} />

        <WorkExperienceInput setValue={setValue} />

        <LinksAndImagesInput setValue={setValue} setMedia={setMedia} media={media} />

        <div className="flex flex-col gap-2 w-full">
          <label htmlFor="profilePicture" className="text-3xl">Foto de perfil:</label>
          <input
            id="profilePicture"
            className="block w-full p-2.5 text-2xl bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            type="file"
            accept="image/*"
            onChange={handleProfilePictureChange}
          />
        </div>

        <div className="flex flex-col gap-2 w-full">
          <label htmlFor="cv" className="text-3xl">CV:</label>
          <input
            id="cv"
            className="block w-full p-2.5 text-2xl bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            type="file"
            accept=".pdf"
            onChange={handleCVChange}
          />
        </div>

        <button type="submit" className="bg-blue-500 text-white rounded-lg p-2">Enviar</button>
        <button type="button" onClick={handleDownloadAllMedia} className="mt-4 p-2 bg-blue-500 text-white rounded-lg">Descargar Todos los Medios</button>
      </form>
    </section>
  );
}
