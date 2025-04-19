import { useForm } from "@inertiajs/react";
import { useState } from "react";

const ContactForm = () => {
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const { data, setData, post, processing, errors, reset } = useForm({
    nome: "",
    email: "",
    telefone: "",
    interesse: "",
    empresa: "",
    site: "",
    contatoPreferido: "email",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Garante que o site começa com https://
    if (data.site && !data.site.startsWith("http")) {
      setData("site", `https://${data.site}`);
    }

    post(route("contact.store"), {
      onSuccess: () => {
        reset();
        setSuccessMessage("Formulário enviado com sucesso!");
        setTimeout(() => {
          const el = document.querySelector(".form-subtitle");
          if (el) el.scrollIntoView({ behavior: "smooth" });
        }, 100);
        setTimeout(() => setSuccessMessage(null), 10000);
      },
      preserveScroll: true,
    });
  };
  const handleSiteFocus = () => {
    if (data.site.trim() !== "" && !data.site.startsWith("http")) {
      setData("site", `https://${data.site}`);
    }
  };

  return (
    <div className="relative w-full min-h-screen flex justify-center items-center px-4 py-10 overflow-y-auto">
      <img
        className="absolute inset-0 w-full h-full object-cover z-0"
        src="images/form_background.webp"
        alt="Background"
      />
      <div className="absolute inset-0 bg-black/70 z-10" />
      <div className="relative z-20 text-white text-center lg:text-left w-full max-w-screen-md">
        <h2 className="text-2xl text-[#c4ce34] pb-2">Como podemos lhe atender?</h2>
        <p className="form-subtitle text-sm text-gray-300 mb-5">Deixe seus dados que iremos entrar em contato</p>

        {successMessage && (
          <p className="bg-green-100 text-green-800 p-3 mb-5 rounded animate-fade-in">
            {successMessage}
          </p>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 items-center lg:items-start w-full pb-24">
          {[
            { name: "nome", type: "text", placeholder: "Nome" },
            { name: "email", type: "email", placeholder: "Email" },
            { name: "telefone", type: "tel", placeholder: "Número de telefone" },
            { name: "interesse", type: "text", placeholder: "Seu interesse" },
            { name: "empresa", type: "text", placeholder: "Nome da empresa" },
            { name: "site", type: "text", placeholder: "Site (ex: www.seusite.com)" },
          ].map(({ name, type, placeholder }) => (
            <div key={name} className="w-full max-w-md">
              <input
                className="w-full bg-transparent text-white border-b-2 border-gray-600 focus:border-yellow-400 p-2 outline-none"
                type={type}
                name={name}
                value={data[name as keyof typeof data]}
                onChange={(e) => setData(name as keyof typeof data, e.target.value)}
                placeholder={placeholder}
                onFocus={name === "site" ? handleSiteFocus : undefined}
              />
              {errors[name as keyof typeof data] && (
                <p className="text-red-400 text-sm">{errors[name as keyof typeof data]}</p>
              )}
            </div>
          ))}

          <div className="w-full max-w-md">
            <h1 className="text-sm text-gray-300 mt-4">Você prefere ligação ou email?</h1>
            <select
              name="contatoPreferido"
              value={data.contatoPreferido}
              onChange={(e) => setData("contatoPreferido", e.target.value)}
              className="w-full bg-transparent text-white border-b-2 border-gray-600 focus:border-yellow-400 p-2 outline-none"
            >
              <option value="email" className="bg-gray-800">Email</option>
              <option value="telefone" className="bg-gray-800">Telefone</option>
            </select>
          </div>

          <div className="w-full max-w-md">
            <button
              type="submit"
              className={`mt-4 w-full text-white text-lg py-2 rounded-full outline-1 outline-orange-500 transition duration-300
                                ${processing
                  ? "bg-gray-500 cursor-not-allowed"
                  : "bg-gradient-to-r from-orange-500 to-transparent hover:from-yellow-400 hover:to-yellow-600"
                }`}
              disabled={processing}
            >
              {processing ? (
                <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin inline-block" />
              ) : (
                "Receba uma proposta \u27F6"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;
