type IconProps = {
  className?: string;
};

function SectionVerticalLine({ className = "" }: IconProps) {
  return (
    <img src="/images/line-vertical-section.svg" className={`${className}`} />
  );
}

export default SectionVerticalLine;
