import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col gap-8 p-8">
      <h1 className="text-4xl font-bold text-center">Transporte 2026</h1>
      <div className="flex flex-col gap-4 items-center">
        <Link href="/conductores" className="text-2xl text-blue-600 hover:underline">
          Conductores
        </Link>
        <Link href="/viajes" className="text-2xl text-blue-600 hover:underline">
          Viajes
        </Link>
        <Link href="/pasajeros" className="text-2xl text-blue-600 hover:underline">
          Pasajeros
        </Link>
      </div>
    </main>
  );
}
