import { useState, useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { FormData } from "@/types/types.ts";

interface Step1Props {
  nextStep: () => void;
}

export default function Step1({ nextStep }: Step1Props) {
  const { register, handleSubmit, formState: { errors }, setValue, getValues } = useFormContext<FormData>();
  const [titles, setTitles] = useState<string[]>(getValues("titles") || ['']);

  useEffect(() => {
    setValue("titles", titles);
  }, [titles, setValue]);

  const onSubmit = (data: FormData) => {
    console.log(data); // Muestra los datos en la consola
    nextStep();
  };

  const addTitle = () => {
    setTitles([...titles, '']);
  };

  const removeTitle = (index: number) => {
    const newTitles = titles.filter((_, i) => i !== index);
    setTitles(newTitles);
  };

  const handleTitleChange = (index: number, value: string) => {
    const newTitles = [...titles];
    newTitles[index] = value;
    setTitles(newTitles);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='w-full flex flex-col gap-2 items-center'>
      <h2>Paso 1: Información Personal</h2>

      <section className='w-full grid grid-cols-2 gap-4'>
        <article className='flex flex-col gap-2 justify-start items-start'>
          <label htmlFor="fullName" className="text-2xl">Nombre y apellido:</label>
          <input
            id="fullName"
            className="block w-full p-2.5 text-xl bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            type="text"
            {...register('fullName', {
              required: "El nombre es obligatorio.",
              maxLength: { value: 30, message: "El nombre no puede tener más de 30 caracteres" },
              pattern: { value: /^[A-Za-záéíóúÁÉÍÓÚ\s]+$/, message: "El nombre solo puede contener letras y espacios" }
            })}
            placeholder="Jon Doe"
          />
          {errors.fullName && errors.fullName.message && <p className="text-red-500">{errors.fullName.message}</p>}
        </article>

        <article className='flex flex-col gap-2 justify-start items-start'>
          <label htmlFor="years" className="text-2xl">Años:</label>
          <input
            id="years"
            className="block w-full p-2.5 text-xl bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            type="number"
            {...register('years', {
              required: "La edad es obligatoria.",
              min: { value: 12, message: "La edad debe ser mayor a 11." },
              max: { value: 99, message: "La edad debe ser menor a 100." }
            })}
            placeholder="24 años"
          />
          {errors.years && errors.years.message && <p className="text-red-500">{errors.years.message}</p>}
        </article>

        <article className='flex flex-col gap-2 justify-start items-start'>
          <label htmlFor="nacionality" className="text-2xl">Nacionalidad:</label>
          <input
            id="nacionality"
            className="block w-full p-2.5 text-xl bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            type="text"
            {...register('nacionality', {
              required: "La nacionalidad es obligatoria.",
              maxLength: { value: 60, message: "La nacionalidad no puede tener más de 60 caracteres" },
              pattern: { value: /^[A-Za-záéíóúÁÉÍÓÚ\s]+$/, message: "La nacionalidad solo puede contener letras y espacios" }
            })}
            placeholder="Argentina"
          />
          {errors.nacionality && errors.nacionality.message && <p className="text-red-500">{errors.nacionality.message}</p>}
        </article>
      </section>

      {/* Inputs dinámicos para títulos */}
      <section className='w-full flex flex-col gap-2'>
        <label className="text-2xl">Títulos:</label>
        {titles.map((title, index) => (
          <div key={index} className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <input
                id={`titles.${index}`}
                className="block w-full p-2.5 text-xl bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                type="text"
                {...register(`titles.${index}`, { required: "El título es obligatorio." })}
                value={title}
                onChange={(e) => handleTitleChange(index, e.target.value)}
                placeholder="Desarrollador Front-End"
              />
              {index > 0 && (
                <button
                  type="button"
                  onClick={() => removeTitle(index)}
                  className="p-2 bg-red-500 text-white rounded-lg"
                >
                  Eliminar
                </button>
              )}
            </div>
            {errors.titles && errors.titles[index] && (
              <p className="text-sm text-red-500">{errors.titles[index]?.message}</p>
            )}
          </div>
        ))}
      </section>

      <button type="button" onClick={addTitle} className="mt-2 p-2 bg-blue-500 text-white rounded-lg">
        Agregar otro título
      </button>
      <button type="submit" className="mt-2 p-2 bg-green-500 text-white rounded-lg">Siguiente</button>
    </form>
  );
}
