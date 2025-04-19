type IconProps = {
  className?: string;
};

function RightArrow({ className = "" }: IconProps) {
  return (
    <img src="/images/right-arrow.svg" className={`${className}`} />
  );
}

export default RightArrow;
