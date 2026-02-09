import BackButton from '@/components/back-button'
import { obtenerViaje } from '@/lib/data'
import { Suspense, use } from 'react'


async function PaginaViaje({ params }) {
    const { id } = await params

    const promesaViaje = obtenerViaje(id)

    return (
        <div>
            <BackButton className="cursor-pointer hover:text-blue-600">
                <h1 className='text-4xl'>Viaje</h1>
            </BackButton>

            <Suspense fallback={<p className='text-2xl text-blue-400'>Cargando...</p>}>
                <Viaje promesaViaje={promesaViaje} />
            </Suspense>

        </div>
    )
}

export default PaginaViaje




function Viaje({ promesaViaje }) {
    const viaje = use(promesaViaje)

    return (
        <div className='p-4 md:p-8 border border-blue-400'>
            <p>Fecha y hora: {viaje.fecha_hora.toLocaleString()}</p>
            <p>Origen: {viaje.origen}</p>
            <p>Destino: {viaje.destino}</p>
            <p>Precio billete: {viaje.precio_billete}€</p>
            <p>Conductor: {viaje.conductor ? viaje.conductor.nombre : 'Sin asignar'}</p>
            <p>Pasajeros: {viaje.pasajeros?.map(p => p.nombre).join(', ') || 'Ninguno'}</p>
        </div>
    )
}
