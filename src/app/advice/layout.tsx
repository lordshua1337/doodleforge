import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Questionable Parenting Advice | Doodie",
  description:
    "9 real parenting scenarios. 11 age ranges. 99 pieces of advice from an art app with zero qualifications. Personalized for your kid.",
  openGraph: {
    title: "Questionable Parenting Advice | Doodie",
    description:
      "9 real parenting scenarios. 99 pieces of advice from an art app with zero qualifications.",
    type: "website",
  },
};

export default function AdviceLayout({ children }: { readonly children: React.ReactNode }) {
  return children;
}
