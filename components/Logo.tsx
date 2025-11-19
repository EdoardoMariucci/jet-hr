import Image from "next/image";

export default function Logo() {
  return (
    <div className="w-full flex items-center justify-center">
      <Image
        src="/LogoLightMode.svg"
        alt="Jet HR"
        width={145}
        height={40}
        priority
        className="block dark:hidden h-10 w-auto"
      />
      <Image
        src="/LogoDarkMode.svg"
        alt="Jet HR"
        width={145}
        height={40}
        priority
        className="hidden dark:block h-10 w-auto"
      />
    </div>
  );
}
