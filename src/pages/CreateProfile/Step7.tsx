
interface Step7Props {
  prevStep: () => void;
  handleSubmit: () => void;
}

export default function Step7({ prevStep, handleSubmit }: Step7Props) {
  return (
    <section className="w-full flex flex-col gap-2 items-center">
      <h2>Paso 7: Descarga</h2>

      <button type="button" onClick={handleSubmit} className="p-2 bg-green-500 text-white rounded-lg">
        Descargar archivos
      </button>

      <div className="mt-4 flex gap-2">
        <button type="button" onClick={prevStep} className="p-2 bg-gray-500 text-white rounded-lg">
          Anterior
        </button>
      </div>
    </section>
  )
}
