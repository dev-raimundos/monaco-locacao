type IconProps = {
  className?: string;
};

function FacebookLogo({ className = "" }: IconProps) {
  return (
    <img src="/images/facebook.svg" alt="Facebook Logo" className={`social-icon ${className}`} />
  );
}


export default FacebookLogo;
