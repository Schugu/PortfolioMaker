import { useState, useEffect, useRef } from "react";
import { useFormContext } from "react-hook-form";
import { FormData } from "@/types/types.ts";

interface Media {
  profilePicture: File | null;
  cv: File | null;
  certificates: File[];
}

interface Step6Props {
  nextStep: () => void;
  prevStep: () => void;
  setMedia: React.Dispatch<React.SetStateAction<Media>>;
  media: Media;
}

export default function Step6({ nextStep, prevStep, media, setMedia }: Step6Props) {
  const { setValue, handleSubmit, getValues } = useFormContext<FormData>();
  const [certificates, setCertificates] = useState<Array<{ link: string; image: File | null }>>(
    getValues("certificates")?.map((link: string) => ({ link, image: null })) || [
      { link: '', image: null }
    ]
  );

  const [error, setError] = useState<string | null>(null);

  const profilePictureInputRef = useRef<HTMLInputElement | null>(null);
  const cvInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const links = certificates.map(item => item.link);
    setValue("certificates", links); 

    const certificateFiles = certificates.map(item => item.image).filter(image => image !== null) as File[];
    setMedia(prevMedia => ({ ...prevMedia, certificates: certificateFiles })); 
  }, [certificates, setValue, setMedia]);

  const handleProfilePictureChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const file = event.target.files[0];
      setMedia(prevMedia => ({ ...prevMedia, profilePicture: file })); 
    }
  };

  const handleCVChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const file = event.target.files[0];
      setMedia(prevMedia => ({ ...prevMedia, cv: file })); 
    }
  };

  const handleAdd = () => {
    setCertificates([...certificates, { link: '', image: null }]);
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

  const handleChangeProfilePicture = () => {
    if (profilePictureInputRef.current) {
      profilePictureInputRef.current.click();
    }
  };

  const handleChangeCV = () => {
    if (cvInputRef.current) {
      cvInputRef.current.click(); 
    }
  };

  const onSubmit = () => {
    const certificatesLinks = getValues("certificates");

    if (!media.profilePicture || !media.cv) {
      setError("La foto de perfil y el CV son obligatorios.");
      return;
    }

    const hasInvalidCertificates = certificates.some(cert => cert.link && !cert.image);
    if (hasInvalidCertificates) {
      setError("Por favor, añade una imagen para cada enlace de certificado.");
      return;
    }

    if (certificatesLinks.every(link => link === '') && certificates.every(cert => !cert.image)) {
      setError(null);
      nextStep();
      return;
    }

    if (certificatesLinks.some(link => link === '')) {
      setError("Por favor, completa todos los enlaces de certificados.");
      return;
    }

    setError(null);
    console.log("Media:", media);
    console.log("Datos del formulario:", getValues());
    nextStep();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col gap-2 items-center">
      <h2>Paso 6: Certificados</h2>

      <div className="flex flex-col gap-2 w-full">
        <label htmlFor="profilePicture" className="text-3xl">Foto de perfil:</label>
        {media.profilePicture ? (
          <div className="flex justify-between items-center">
            <span className="text-xl">{media.profilePicture.name}</span>
            <button
              type="button"
              onClick={handleChangeProfilePicture}
              className="p-2 bg-blue-500 text-white rounded-lg"
            >
              Cambiar
            </button>
          </div>
        ) : (
          <input
            ref={profilePictureInputRef}
            id="profilePicture"
            className="block w-full p-2.5 text-2xl bg-gray-50 border border-gray-300 text-gray-900 rounded-lg"
            type="file"
            accept="image/*"
            onChange={handleProfilePictureChange}
          />
        )}
        <input
          ref={profilePictureInputRef}
          type="file"
          accept="image/*"
          onChange={handleProfilePictureChange}
          className="hidden" 
        />
      </div>

  
      <div className="flex flex-col gap-2 w-full">
        <label htmlFor="cv" className="text-3xl">CV:</label>
        {media.cv ? (
          <div className="flex justify-between items-center">
            <span className="text-xl">{media.cv.name}</span>
            <button
              type="button"
              onClick={handleChangeCV}
              className="p-2 bg-blue-500 text-white rounded-lg"
            >
              Cambiar
            </button>
          </div>
        ) : (
          <input
            ref={cvInputRef}
            id="cv"
            className="block w-full p-2.5 text-2xl bg-gray-50 border border-gray-300 text-gray-900 rounded-lg"
            type="file"
            accept=".pdf"
            onChange={handleCVChange}
          />
        )}
        <input
          ref={cvInputRef}
          type="file"
          accept=".pdf"
          onChange={handleCVChange}
          className="hidden" 
        />
      </div>

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

      {error && <p className="text-red-500">{error}</p>}
      <div className="mt-4 flex gap-2">
        <button type="button" onClick={prevStep} className="p-2 bg-gray-500 text-white rounded-lg">
          Anterior
        </button>
        <button type="submit" className="p-2 bg-green-500 text-white rounded-lg">
          Siguiente
        </button>
      </div>
    </form>
  );
}
