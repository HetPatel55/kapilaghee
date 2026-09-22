import Image from "next/image";
import type { Document } from "@prisma/client";
import { ArrowRightIcon } from "@/components/shared/Icons";

const dateFormatter = new Intl.DateTimeFormat("en-IN", { day: "2-digit", month: "long", year: "numeric" });

export function DocumentCard({ document }: { document: Document }) {
  const isImage = document.fileType.startsWith("image/");

  return (
    <a
      href={document.url}
      target="_blank"
      rel="noreferrer noopener"
      className="group flex flex-col overflow-hidden rounded-3xl border border-border bg-white transition-shadow duration-300 hover:shadow-[0_24px_50px_-30px_rgba(60,30,10,0.45)]"
    >
      {isImage ? (
        <div className="aspect-[4/3] overflow-hidden border-b border-border bg-sand p-5">
          <Image
            src={document.url}
            alt={`${document.label} — document preview`}
            width={800}
            height={600}
            sizes="(min-width: 640px) 45vw, 92vw"
            className="h-full w-full rounded-lg object-cover object-top shadow-sm transition-transform duration-500 group-hover:scale-[1.02]"
          />
        </div>
      ) : null}
      <div className="flex flex-1 flex-col p-6">
        <p className="font-heading text-xl text-maroon">{document.label}</p>
        {document.issuedBy ? <p className="mt-1.5 text-sm text-muted">Issued by {document.issuedBy}</p> : null}
        {document.issuedDate ? (
          <p className="mt-0.5 text-sm text-muted">{dateFormatter.format(document.issuedDate)}</p>
        ) : null}
        <span className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-maroon">
          View full document
          <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </a>
  );
}
