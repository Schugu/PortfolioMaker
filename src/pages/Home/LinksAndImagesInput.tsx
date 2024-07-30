import { FC, useState, useEffect } from "react";
import { UseFormSetValue } from "react-hook-form";
import { FormData } from "@/types/types.ts";

interface LinksAndImagesInputProps {
  setValue: UseFormSetValue<FormData>;
  setMedia: React.Dispatch<React.SetStateAction<{
    profilePicture: File | null;
    cv: File | null;
    certificates: File[];
  }>>;
  media: {
    profilePicture: File | null;
    cv: File | null;
    certificates: File[];
  };
}

const LinksAndImagesInput: FC<LinksAndImagesInputProps> = ({ setValue, setMedia }) => {
  const [certificates, setCertificates] = useState<Array<{
    link: string;
    image: File | null;
  }>>([
    {
      link: '',
      image: null
    }
  ]);

  useEffect(() => {
    const links = certificates.map(item => item.link);
    setValue("certificates", links);
    const certificateFiles = certificates.map(item => item.image).filter(image => image !== null) as File[];
    setMedia((prevMedia) => ({ ...prevMedia, certificates: certificateFiles }));
  }, [certificates, setValue, setMedia]);

  const handleAdd = () => {
    setCertificates([
      ...certificates,
      {
        link: '',
        image: null
      }
    ]);
  };

  const handleRemove = (index: number) => {
    const newCertificates = certificates.filter((_, i) => i !== index);
    setCertificates(newCertificates);
  };

  const handleChangeLink = (index: number, value: string) => {
    const newCertificates = [...certificates];
    newCertificates[index].link = value;
    setCertificates(newCertificates);
  };

  const handleChangeImage = (index: number, file: File | null) => {
    const newCertificates = [...certificates];
    newCertificates[index].image = file;
    setCertificates(newCertificates);
  };

  return (
    <div className="flex flex-col gap-4 w-full">
      <label className="text-3xl">Certificados:</label>
      {certificates.map((item, index) => (
        <div key={index} className="flex flex-col gap-2 border p-2 rounded-lg">
          <input
            type="text"
            placeholder="Link"
            value={item.link}
            onChange={(e) => handleChangeLink(index, e.target.value)}
            className="block w-full p-2.5 text-xl bg-gray-50 border border-gray-300 text-gray-900 rounded-lg"
          />
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleChangeImage(index, e.target.files ? e.target.files[0] : null)}
            className="block w-full p-2.5 text-xl bg-gray-50 border border-gray-300 text-gray-900 rounded-lg"
          />
          {index > 0 && (
            <button
              type="button"
              onClick={() => handleRemove(index)}
              className="p-2 bg-red-500 text-white rounded-lg"
            >
              Eliminar
            </button>
          )}
        </div>
      ))}
      <button
        type="button"
        onClick={handleAdd}
        className="mt-2 p-2 bg-green-500 text-white rounded-lg"
      >
        Agregar Certificado
      </button>
    </div>
  );
};

export default LinksAndImagesInput;
