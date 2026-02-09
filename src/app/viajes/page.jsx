import ListaViajes from '@/components/viajes/lista'
import { obtenerViajes, obtenerConductoresIdNombre, obtenerPasajerosIdNombre } from '@/lib/data'
import Link from 'next/link'
import { Suspense } from 'react'


export default function PaginaViajes() {

    const promesaViajes = obtenerViajes()
    const promesaConductoresIdNombre = obtenerConductoresIdNombre()
    const promesaPasajerosIdNombre = obtenerPasajerosIdNombre()

    return (
        <div className='p-4'>

            <div className='flex justify-center items-center gap-4 pb-4'>
                <h1 className='text-4xl'>
                    <Link href="/" className="cursor-pointer hover:text-blue-600">
                        Viajes
                    </Link>
                </h1>
            </div>

            <Suspense fallback={<p className='text-2xl text-blue-400'>Cargando...</p>}>
                <ListaViajes
                    promesaViajes={promesaViajes}
                    promesaConductoresIdNombre={promesaConductoresIdNombre}
                    promesaPasajerosIdNombre={promesaPasajerosIdNombre}
                />
            </Suspense>
        </div>
    )
}
