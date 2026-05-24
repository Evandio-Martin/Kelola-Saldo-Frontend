import { useEffect } from "react";
import PropTypes from "prop-types";
import { useLocation } from "react-router";
import { Languages } from "lucide-react";
import { useLanguage } from "@/shared/hooks";

export const AuthShell = ({
  title,
  description,
  footer,
  children,
}) => {
  const { language, setLanguage } = useLanguage();
  const { pathname } = useLocation();
  const isEnglish = language === "en";

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const copy = isEnglish
    ? {
        workspaceDescription: "A simple money-tracking workspace for fast product review.",
        languageLabel: "Language",
      }
    : {
        workspaceDescription: "Ruang kerja keuangan pribadi berbahasa Indonesia",
        languageLabel: "Bahasa",
      };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(14,165,233,0.16),_transparent_32%),radial-gradient(circle_at_bottom_right,_rgba(56,189,248,0.18),_transparent_30%)] bg-[#eff8ff] text-neutral-950 dark:bg-[#120c19] dark:text-neutral-50">
      <div className="mx-auto flex min-h-screen max-w-6xl items-center px-5 py-8 sm:px-6 lg:px-8">
        <div className="w-full">
          <section className="mx-auto w-full max-w-xl rounded-[28px] border border-white/80 bg-white/92 p-6 shadow-[0_28px_90px_-48px_rgba(14,165,233,0.2)] backdrop-blur dark:border-white/10 dark:bg-[#161021]/92 sm:p-8 lg:p-10">
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between gap-4">
                <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-900 dark:text-neutral-50">
                  KelolaSaldo
                </h2>

                <div className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-sky-50 p-2 text-sm shadow-sm dark:border-sky-400/20 dark:bg-sky-500/10">
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white text-sky-700 shadow-sm dark:bg-white/10 dark:text-sky-100">
                    <Languages size={16} />
                  </span>
                  <span className="text-xs font-semibold tracking-[0.2em] text-sky-700 uppercase dark:text-sky-200">
                    {copy.languageLabel}
                  </span>
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => setLanguage("id")}
                      aria-pressed={language === "id"}
                      className={`rounded-full px-3 py-1.5 text-xs font-semibold transition ${
                        language === "id"
                          ? "bg-sky-600 text-white"
                          : "bg-white text-neutral-700 hover:bg-sky-100 dark:bg-white/10 dark:text-neutral-100 dark:hover:bg-sky-500/15"
                      }`}
                    >
                      ID
                    </button>
                    <button
                      type="button"
                      onClick={() => setLanguage("en")}
                      aria-pressed={language === "en"}
                      className={`rounded-full px-3 py-1.5 text-xs font-semibold transition ${
                        language === "en"
                          ? "bg-sky-600 text-white"
                          : "bg-white text-neutral-700 hover:bg-sky-100 dark:bg-white/10 dark:text-neutral-100 dark:hover:bg-sky-500/15"
                      }`}
                    >
                      EN
                    </button>
                  </div>
                </div>
              </div>

              <p className="text-sm text-neutral-600 dark:text-neutral-300">{copy.workspaceDescription}</p>
            </div>

            <div className="mt-8 space-y-3 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
              <p className="text-sm leading-7 text-neutral-600 dark:text-neutral-300">{description}</p>
            </div>

            <div className="mt-8">{children}</div>

            <div className="mt-6 border-t border-neutral-200 pt-5 text-sm text-neutral-600 dark:border-white/10 dark:text-neutral-300">
              {footer}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

AuthShell.propTypes = {
  eyebrow: PropTypes.string,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  cardNote: PropTypes.node,
  footer: PropTypes.node.isRequired,
  children: PropTypes.node.isRequired,
};