'use client'
import Link from 'next/link'
import { use, useState } from 'react'
import Modal from '@/components/modal'
import Form from '@/components/viajes/form'
import { eliminarViaje, insertarViaje, modificarViaje } from '@/lib/actions'
import { IconoInsertar, IconoModificar, IconoEliminar } from '@/components/icons'




export default function Lista({ promesaViajes, promesaConductoresIdNombre, promesaPasajerosIdNombre }) {

    const viajes = use(promesaViajes)
    const conductoresIdNombre = use(promesaConductoresIdNombre)
    const pasajerosIdNombre = use(promesaPasajerosIdNombre)

    const Insertar = () =>
        <Modal openElement={<IconoInsertar />}>
            <h2 className='text-2xl font-bold'>INSERTAR VIAJE</h2>
            <Form
                action={insertarViaje}
                textSubmit='Insertar'
                conductoresIdNombre={conductoresIdNombre}
                pasajerosIdNombre={pasajerosIdNombre}
            />
        </Modal>


    const Editar = ({ viaje }) =>
        <Modal openElement={<IconoModificar />}>
            <h2 className='text-2xl font-bold'>ACTUALIZAR VIAJE</h2>
            <Form
                action={modificarViaje}
                textSubmit='Actualizar'
                conductoresIdNombre={conductoresIdNombre}
                pasajerosIdNombre={pasajerosIdNombre}
                viaje={viaje}
            />
        </Modal>


    const Eliminar = ({ viaje }) =>
        <Modal openElement={<IconoEliminar />}>
            <h2 className='text-2xl font-bold'>ELIMINAR VIAJE</h2>
            <Form
                action={eliminarViaje}
                textSubmit='Eliminar'
                conductoresIdNombre={conductoresIdNombre}
                pasajerosIdNombre={pasajerosIdNombre}
                viaje={viaje}
                disabled
            />
        </Modal>


    const Card = ({ viaje, children }) =>
        <div className='p-4 rounded-lg bg-blue-200'>
            <Link href={`/viajes/${viaje.id}`} >
                <p>Fecha: {viaje.fecha_hora.toLocaleString()} </p>
                <p>Origen: {viaje.origen}</p>
                <p>Destino: {viaje.destino}</p>
                <p>Precio: {viaje.precio_billete}€</p>
                <p>Conductor: {viaje.conductor ? viaje.conductor.nombre : 'Sin asignar'}</p>
            </Link>
            <div className='flex gap-2 justify-end'>
                {children}
            </div>
        </div>


    return (
        <div className="flex flex-col gap-4">

            <div className='flex justify-end items-center gap-4 pb-4'>
                <Insertar />
            </div>

            <div className='grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-10'>
                {viajes.map((viaje) =>
                    <Card key={viaje.id} viaje={viaje}>
                        <Editar viaje={viaje} />
                        <Eliminar viaje={viaje} />
                    </Card>
                )}
            </div>
        </div>
    )
}
