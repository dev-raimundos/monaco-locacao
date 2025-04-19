type IconProps = {
  className?: string;
};

function ArrowHeader({ className = "" }: IconProps) {
  return (
    <img src="/images/arrow_header.svg" className={`${className}`} />
  );
}

export default ArrowHeader;
