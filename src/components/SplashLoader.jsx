import Image from "next/image";

export default function SplashLoader() {
  return (
    <div className="splash-screen">
      <div className="splash-content">
        <div className="splash-logo">
          <Image
            src="/emblem.webp"
            alt="MIU Logo"
            width={150}
            height={150}
            priority
          />
        </div>

        <div className="splash-miu-blocks">
          <span>M</span>
          <span>I</span>
          <span>U</span>
        </div>
      </div>
    </div>
  );
}

// School Of Commerce And Management
