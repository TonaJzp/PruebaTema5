'use client'
import { useActionState, useEffect, useId } from "react"
import { toast } from "sonner"



export default function Form({ action, viaje, conductoresIdNombre, pasajerosIdNombre, disabled = false, textSubmit = "Enviar" }) {
    const formId = useId()
    const [state, faction, isPending] = useActionState(action, {})

    useEffect(() => {
        if (state.success) {
            toast.success(state.success)
            document.getElementById(formId).closest('dialog').close()
        }
        if (state.error) {
            toast.error(state.error)
        }
    }, [state])

    return (
        <form id={formId} action={faction} className="flex flex-col gap-2 border p-4 border-blue-400" >
            <input type="hidden" name="id" value={viaje?.id} />
            <input
                type="datetime-local"
                name="fecha_hora"
                placeholder="Fecha y hora"
                defaultValue={viaje?.fecha_hora?.toISOString().slice(0, 16) || ''}
                disabled={disabled}
            />
            <input
                type="text"
                name="origen"
                placeholder="Origen"
                defaultValue={viaje?.origen}
                disabled={disabled}
            />
            <input
                type="text"
                name="destino"
                placeholder="Destino"
                defaultValue={viaje?.destino}
                disabled={disabled}
            />
            <input
                type="number"
                step="0.01"
                name="precio_billete"
                placeholder="Precio del billete"
                defaultValue={viaje?.precio_billete}
                disabled={disabled}
            />


            {disabled
                ? <p>Conductor: {viaje?.conductor?.nombre}</p>
                : <details>
                    <summary>Conductor ({viaje?.conductor?.nombre})</summary>
                    <select className="w-full p-2 border border-blue-400 rounded-md"
                        name="conductorId"
                        key={viaje?.conductorId}
                        defaultValue={viaje?.conductorId}
                        size={4}
                        disabled={disabled}
                    >
                        <option value="">Seleccionar conductor</option>
                        {conductoresIdNombre.map((conductor) => (
                            <option value={conductor.id} key={conductor.id}>
                                {conductor.nombre}
                            </option>
                        ))}
                    </select>
                </details>
            }


            {disabled
                ? <p>Pasajeros: {viaje?.pasajeros?.map(p => p.nombre).join(', ')}</p>
                : <details>
                    <summary>Pasajeros ({viaje?.pasajeros?.map(p => p.nombre).join(', ')})</summary>

                    {pasajerosIdNombre?.map((pasajero) => (
                        <label key={pasajero.id} className='block'>
                            <input
                                type='checkbox'
                                name="pasajeros[]"
                                value={pasajero.id}
                                defaultChecked={viaje?.pasajeros?.some(p => p.id == pasajero.id)}
                            />

                            {pasajero.nombre}
                        </label>
                    ))}
                </details>
            }


            <button
                type="submit"
                className="bg-blue-500 text-white p-2 rounded-md hover:cursor-pointer disabled:bg-blue-300 disabled:cursor-not-allowed"
                disabled={isPending}
            >
                {isPending
                    ? <p className="animate-ping">Procesando...</p>
                    : textSubmit
                }
            </button>
        </form >
    )
}
