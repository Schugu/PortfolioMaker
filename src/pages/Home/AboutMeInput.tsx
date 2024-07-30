import { FC, useState, useEffect } from "react";
import { UseFormSetValue } from "react-hook-form";
import { FormData } from "@/types/types.ts";

interface AboutMeInputProps {
  setValue: UseFormSetValue<FormData>;
}

const AboutMeInput: FC<AboutMeInputProps> = ({ setValue }) => {
  const [aboutMe, setAboutMe] = useState<string[]>(['']);

  useEffect(() => {
    setValue("aboutMe", aboutMe);
  }, [aboutMe, setValue]);

  const handleAddDescription = () => {
    setAboutMe([...aboutMe, '']);
  };

  const handleRemoveDescription = (index: number) => {
    const newAboutMe = aboutMe.filter((_, i) => i !== index);
    setAboutMe(newAboutMe);
  };

  const handleChangeDescription = (index: number, value: string) => {
    const newAboutMe = [...aboutMe];
    newAboutMe[index] = value;
    setAboutMe(newAboutMe);
  };

  return (
    <div className="flex flex-col gap-4 w-full">
      <label className="text-3xl">Sobre Mí:</label>
      {aboutMe.map((description, index) => (
        <div key={index} className="flex items-center gap-2">
          <textarea
            placeholder="Descripción"
            value={description}
            onChange={(e) => handleChangeDescription(index, e.target.value)}
            className="block w-full p-2.5 text-xl bg-gray-50 border border-gray-300 text-gray-900 rounded-lg"
          />
          {index > 0 && (
            <button
              type="button"
              onClick={() => handleRemoveDescription(index)}
              className="p-2 bg-red-500 text-white rounded-lg"
            >
              Eliminar
            </button>
          )}
        </div>
      ))}
      <button
        type="button"
        onClick={handleAddDescription}
        className="mt-2 p-2 bg-blue-500 text-white rounded-lg"
      >
        Agregar Descripción
      </button>
    </div>
  );
};

export default AboutMeInput;
