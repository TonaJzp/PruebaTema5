'use client'
import Link from 'next/link'
import { use, useState } from 'react'
import Modal from '@/components/modal'
import Form from '@/components/pasajeros/form'
import { eliminarPasajero, insertarPasajero, modificarPasajero } from '@/lib/actions'
import { IconoInsertar, IconoModificar, IconoEliminar } from '@/components/icons'


export default function Lista({ promesaPasajeros }) {

    const dataPasajeros = use(promesaPasajeros)
    const [propiedad, setPropiedad] = useState('nombre')
    const [orden, setOrden] = useState('')
    const [buscar, setBuscar] = useState('')

    let pasajeros = dataPasajeros
    if (orden === 'asc') pasajeros = dataPasajeros.toSorted((a, b) => a[propiedad].localeCompare(b[propiedad]))
    if (orden === 'desc') pasajeros = dataPasajeros.toSorted((a, b) => b[propiedad].localeCompare(a[propiedad]))

    if (buscar) pasajeros = pasajeros.filter((pasajero) =>
        pasajero.nombre.toLowerCase().includes(buscar.toLowerCase())
    )


    const Insertar = () =>
        <Modal openElement={<IconoInsertar />}>
            <h2 className='text-2xl font-bold'>INSERTAR PASAJERO</h2>
            <Form
                action={insertarPasajero}
                textSubmit='Insertar'
            />
        </Modal>


    const Editar = ({ pasajero }) =>
        <Modal openElement={<IconoModificar />}>
            <h2 className='text-2xl font-bold'>ACTUALIZAR PASAJERO</h2>
            <Form
                action={modificarPasajero}
                textSubmit='Actualizar'
                pasajero={pasajero}
            />
        </Modal>


    const Eliminar = ({ pasajero }) =>
        <Modal openElement={<IconoEliminar />}>
            <h2 className='text-2xl font-bold'>ELIMINAR PASAJERO</h2>
            <Form
                action={eliminarPasajero}
                textSubmit='Eliminar'
                pasajero={pasajero}
                disabled
            />
        </Modal>


    const Card = ({ pasajero, children }) =>
        <div className='p-4 rounded-lg bg-blue-200'>
            <Link href={`/pasajeros/${pasajero.id}`} >
                <p>Nombre: {pasajero.nombre} </p>
                <p>Bonobús: {pasajero.bonobus ? 'Sí' : 'No'}</p>
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
                    </select>
                </fieldset>

            </div>

            <div className='flex justify-end items-center gap-4 pb-4'>
                <Insertar />
            </div>


            <div className='grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-10'>
                {pasajeros.map((pasajero) =>
                    <Card key={pasajero.id} pasajero={pasajero}>
                        <Editar pasajero={pasajero} />
                        <Eliminar pasajero={pasajero} />
                    </Card>)}
            </div>
        </div >
    )
}
