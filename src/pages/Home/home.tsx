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
    </section>
  );
}
