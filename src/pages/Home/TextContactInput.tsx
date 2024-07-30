import { FC, useState, useEffect } from "react";
import { UseFormSetValue } from "react-hook-form";
import { FormData } from "@/types/types.ts";

interface TextContactInputProps {
  setValue: UseFormSetValue<FormData>;
}

const TextContactInput: FC<TextContactInputProps> = ({ setValue }) => {
  const [textContact, setTextContact] = useState<string[]>(['']);

  useEffect(() => {
    setValue("textContact", textContact);
  }, [textContact, setValue]);

  const handleAddText = () => {
    setTextContact([...textContact, '']);
  };

  const handleRemoveText = (index: number) => {
    const newTextContact = textContact.filter((_, i) => i !== index);
    setTextContact(newTextContact);
  };

  const handleChangeText = (index: number, value: string) => {
    const newTextContact = [...textContact];
    newTextContact[index] = value;
    setTextContact(newTextContact);
  };

  return (
    <div className="flex flex-col gap-4 w-full">
      <label className="text-3xl">Texto de Contacto:</label>
      {textContact.map((text, index) => (
        <div key={index} className="flex items-center gap-2">
          <textarea
            placeholder="Texto de Contacto"
            value={text}
            onChange={(e) => handleChangeText(index, e.target.value)}
            className="block w-full p-2.5 text-xl bg-gray-50 border border-gray-300 text-gray-900 rounded-lg"
          />
          {index > 0 && (
            <button
              type="button"
              onClick={() => handleRemoveText(index)}
              className="p-2 bg-red-500 text-white rounded-lg"
            >
              Eliminar
            </button>
          )}
        </div>
      ))}
      <button
        type="button"
        onClick={handleAddText}
        className="mt-2 p-2 bg-blue-500 text-white rounded-lg"
      >
        Agregar Texto de Contacto
      </button>
    </div>
  );
};

export default TextContactInput;
