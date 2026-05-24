import { Link } from "react-router";
import { LoginForm } from "@/features/auth";
import { isMockAuthEnabled, mockAuthPreview } from "@/entities/auth";
import { useLanguage } from "@/shared/hooks";
import { Seo } from "@/shared/ui/Seo";
import { AuthShell } from "./AuthShell";

export const LoginWidget = () => {
  const { language } = useLanguage();
  const isEnglish = language === "en";
  const copy = isEnglish
    ? {
        seoTitle: "Sign In",
        seoDescription:
          "Sign in to KelolaSaldo to review balances, transactions, budgets, and monthly reports.",
        eyebrow: "Sign in",
        title: "Sign in to your account",
        description:
          "Sign in to review balances, transactions, budgets, and monthly cash flow from one simple dashboard.",
        demoPrefix: "or use demo account",
        footerLead: "Don’t have an account?",
        footerLink: "Create one",
      }
    : {
        seoTitle: "Masuk",
        seoDescription:
          "Masuk ke KelolaSaldo untuk melihat saldo, transaksi, anggaran, dan laporan bulanan Anda.",
        eyebrow: "Masuk",
        title: "Masuk ke akun Anda",
        description:
          "Masuk untuk melihat ringkasan saldo, transaksi, anggaran, dan arus kas bulanan dalam satu dashboard sederhana.",
        demoPrefix: "atau gunakan akun demo",
        footerLead: "Belum punya akun?",
        footerLink: "Daftar sekarang",
      };

  return (
    <>
      <Seo
        title={copy.seoTitle}
        description={copy.seoDescription}
        canonical="/login"
        noIndex
      />
      <AuthShell
        title={copy.title}
        description={copy.description}
        footer={
          <p>
            {copy.footerLead}{" "}
            <Link to="/register" className="font-semibold text-sky-700 dark:text-sky-300">
              {copy.footerLink}
            </Link>
            {" "}{copy.demoPrefix} <strong>{mockAuthPreview.username}</strong> /{" "}
            <strong>{mockAuthPreview.password}</strong>
          </p>
        }
      >
        <LoginForm />
      </AuthShell>
    </>
  );
};
