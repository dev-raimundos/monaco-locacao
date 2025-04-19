type IconProps = {
  className?: string;
};

function InstagramLogo({ className = "" }: IconProps) {
  return (
    <img src="/images/instagram.svg" alt="Logo do instagram" className={`${className}`} />
  );
}

export default InstagramLogo;
