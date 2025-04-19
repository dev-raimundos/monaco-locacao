type IconProps = {
  className?: string;
};

function LeftArrow({ className = "" }: IconProps) {
  return (
    <img src="/images/left-arrow.svg" className={`${className}`} />
  );
}

export default LeftArrow;
