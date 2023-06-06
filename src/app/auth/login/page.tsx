import { SvgGoogle } from "@/assets";
import Image from "next/image";
import Link from "next/link";
import { Formulario } from "@/app/auth/login/form";

export default function LoginPage() {
  return (
    <main className="flex flex-col md:flex-row h-screen items-center">
      <div className="bg-indigo-600 hidden lg:block w-full md:w-1/2 xl:w-2/3 h-screen">
        <Image
          priority={true}
          // placeholder="blur"
          src="https://source.unsplash.com/random"
          alt=""
          width={600}
          height={600}
          className="w-full h-full object-cover"
        />
      </div>

      <div
        className="bg-white w-full md:max-w-md lg:max-w-full md:mx-0 md:w-1/2 xl:w-1/3 h-screen px-6 lg:px-16 xl:px-12
        flex items-center justify-center"
      >
        <div className="w-full h-100">
          <h1 className="text-xl md:text-2xl font-bold leading-tight mt-12">
            Log in to your account
          </h1>

          {/* nsertar el foemulariog  */}

          <Formulario />

          <div className="my-6 border-gray-300 w-full" />

          <button
            type="button"
            className="w-full block bg-white hover:bg-gray-100 focus:bg-gray-100 text-gray-900 font-semibold rounded-lg px-4 py-3 border border-gray-300"
          >
            <div className="flex items-center justify-center">
              {/* insertion logo google  */}
              <SvgGoogle size={2} />
              <span className="ml-4">Log in with Google</span>
            </div>
          </button>

          <div className="mt-8">
            Need an account?{" "}
            <Link
              href="#"
              className="text-blue-500 hover:text-blue-700 font-semibold"
            >
              Create an account
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
