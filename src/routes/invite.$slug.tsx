import { Suspense } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { fetchInvite } from "@/lib/invites";
import { getTemplate, templates } from "@/templates/registry";
import { MotifStarline } from "@/components/motifs";

export const Route = createFileRoute("/invite/$slug")({
  head: () => ({
    meta: [
      { title: "Tug'ilgan kun taklifnomasi | Digital taklifnoma" },
      {
        name: "description",
        content: "Sizni tug'ilgan kun bayramiga taklif qilamiz — sana, manzil va bayram tartibi.",
      },
      { property: "og:title", content: "Tug'ilgan kun taklifnomasi" },
      {
        property: "og:description",
        content: "Sizni tug'ilgan kun bayramiga taklif qilamiz — sana, manzil va bayram tartibi.",
      },
    ],
  }),
  component: InvitePage,
});

function Curtain({ text }: { text: string }) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-6 text-center">
      <MotifStarline className="h-8 w-40 text-gilt draw-stroke" />
      <p className="mt-6 text-[10px] tracking-editorial text-muted-foreground">{text}</p>
    </div>
  );
}

function InvitePage() {
  const { slug } = Route.useParams();
  const { data, isLoading, isError } = useQuery({
    queryKey: ["invite", slug],
    queryFn: () => fetchInvite(slug),
  });

  if (isLoading) return <Curtain text="Taklifnoma ochilmoqda" />;

  if (isError) return <Curtain text="Taklifnomani yuklab bo'lmadi" />;

  if (!data || !data.is_active) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-background px-6 text-center">
        <h1 className="font-display text-3xl text-foreground">Taklifnoma topilmadi</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          Havola noto'g'ri bo'lishi yoki taklifnoma o'chirilgan bo'lishi mumkin.
        </p>
        <Link to="/" className="mt-6 text-sm text-gilt underline underline-offset-4">
          Bosh sahifa
        </Link>
      </div>
    );
  }

  const template = getTemplate(data.template_id) ?? templates[0]!;
  const TemplateComponent = template.Component;

  return (
    <Suspense fallback={<Curtain text="Taklifnoma ochilmoqda" />}>
      <TemplateComponent invite={data} />
    </Suspense>
  );
}
