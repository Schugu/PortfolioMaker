import { FC, useState, useEffect } from "react";
import { UseFormSetValue } from "react-hook-form";
import { FormData } from "@/types/types.ts";

interface HobbiesInputProps {
  setValue: UseFormSetValue<FormData>;
}

const HobbiesInput: FC<HobbiesInputProps> = ({ setValue }) => {
  const [hobbies, setHobbies] = useState<string[]>(['']);

  useEffect(() => {
    setValue("hobbies", hobbies);
  }, [hobbies, setValue]);

  const handleAddHobby = () => {
    setHobbies([...hobbies, '']);
  };

  const handleRemoveHobby = (index: number) => {
    const newHobbies = hobbies.filter((_, i) => i !== index);
    setHobbies(newHobbies);
  };

  const handleChangeHobby = (index: number, value: string) => {
    const newHobbies = [...hobbies];
    newHobbies[index] = value;
    setHobbies(newHobbies);
  };

  return (
    <div className="flex flex-col gap-4 w-full">
      <label className="text-3xl">Hobbies:</label>
      {hobbies.map((hobby, index) => (
        <div key={index} className="flex items-center gap-2">
          <textarea
            placeholder="Hobby"
            value={hobby}
            onChange={(e) => handleChangeHobby(index, e.target.value)}
            className="block w-full p-2.5 text-xl bg-gray-50 border border-gray-300 text-gray-900 rounded-lg"
          />
          {index > 0 && (
            <button
              type="button"
              onClick={() => handleRemoveHobby(index)}
              className="p-2 bg-red-500 text-white rounded-lg"
            >
              Eliminar
            </button>
          )}
        </div>
      ))}
      <button
        type="button"
        onClick={handleAddHobby}
        className="mt-2 p-2 bg-blue-500 text-white rounded-lg"
      >
        Agregar Hobby
      </button>
    </div>
  );
};

export default HobbiesInput;
