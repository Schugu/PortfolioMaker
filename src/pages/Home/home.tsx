import DownloadJson from "@/components/DownloadJson.tsx";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function Home() {
  const { register, handleSubmit, formState: { errors }, setValue } = useForm();
  const [dataJSON, setDataJSON] = useState({});
  const [titles, setTitles] = useState(['']);

  const handleAddTitle = () => {
    setTitles([...titles, '']);
  };

  const handleRemoveTitle = (index) => {
    const newTitles = titles.filter((_, i) => i !== index);
    setTitles(newTitles);
    setValue('titles', newTitles);
  };

  const onSubmit = handleSubmit(data => {
    const dataValid = {
      ...data,
      titles: titles.filter(title => title),
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
    </section>
  );
}
