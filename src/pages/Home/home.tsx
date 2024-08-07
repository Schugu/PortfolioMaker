import { Link } from 'react-router-dom';


export default function home() {
  return (
    <section className="w-full h-screen border-2 border-yellow-500 p-2 flex flex-col items-center gap-2">
      <h1>Seleccione una opción</h1>

      <article className="w-11/12 grid grid-cols-3 gap-10">
        <Link to='/createProfile' className="w-full h-52 border-2 border-yellow-500 flex flex-col gap-2 items-center">
          <span className='w-40 h-40 icon-[mdi--account-plus-outline]'></span>
          <p className='text-center text-2xl'>Crear perfil</p>
        </Link>
        <div className="w-full h-52 border-2 border-yellow-500 flex flex-col gap-2 items-center">
          <Link to='/createProfile'>Editar perfil</Link>
        </div>
        <div className="w-full h-52 border-2 border-yellow-500 flex flex-col gap-2 items-center">
          <Link to='/createProfile'>Crear perfil</Link>
        </div>
      </article>
    </section>
  )
}
