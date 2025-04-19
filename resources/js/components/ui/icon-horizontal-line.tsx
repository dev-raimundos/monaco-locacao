type IconProps = {
  className?: string;
};

function SectionHorizontalLine({ className = "" }: IconProps) {
  return (
    <img src="/images/line-horizontal-section.svg" className={`${className}`} />
  );
}

export default SectionHorizontalLine;
