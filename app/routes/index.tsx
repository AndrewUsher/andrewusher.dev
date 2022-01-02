import * as React from "react";
import { Link } from "remix";

function Paragraph({ children }: { children: React.ReactNode }) {
  return <p>{children}</p>;
}

function ExternalLink({ href, children }: { children: string; href: string }) {
  return (
    <a className="underline" href={href}>
      {children}
    </a>
  );
}

function IntroLinkButton({ children, to }: { children: string; to: string }) {
  return (
    <Link
      className="bg-sky-400 hover:bg-sky-600 hover:text-white mr-8 px-4 py-4 text-lg ease-in-out w-full md:w-auto md:inline-block block text-center mb-8"
      to={to}
    >
      {children}
    </Link>
  );
}

export default function Index() {
  return (
    <>
      <div className="max-w-screen-xl mx-auto py-4 px-4">
        <div className="prose lg:prose-xl">
          <Paragraph>
            Howdy! During the day, I am a systems engineer at{" "}
            <ExternalLink href="https://www.autozone.com/">
              AutoZone
            </ExternalLink>
            , primarily leading a small team of React developers on the B2C web
            application.
          </Paragraph>
          <Paragraph>
            During my free time, I like dabbling around with new front end
            technologies by creating my own projects. When I&apos;m not coding,
            I like to play basketball and ride my bike throughout downtown
            Memphis.
          </Paragraph>
          <Paragraph>
            <Link to="/about">Read more about me here.</Link>
          </Paragraph>
        </div>
        <div className="my-12">
          <IntroLinkButton to="/blog">Go To Blog</IntroLinkButton>
          <IntroLinkButton to="/contact">Get In Touch</IntroLinkButton>
        </div>
      </div>
    </>
  );
}
