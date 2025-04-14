function AboutUs() {
    return (
        <section className="bg-[#f6f6f6] text-black flex flex-col items-center w-full overflow-hidden pb-4 lg:pb-8">
            <h1 className="text-xl md:text-2xl xl:text-3xl font-semibold pt-10 pb-8 xl:pb-12 text-center">
                Por que escolher a Mônaco Locação?
            </h1>

            <img
                src="/images/banner_justify.webp"
                alt="Banner da Mônaco Locação"
                className="w-[90%] md:h-[30rem] xl:w-[70%] xl:h-[40rem] h-[18rem] object-cover rounded-sm"
            />

            <section className="flex flex-col md:flex-row justify-center items-center md:gap-4 w-full md:w-[80%] min-h-[10rem] mt-6">
                <article className="flex flex-col items-center md:items-start md:w-[35rem] h-auto md:h-[11rem]">
                    <h2 className="text-base md:text-lg font-semibold pt-6 pb-2 text-center md:text-left">
                        Soluções premium
                    </h2>
                    <p className="text-xs md:text-sm xl:text-sm font-normal px-10 md:px-0 text-center md:text-left leading-relaxed">
                        Opções de locação de veículos de alto padrão para
                        clientes que buscam desempenho e sofisticação.
                    </p>
                </article>

                <article className="flex flex-col items-center md:items-start md:w-[35rem] h-auto md:h-[11rem]">
                    <h2 className="text-base md:text-lg font-semibold pt-6 pb-2 text-center md:text-left">
                        Abrangência nacional
                    </h2>
                    <p className="text-xs md:text-sm xl:text-sm font-normal px-10 md:px-0 text-center md:text-left leading-relaxed">
                        Centros de atendimento distribuídos em todo o país,
                        garantindo suporte completo e acessível.
                    </p>
                </article>

                <article className="flex flex-col items-center md:items-start md:w-[35rem] h-auto md:h-[11rem]">
                    <h2 className="text-base md:text-lg font-semibold pt-6 pb-2 text-center md:text-left">
                        Frota sob medida
                    </h2>
                    <p className="text-xs md:text-sm xl:text-sm font-normal px-10 md:px-0 text-center md:text-left leading-relaxed">
                        Variedade de veículos leves e pesados, adaptados
                        às suas necessidades pessoais e profissionais,
                        garantindo a melhor escolha para cada situação.
                    </p>
                </article>
            </section>

            <div className="flex justify-center pt-6">
                <button
                    className="bg-gradient-to-r from-[#b3b300] to-white border border-[#b3b300] text-black px-5 py-2 rounded font-semibold hover:brightness-105 transition"
                    aria-label="Saiba mais sobre a Mônaco Locação"
                >
                    Saiba mais sobre a Mônaco Locação
                </button>
            </div>
        </section>
    );
}

export default AboutUs;
