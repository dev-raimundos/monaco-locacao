function SectionOne() {
    return (
        <article className="bg-white text-black py-8 w-full flex justify-center">
            <ul className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-2 lg:gap-4 w-full max-w-6xl px-4">
                <li className="flex-1 text-center font-bold text-base md:text-sm lg:text-base px-2 max-w-xs">
                    <h1>OPÇÃO DE ADQUIRIR<br />AO TÉRMINO</h1>
                </li>

                <div className="block md:hidden w-[27%] h-[0.1rem] bg-black/40" />
                <div className="hidden md:flex w-[0.2rem] h-12 bg-black/60" />

                <li className="flex-1 text-center font-bold text-base md:text-sm lg:text-base px-2 max-w-xs">
                    <h1>NÃO COMPROMETE<br /> O CADASTRO DO BACEN</h1>
                </li>

                <div className="block md:hidden w-[27%] h-[0.1rem] bg-black/40" />
                <div className="hidden md:flex w-[0.2rem] h-12 bg-black/60" />

                <li className="flex-1 text-center font-bold text-base md:text-sm lg:text-base px-2 max-w-xs">
                    <h1>MENSALIDADES FIXAS</h1>
                </li>

                <div className="block md:hidden w-[27%] h-[0.1rem] bg-black/40" />
                <div className="hidden md:flex w-[0.2rem] h-12 bg-black/60" />

                <li className="flex-1 text-center font-bold text-base md:text-sm lg:text-base px-2 max-w-xs">
                    <h1>SUPORTE<br />ESPECIALIZADO</h1>
                </li>
            </ul>
        </article>
    );
}

export default SectionOne;
