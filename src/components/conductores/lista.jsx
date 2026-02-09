'use client'
import Link from 'next/link'
import { use, useState } from 'react'
import Modal from '@/components/modal'
import Form from '@/components/conductores/form'
import { eliminarConductor, insertarConductor, modificarConductor } from '@/lib/actions'
import { IconoInsertar, IconoModificar, IconoEliminar } from '@/components/icons'


export default function Lista({ promesaConductores }) {

    const dataConductores = use(promesaConductores)
    const [propiedad, setPropiedad] = useState('nombre')
    const [orden, setOrden] = useState('')
    const [buscar, setBuscar] = useState('')

    let conductores = dataConductores
    if (orden === 'asc') conductores = dataConductores.toSorted((a, b) => a[propiedad].localeCompare(b[propiedad]))
    if (orden === 'desc') conductores = dataConductores.toSorted((a, b) => b[propiedad].localeCompare(a[propiedad]))

    if (buscar) conductores = conductores.filter((conductor) =>
        conductor.nombre.toLowerCase().includes(buscar.toLowerCase())
        || conductor.telefono.toLowerCase().includes(buscar.toLowerCase())
    )


    const Insertar = () =>
        <Modal openElement={<IconoInsertar />}>
            <h2 className='text-2xl font-bold'>INSERTAR CONDUCTOR</h2>
            <Form
                action={insertarConductor}
                textSubmit='Insertar'
            />
        </Modal>


    const Editar = ({ conductor }) =>
        <Modal openElement={<IconoModificar />}>
            <h2 className='text-2xl font-bold'>ACTUALIZAR CONDUCTOR</h2>
            <Form
                action={modificarConductor}
                textSubmit='Actualizar'
                conductor={conductor}
            />
        </Modal>


    const Eliminar = ({ conductor }) =>
        <Modal openElement={<IconoEliminar />}>
            <h2 className='text-2xl font-bold'>ELIMINAR CONDUCTOR</h2>
            <Form
                action={eliminarConductor}
                textSubmit='Eliminar'
                conductor={conductor}
                disabled
            />
        </Modal>


    const Card = ({ conductor, children }) =>
        <div className='p-4 rounded-lg bg-blue-200'>
            <Link href={`/conductores/${conductor.id}`} >
                <p>Nombre: {conductor.nombre} </p>
                <p>Teléfono: {conductor.telefono}</p>
            </Link>

            <div className='flex gap-2 justify-end'>
                {children}
            </div>
        </div>


    return (
        <div className="flex flex-col gap-4">

            <div className="flex flex-wrap gap-2 mb-2">

                <fieldset className="flex flex-wrap gap-2 mb-2">
                    <legend className='font-bold'>Filtrar</legend>
                    <input type="search" placeholder="Buscar"
                        value={buscar}
                        onChange={(e) => setBuscar(e.target.value)}
                        className="p-2 border rounded-md w-fit"
                    />
                </fieldset>
                <fieldset className="flex flex-wrap gap-2 mb-2">
                    <legend className='font-bold'>Ordenar</legend>
                    <select
                        value={orden}
                        onChange={(e) => setOrden(e.target.value)}
                        className="p-2 border rounded-md w-fit"
                    >
                        <option value="">Orden por defecto</option>
                        <option value="asc">Ascendente</option>
                        <option value="desc">Descendente</option>
                    </select>
                    <select
                        value={propiedad}
                        onChange={(e) => setPropiedad(e.target.value)}
                        className="p-2 border rounded-md w-fit"
                    >
                        <option value="nombre">Nombre</option>
                        <option value="telefono">Teléfono</option>
                    </select>
                </fieldset>

            </div>

            <div className='flex justify-end items-center gap-4 pb-4'>
                <Insertar />
            </div>


            <div className='grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-10'>
                {conductores.map((conductor) =>
                    <Card key={conductor.id} conductor={conductor}>
                        <Editar conductor={conductor} />
                        <Eliminar conductor={conductor} />
                    </Card>)}
            </div>
        </div >
    )
}
