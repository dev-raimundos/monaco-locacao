function SectionOne() {
    return (
        <article className="bg-white text-black py-17 pb-10 w-full flex justify-center">
            <ul className="flex flex-col md:flex-row items-center justify-center gap-5 md:gap-2 lg:gap-6 w-full max-w-6xl px-4">
                <li className="flex-1 text-center font-black text-base md:text-sm lg:text-base px-2 max-w-xs">
                    <h1>OPÇÃO DE ADQUIRIR<br />AO TÉRMINO</h1>
                </li>

                <div className="block md:hidden w-[45%] h-[1px] bg-black" />
                <div className="hidden md:flex w-[2px] h-12 bg-black/70" />

                <li className="flex-1 text-center font-black text-base md:text-sm lg:text-base px-2 max-w-xs">
                    <h1>NÃO COMPROMETE<br /> O CADASTRO DO BACEN</h1>
                </li>

                <div className="block md:hidden w-[45%] h-[1px] bg-black" />
                <div className="hidden md:flex w-[2px] h-12 bg-black/70" />

                <li className="flex-1 text-center font-black text-base md:text-sm lg:text-base px-2 max-w-xs">
                    <h1>MENSALIDADES FIXAS</h1>
                </li>

                <div className="block md:hidden w-[45%] h-[1px] bg-black" />
                <div className="hidden md:flex w-[2px] h-12 bg-black/70" />

                <li className="flex-1 text-center font-black text-base md:text-sm lg:text-base px-2 max-w-xs">
                    <h1>SUPORTE<br />ESPECIALIZADO</h1>
                </li>
            </ul>
        </article>
    );
}

export default SectionOne;
