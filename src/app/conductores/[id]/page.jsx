import BackButton from '@/components/back-button'
import { obtenerConductor } from '@/lib/data'
import { Suspense, use } from 'react'


async function PaginaConductor({ params }) {
    const { id } = await params

    const promesaConductor = obtenerConductor(id)

    return (
        <div>
            <BackButton className="cursor-pointer hover:text-blue-600">
                <h1 className='text-4xl'>Conductor</h1>
            </BackButton>

            <Suspense fallback={<p className='text-2xl text-blue-400'>Cargando...</p>}>
                <Conductor promesaConductor={promesaConductor} />
            </Suspense>

        </div>
    )
}

export default PaginaConductor




function Conductor({ promesaConductor }) {
    const conductor = use(promesaConductor)

    return (
        <div className='p-4 md:p-8 border border-blue-400'>
            <p>Nombre: {conductor.nombre}</p>
            <p>Teléfono: {conductor.telefono}</p>
        </div>
    )
}
