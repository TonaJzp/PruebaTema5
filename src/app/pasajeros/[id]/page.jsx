import BackButton from '@/components/back-button'
import { obtenerPasajero } from '@/lib/data'
import { Suspense, use } from 'react'


async function PaginaPasajero({ params }) {
    const { id } = await params

    const promesaPasajero = obtenerPasajero(id)

    return (
        <div>
            <BackButton className="cursor-pointer hover:text-blue-600">
                <h1 className='text-4xl'>Pasajero</h1>
            </BackButton>

            <Suspense fallback={<p className='text-2xl text-blue-400'>Cargando...</p>}>
                <Pasajero promesaPasajero={promesaPasajero} />
            </Suspense>

        </div>
    )
}

export default PaginaPasajero




function Pasajero({ promesaPasajero }) {
    const pasajero = use(promesaPasajero)

    return (
        <div className='p-4 md:p-8 border border-blue-400'>
            <p>Nombre: {pasajero.nombre}</p>
            <p>Bonobús: {pasajero.bonobus ? 'Sí' : 'No'}</p>
        </div>
    )
}
