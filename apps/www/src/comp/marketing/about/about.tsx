"use client";

import Link from "next/link";
import CountUpNumber from "@/comp/common/countnumber";
import { Icons } from "@/comp/icons";
import { ToolIcons } from "@/comp/tool-icons";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const skills = [
  { skill: "Graphic Design" },
  { skill: "3D Modeling" },
  { skill: "Logo & Units" },
  { skill: "Storyboard" },
  { skill: "Packaging" },
  { skill: "Video Editing" },
  { skill: "Photography" },
  { skill: "Motion Graphic" },
  { skill: "UI-UX" },
  { skill: "Website Develop" },
  { skill: "Mockups" },
  { skill: "Animations" },
  { skill: "eBooks" },
  { skill: "Brochures" },
  { skill: "Website Design" },
  { skill: "Landing pages" },
  { skill: "Socila Media Posts" },
  { skill: "Branding" },
  { skill: "Invitation" },
  { skill: "Emailers" },
  { skill: "Ads" },
  { skill: "Campaigns" },
  { skill: "Brand Guidelines" },
];

const Underline = `hover:-translate-y-1 border border-slate-100 dark:border-slate-900 rounded-xl p-2.5 transition-transform text-slate-600 hover:border-slate-200 dark:hover:border-slate-800 hover:text-black hover:dark:text-white dark:text-slate-400 `;

const About = () => {
  return (
    <section id="about">
      <div className="relative h-full w-full border border-slate-200 py-8 dark:border-slate-800">
        <div className="bg-ali absolute -left-1.5 -top-1.5 h-3 w-3 text-white" />
        <div className="bg-ali absolute -bottom-1.5 -left-1.5 h-3 w-3 text-white" />
        <div className="bg-ali absolute -right-1.5 -top-1.5 h-3 w-3 text-white" />
        <div className="bg-ali absolute -bottom-1.5 -right-1.5 h-3 w-3 text-white" />
        <div className="absolute -bottom-1.5 left-1/2 h-2.5 w-2.5 border border-slate-200 bg-black text-white dark:border-slate-800 dark:bg-white" />
        <div className="absolute -top-1.5 left-1/2 h-2.5 w-2.5 border border-slate-200 bg-black text-white dark:border-slate-800 dark:bg-white" />

        <div className="animation-delay-8 my-1">
          <div className="flex flex-col items-center">
            <h3 className="mt-6 inline-flex items-baseline bg-gradient-to-r from-slate-600 via-slate-400 to-slate-600 bg-clip-text pb-1 text-center font-bold text-transparent dark:bg-gradient-to-r dark:from-slate-600 dark:via-slate-200 dark:to-slate-600 dark:bg-clip-text">
              <span className="text-2xl md:text-4xl">Greetings!</span>
            </h3>
            <hr className="bg-ali mx-auto my-4 h-1 w-6 rounded border-0"></hr>
          </div>

          <div className="items-center justify-center text-center align-top leading-8 md:flex-row">
            <div className="mx-auto mb-8 max-w-5xl px-8">
              <p className="text-md">
                Hi, my name is
                <span className="text-ali font-bold">{" Ali Imam "}</span>
                and I am a highly ambitious, self-motivated and driven
                <br />
                <span className="font-bold">
                  {" Graphic Designer | Visualiser | Art Director | Developer "}
                </span>
                based in Bokaro Steel City, India.
              </p>
              <br />

              <p className="grid gap-4 text-sm text-slate-600 dark:text-slate-400">
                <span>
                  I am a visionary graphic designer on a mission to transform
                  concepts into captivating visual stories. With a passion for
                  design that goes beyond pixels, I immerse myself in the realm
                  of creativity, bringing digital products and experiences to
                  life.
                </span>
                <span>
                  As a design enthusiast, my journey is marked by a relentless
                  pursuit of perfection, particularly in the intricate world of
                  pixel-perfect UI and the dynamic realm of graphic design. My
                  dedication to merging form with function is evident in every
                  project I undertake.
                </span>
              </p>
              <p className="mt-6 text-sm text-slate-600 dark:text-slate-400">
                Designali is actually an agency of one. This means you'll work
                directly with me, founder of Designali.
              </p>
            </div>

            <div className="relative my-8">
              <Icons.plus
                strokeWidth={1}
                className="text-ali absolute -left-3 -top-3 h-6 w-6"
              />
              <Icons.plus
                strokeWidth={1}
                className="text-ali absolute -right-3 -top-3 h-6 w-6"
              />
              <Separator />
            </div>

            <div className="flex flex-wrap items-center justify-center gap-2">
              <Link
                href="/Ali-CV.pdf"
                download={true}
                target="_blank"
                className={cn(
                  buttonVariants({
                    variant: "default",
                    size: "lg",
                  }),
                )}
              >
                <span className="flex gap-2 px-1">
                  <Icons.download size={14} />
                  Download CV
                </span>
              </Link>
              <Link
                href="https://wa.me/917678432186"
                target="_blank"
                className={cn(
                  buttonVariants({
                    variant: "default",
                    size: "lg",
                  }),
                )}
              >
                <span className="flex gap-2 px-1">
                  <Icons.whatsapp className="w-3" />
                  Join Whatsapp
                </span>
              </Link>
            </div>
            <h1 className="mb-4 mt-10 text-center text-sm font-semibold uppercase tracking-[.3em] text-slate-400">
              Tools
            </h1>
            <div className="flex flex-wrap items-center justify-center gap-6 gap-y-4 px-2">
              <Link
                href="https://www.adobe.com/in/products/photoshop.html"
                rel="noreferrer"
                target="_blank"
                className={Underline}
              >
                <ToolIcons.photoshop strokeWidth={1.5} className="h-5 w-5" />
              </Link>
              <Link
                href="https://www.adobe.com/in/products/illustrator.html"
                rel="noreferrer"
                target="_blank"
                className={Underline}
              >
                <ToolIcons.illustrator strokeWidth={1.5} className="h-5 w-5" />
              </Link>
              <Link
                href="https://www.adobe.com/in/products/aftereffects.html"
                rel="noreferrer"
                target="_blank"
                className={Underline}
              >
                <ToolIcons.aftereffects className="h-5 w-5" />
              </Link>
              <Link
                href="https://www.adobe.com/in/products/premiere.html"
                rel="noreferrer"
                target="_blank"
                className={Underline}
              >
                <ToolIcons.premierepro strokeWidth={1.5} className="h-5 w-5" />
              </Link>
              <Link
                href="https://www.maxon.net/en/cinema-4d"
                rel="noreferrer"
                target="_blank"
                className={Underline}
              >
                <ToolIcons.cinema4d className="h-5 w-5" />
              </Link>
              <Link
                href="https://www.autodesk.in/products/maya/"
                rel="noreferrer"
                target="_blank"
                className={Underline}
              >
                <ToolIcons.maya className="h-5 w-5" />
              </Link>
              <Link
                href="https://code.visualstudio.com/"
                rel="noreferrer"
                target="_blank"
                className={Underline}
              >
                <ToolIcons.visualstudio className="h-5 w-5" />
              </Link>

              <Link
                href="https://www.typescriptlang.org/"
                rel="noreferrer"
                target="_blank"
                className={Underline}
              >
                <ToolIcons.typescript className="h-5 w-5" />
              </Link>
              <Link
                href="https://react.dev/"
                rel="noreferrer"
                target="_blank"
                className={Underline}
              >
                <ToolIcons.react className="h-5 w-5" />
              </Link>
            </div>

            <div className="px-4 pt-10">
              <div className="flex flex-wrap justify-center">
                {skills.map((item, idx) => {
                  return (
                    <p
                      key={idx}
                      className="m-1 rounded border border-slate-200 px-2 py-1 text-xs text-slate-600 dark:border-slate-800 dark:text-slate-400"
                    >
                      {item.skill}
                    </p>
                  );
                })}
              </div>
            </div>

            <div className="relative my-8">
              <Icons.plus
                strokeWidth={1}
                className="text-ali absolute -left-3 -top-3 h-6 w-6"
              />
              <Icons.plus
                strokeWidth={1}
                className="text-ali absolute -right-3 -top-3 h-6 w-6"
              />
              <Separator />
            </div>
            <div className="mt-10">
              <div className="mx-auto max-w-7xl">
                <dl className="grid grid-cols-1 gap-y-10 text-center lg:grid-cols-3">
                  <div className="mx-auto flex max-w-xs flex-col gap-y-2">
                    <dt className="ml-6 text-sm font-semibold uppercase tracking-[.3em] text-slate-400">
                      <p className="">Projects</p>
                    </dt>
                    <dd className="text-ali order-first flex text-6xl font-extrabold tracking-tight">
                      <p className="">+</p>
                      <CountUpNumber value={1000} />
                    </dd>
                  </div>
                  <div className="mx-auto flex max-w-xs flex-col gap-y-2">
                    <dt className="ml-6 text-sm font-semibold uppercase tracking-[.3em] text-slate-400">
                      <p className="">Design Creatives</p>
                    </dt>
                    <dd className="text-ali order-first flex text-6xl font-extrabold tracking-tight">
                      <p className="">+</p>
                      <CountUpNumber value={10000} />
                    </dd>
                  </div>
                  <div className="mx-auto flex max-w-xs flex-col gap-y-2">
                    <dt className="ml-6 text-sm font-semibold uppercase tracking-[.3em] text-slate-400">
                      <p className="">Brands</p>
                    </dt>
                    <dd className="text-ali order-first flex text-6xl font-extrabold tracking-tight">
                      <p className="">+</p>
                      <CountUpNumber value={100} />
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
