import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Image
        src="/headshot.jpg"
        alt="Manas Gandhi"
        width={96}
        height={96}
        priority
        className="mb-6 h-24 w-24 rounded-full object-cover"
      />

      <h1 className="mb-4 text-3xl font-semibold tracking-tight">
        Manas Gandhi
      </h1>

      <div className="space-y-4">
        <p>I&rsquo;m currently building{" "}
          <a href="https://helonic.com" className="underline">Helonic</a>, where we use computer vision to catch issues on construction drawings before they hit the site.</p>
        <p>
          I&rsquo;m a UIUC ECE & CS student. I previously interned at Sandia National
          Laboratories and Target. Also check out <a href="/goatos" className="underline">GoatOS</a>, my favorite project.
        </p>
        <p>
          I sometimes write <Link href="/essays" className="underline">essays</Link>.
        </p>
        <p className="text-[var(--muted)]">
          Reach out at{" "}
          <a href="mailto:manaspgandhi@gmail.com" className="underline">
            manaspgandhi@gmail.com
          </a>
          {" · "}
          <a href="https://github.com/manaspgandhi" className="underline">GitHub</a>
          {" · "}
          <a href="https://linkedin.com/in/manas-gandhi" className="underline">LinkedIn</a>
        </p>
      </div>
    </>
  );
}
