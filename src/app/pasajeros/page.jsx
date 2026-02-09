import ListaPasajeros from '@/components/pasajeros/lista'
import { obtenerPasajeros } from '@/lib/data'
import Link from 'next/link'
import { Suspense } from 'react'


export default function PaginaPasajeros() {

    const promesaPasajeros = obtenerPasajeros()

    return (
        <div className='p-4'>

            <div className='flex justify-center items-center gap-4 pb-4'>
                <h1 className='text-4xl'>
                    <Link href="/" className="cursor-pointer hover:text-blue-600">
                        Pasajeros
                    </Link>
                </h1>
            </div>

            <Suspense fallback={<p className='text-2xl text-blue-400'>Cargando...</p>}>
                <ListaPasajeros
                    promesaPasajeros={promesaPasajeros}
                />
            </Suspense>
        </div>
    )
}
