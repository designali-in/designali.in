import Image from "next/image";
import AvatarImg03 from "@/public/avatars/avatar-80-03.jpg";
import AvatarImg02 from "@/public/avatars/avatar-80-05.jpg";
import AvatarImg01 from "@/public/avatars/avatar-80-06.jpg";
import AvatarImg04 from "@/public/avatars/avatar-80-07.jpg";

export default function AvatarDemo() {
  return (
    <div className="flex -space-x-[0.9rem]">
      <Image
        className="rounded-full ring-2 ring-background"
        src={AvatarImg01}
        width={48}
        height={48}
        alt="Avatar 01"
      />
      <Image
        className="rounded-full ring-2 ring-background"
        src={AvatarImg02}
        width={48}
        height={48}
        alt="Avatar 02"
      />
      <Image
        className="rounded-full ring-2 ring-background"
        src={AvatarImg03}
        width={48}
        height={48}
        alt="Avatar 03"
      />
      <Image
        className="rounded-full ring-2 ring-background"
        src={AvatarImg04}
        width={48}
        height={48}
        alt="Avatar 04"
      />
    </div>
  );
}
