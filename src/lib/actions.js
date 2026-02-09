'use server'

import prisma from "@/lib/prisma"
import { revalidatePath } from "next/cache"




// ------------------------------ CONDUCTORES ------------------------------

export async function insertarConductor(prevState, formData) {
    const nombre = formData.get('nombre')
    const telefono = formData.get('telefono')


    try {
        await prisma.conductor.create({
            data: {
                nombre,
                telefono
            }
        })
        revalidatePath('/conductores')
        return { success: 'Operación realizada con éxito' }
    } catch (error) {
        console.log(error)
        return { error: error.message.split('\n').pop() }
    }
}



export async function modificarConductor(prevState, formData) {
    const id = Number(formData.get('id'))
    const nombre = formData.get('nombre')
    const telefono = formData.get('telefono')

    try {
        await prisma.conductor.update({
            where: { id },
            data: {
                nombre,
                telefono
            }
        })
        revalidatePath('/conductores')
        return { success: 'Operación realizada con éxito' }
    } catch (error) {
        console.log(error)
        return { error: error.message.split('\n').pop() }
    }
}



export async function eliminarConductor(prevState, formData) {
    const id = Number(formData.get('id'))

    try {
        await prisma.conductor.delete({
            where: { id },
        })
        revalidatePath('/conductores')
        return { success: 'Operación realizada con éxito' }
    } catch (error) {
        console.log(error)
        return { error: error.message.split('\n').pop() }
    }
}




// ------------------------------ VIAJES ------------------------------

export async function insertarViaje(prevState, formData) {
    const fecha_hora = new Date(formData.get('fecha_hora'))
    const origen = formData.get('origen')
    const destino = formData.get('destino')
    const precio_billete = parseFloat(formData.get('precio_billete'))

    const conductorId = formData.get('conductorId') ? Number(formData.get('conductorId')) : null

    const pasajeros = formData
        .getAll('pasajeros[]')
        .map(id => ({ id: Number(id) }))


    try {
        await prisma.viaje.create({
            data: {
                fecha_hora,
                origen,
                destino,
                precio_billete,
                conductorId,
                pasajeros: { connect: pasajeros }
            }
        })
        revalidatePath('/viajes')
        return { success: 'Operación realizada con éxito' }
    } catch (error) {
        console.log(error)
        return { error: error.message.split('\n').pop() }
    }
}



export async function modificarViaje(prevState, formData) {
    const id = Number(formData.get('id'))
    const fecha_hora = new Date(formData.get('fecha_hora'))
    const origen = formData.get('origen')
    const destino = formData.get('destino')
    const precio_billete = parseFloat(formData.get('precio_billete'))

    const conductorId = formData.get('conductorId') ? Number(formData.get('conductorId')) : null

    const pasajeros = formData
        .getAll('pasajeros[]')
        .map(id => ({ id: Number(id) }))


    try {
        await prisma.viaje.update({
            where: { id },
            data: {
                fecha_hora,
                origen,
                destino,
                precio_billete,
                conductorId,
                pasajeros: { set: pasajeros }
            }
        })
        revalidatePath('/viajes')
        return { success: 'Operación realizada con éxito' }
    } catch (error) {
        console.log(error)
        return { error: error.message.split('\n').pop() }
    }
}



export async function eliminarViaje(prevState, formData) {
    const id = Number(formData.get('id'))

    try {
        await prisma.viaje.delete({
            where: { id },
        })
        revalidatePath('/viajes')
        return { success: 'Operación realizada con éxito' }
    } catch (error) {
        console.log(error)
        return { error: error.message.split('\n').pop() }
    }
}




// ------------------------------ PASAJEROS ------------------------------

export async function insertarPasajero(prevState, formData) {
    const nombre = formData.get('nombre')
    const bonobus = formData.get('bonobus') === 'on'


    try {
        await prisma.pasajero.create({
            data: {
                nombre,
                bonobus
            }
        })
        revalidatePath('/pasajeros')
        return { success: 'Operación realizada con éxito' }
    } catch (error) {
        console.log(error)
        return { error: error.message.split('\n').pop() }
    }
}



export async function modificarPasajero(prevState, formData) {
    const id = Number(formData.get('id'))
    const nombre = formData.get('nombre')
    const bonobus = formData.get('bonobus') === 'on'

    try {
        await prisma.pasajero.update({
            where: { id },
            data: {
                nombre,
                bonobus
            }
        })
        revalidatePath('/pasajeros')
        return { success: 'Operación realizada con éxito' }
    } catch (error) {
        console.log(error)
        return { error: error.message.split('\n').pop() }
    }
}



export async function eliminarPasajero(prevState, formData) {
    const id = Number(formData.get('id'))

    try {
        await prisma.pasajero.delete({
            where: { id },
        })
        revalidatePath('/pasajeros')
        return { success: 'Operación realizada con éxito' }
    } catch (error) {
        console.log(error)
        return { error: error.message.split('\n').pop() }
    }
}
