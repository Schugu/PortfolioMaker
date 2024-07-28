// TitleInput.tsx
import { FC, useState, useEffect } from "react";
import { UseFormRegister, FieldError, UseFormSetValue } from "react-hook-form";
import { FormData } from "@/types/types.ts";

interface TitleInputProps {
  register: UseFormRegister<FormData>;
  setValue: UseFormSetValue<FormData>; // Agrega esto para poder actualizar el valor del formulario
  errors?: FieldError[];
}

const TitleInput: FC<TitleInputProps> = ({ register, setValue, errors }) => {
  const [titles, setTitles] = useState(['']);

  // Usa useEffect para actualizar el valor del formulario cuando titles cambie
  useEffect(() => {
    setValue("titles", titles); // Actualiza el valor del formulario
  }, [titles, setValue]);

  const handleAddTitle = () => {
    setTitles([...titles, '']);
  };

  const handleRemoveTitle = (index: number) => {
    const newTitles = titles.filter((_, i) => i !== index);
    setTitles(newTitles);
  };

  const handleChangeTitle = (index: number, value: string) => {
    const newTitles = [...titles];
    newTitles[index] = value;
    setTitles(newTitles);
  };

  return (
    <div className="flex flex-col gap-2 w-full">
      <label className="text-3xl">Títulos:</label>
      {titles.map((title, index) => (
        <div key={index} className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <input
              id={`title-${index}`}
              className="block w-full p-2.5 text-2xl bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              type="text"
              {...register(`titles.${index}`, { required: true })}
              value={title}
              onChange={(e) => handleChangeTitle(index, e.target.value)}
              placeholder="Desarrollador Front-End, Ingeniero en sistemas"
            />

            {index >= 1 && (
              <button
                type="button"
                onClick={() => handleRemoveTitle(index)}
                className="p-2 bg-red-500 text-white rounded-lg"
              >
                Eliminar
              </button>
            )}
          </div>

          {errors && errors[index] && (
            <p className="text-sm text-red-500">Falta ingresar el título.</p>
          )}
        </div>
      ))}
      <button
        type="button"
        onClick={handleAddTitle}
        className="mt-2 p-2 bg-blue-500 text-white rounded-lg"
      >
        Agregar otro título
      </button>
    </div>
  );
};

export default TitleInput;
