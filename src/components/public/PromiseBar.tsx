import { Container } from "@/components/shared/Container";
import { ChurnIcon, CowIcon, DropIcon, FlaskIcon } from "@/components/shared/Icons";

const PROMISES = [
  { icon: DropIcon, title: "Nothing added", body: "No additives, colours or preservatives." },
  { icon: ChurnIcon, title: "Bilona churned", body: "Hand-churned from curd, not boiled from cream." },
  { icon: CowIcon, title: "A2 Gir cow milk", body: "From the milk of indigenous Gir cows." },
  { icon: FlaskIcon, title: "Lab tested", body: "Independently tested against FSSAI limits." },
];

export function PromiseBar() {
  return (
    <section aria-label="Our promise" className="border-y border-border bg-sand">
      <Container>
        <ul className="grid grid-cols-2 gap-x-6 gap-y-8 py-10 lg:grid-cols-4 lg:divide-x lg:divide-border lg:py-9">
          {PROMISES.map(({ icon: Icon, title, body }) => (
            <li key={title} className="flex flex-col gap-3 sm:flex-row sm:items-start sm:gap-4 lg:px-7 lg:first:pl-0 lg:last:pr-0">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-cream text-maroon ring-1 ring-border">
                <Icon className="h-[22px] w-[22px]" />
              </span>
              <span>
                <span className="block font-heading text-lg leading-tight text-maroon">{title}</span>
                <span className="mt-1 block text-sm leading-snug text-muted">{body}</span>
              </span>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
