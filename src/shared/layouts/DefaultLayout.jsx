import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { NavLink, useLocation, useNavigate } from "react-router";
import {
  Sun,
  Moon,
  Menu,
  Languages,
  LogOut,
  Home,
  PiggyBank,
  BarChart3,
  ReceiptText,
} from "lucide-react";
import { useAuthStore } from "@/entities/auth";
import { useLanguage, useTheme } from "@/shared/hooks";

export const DefaultLayout = ({ children }) => {
  const { user, logout } = useAuthStore();
  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage } = useLanguage();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const isDark = theme === "dark";
  const isEnglish = language === "en";

  const copy = isEnglish
    ? {
        appLabel: "Finance App",
        appDescription: "Daily balance tracking in one dashboard.",
        navigationItems: [
          { to: "/", label: "Overview", icon: Home, end: true },
          { to: "/transactions", label: "Transactions", icon: ReceiptText },
          { to: "/budgets", label: "Budgets", icon: PiggyBank },
          { to: "/reports", label: "Reports", icon: BarChart3 },
        ],
        languageLabel: "Language",
        lightMode: "Light mode",
        darkMode: "Dark mode",
        themeTitle: "Switch theme",
        logout: "Logout",
      }
    : {
        appLabel: "Aplikasi Keuangan",
        appDescription: "Catatan saldo harian dalam satu dashboard.",
        navigationItems: [
          { to: "/", label: "Ringkasan", icon: Home, end: true },
          { to: "/transactions", label: "Transaksi", icon: ReceiptText },
          { to: "/budgets", label: "Anggaran", icon: PiggyBank },
          { to: "/reports", label: "Laporan", icon: BarChart3 },
        ],
        languageLabel: "Bahasa",
        lightMode: "Mode terang",
        darkMode: "Mode gelap",
        themeTitle: "Ganti tema",
        logout: "Keluar",
      };

  const roleLabel =
    user?.role === "USER" && !isEnglish ? "Pengguna" : user?.role || "";

  return (
    <div
      className={`overflow-x-clip bg-[#eff8ff] text-neutral-900 dark:bg-[#130d1d] dark:text-neutral-100 lg:flex lg:flex-row-reverse lg:min-h-screen`}
    >
      <main className="relative z-0 min-w-0 flex-1 overflow-x-hidden bg-[#eff8ff] p-4 dark:bg-[#130d1d]">
        <div className="mb-4 flex items-center justify-between gap-3 lg:hidden">
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(true)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-neutral-200 bg-white text-neutral-700 shadow-sm transition hover:bg-sky-50 dark:border-neutral-700 dark:bg-neutral-950 dark:text-neutral-100 dark:hover:bg-sky-500/10"
            aria-label="Open navigation"
          >
            <Menu size={20} />
          </button>
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-sky-600">
              {copy.appLabel}
            </p>
            <p className="text-xs text-neutral-500 dark:text-neutral-400">
              {copy.appDescription}
            </p>
          </div>
        </div>

        {children}
      </main>

      <div
        className={`fixed inset-0 z-20 bg-black/20 backdrop-blur-sm transition-opacity duration-200 lg:hidden ${
          isMobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setIsMobileMenuOpen(false)}
        aria-hidden="true"
      />

      <aside
        className={`fixed inset-y-0 left-0 z-30 w-[min(80vw,18rem)] transform overflow-y-auto border-r border-sky-100 bg-white/95 p-4 shadow-2xl transition duration-200 ease-out dark:border-white/10 dark:bg-[#191124]/95 lg:static lg:translate-x-0 lg:w-60 lg:shadow-none lg:bg-white/90 lg:backdrop-blur lg:border-b-0 lg:overflow-y-auto ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="mb-4 flex items-center justify-between lg:hidden">
          <div>
            <p className="text-xs font-semibold tracking-[0.3em] text-sky-600 uppercase dark:text-sky-300">
              {copy.appLabel}
            </p>
            <h2 className="mt-1 text-xl font-bold">KelolaSaldo</h2>
          </div>
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(false)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-neutral-200 bg-white text-neutral-700 transition hover:bg-sky-50 dark:border-neutral-700 dark:bg-neutral-950 dark:text-neutral-100 dark:hover:bg-sky-500/10"
            aria-label="Close navigation"
          >
            ✕
          </button>
        </div>

        <div>
          <div className="mb-4 lg:mb-0">
            <p className="text-xs font-semibold tracking-[0.3em] text-sky-600 uppercase dark:text-sky-300">
              {copy.appLabel}
            </p>
            <h2 className="mt-1 text-xl font-bold">KelolaSaldo</h2>
            <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
              {copy.appDescription}
            </p>
          </div>
          <nav>
            <ul className="space-y-1">
              {copy.navigationItems.map((item) => (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    end={item.end}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm transition-colors ${
                        isActive
                          ? "bg-sky-50 font-semibold text-sky-700 dark:bg-sky-500/15 dark:text-sky-200"
                          : "hover:bg-neutral-100 dark:hover:bg-white/5"
                      }`
                    }
                  >
                    <item.icon size={16} />
                    <span>{item.label}</span>
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
          <hr className="my-4 border-neutral-200 dark:border-neutral-700" />
          {user && (
            <div className="space-y-1">
              <p className="font-semibold">{user.name}</p>
              <p className="text-neutral-600 dark:text-neutral-400">
                @{user.username}
              </p>
              <p className="text-xs text-neutral-500">{roleLabel}</p>
            </div>
          )}
        </div>
        <div className="mt-6 flex flex-col gap-2">
          <div className="rounded-lg border border-sky-200 bg-sky-50 p-3 dark:border-sky-400/20 dark:bg-sky-500/10">
            <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-sky-800 dark:text-sky-100">
              <Languages size={16} />
              <span>{copy.languageLabel}</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setLanguage("id")}
                className={`rounded-lg px-3 py-2 text-sm font-semibold transition ${
                  language === "id"
                    ? "bg-sky-600 text-white"
                    : "bg-white text-neutral-700 hover:bg-sky-100 dark:bg-white/10 dark:text-neutral-100 dark:hover:bg-sky-500/15"
                }`}
              >
                Indonesia
              </button>
              <button
                type="button"
                onClick={() => setLanguage("en")}
                className={`rounded-lg px-3 py-2 text-sm font-semibold transition ${
                  language === "en"
                    ? "bg-sky-600 text-white"
                    : "bg-white text-neutral-700 hover:bg-sky-100 dark:bg-white/10 dark:text-neutral-100 dark:hover:bg-sky-500/15"
                }`}
              >
                English
              </button>
            </div>
          </div>
          <button
            onClick={toggleTheme}
            title={copy.themeTitle}
            className="flex items-center justify-center gap-2 rounded-lg border border-sky-200 bg-sky-50 px-3 py-2 font-semibold text-sky-800 transition-colors hover:bg-sky-100 dark:border-sky-400/20 dark:bg-sky-500/10 dark:text-sky-100 dark:hover:bg-sky-500/15"
          >
            {isDark ? (
              <>
                <Sun size={18} />
                <span>{copy.lightMode}</span>
              </>
            ) : (
              <>
                <Moon size={18} />
                <span>{copy.darkMode}</span>
              </>
            )}
          </button>
          <button
            onClick={handleLogout}
            className="flex items-center justify-center gap-2 rounded-lg border border-red-500 bg-red-50 px-3 py-2 font-semibold text-red-600 transition-colors hover:bg-red-100 dark:bg-red-950 dark:hover:bg-red-900"
          >
            <LogOut size={18} />
            <span>{copy.logout}</span>
          </button>
        </div>
      </aside>
    </div>
  );
};

DefaultLayout.propTypes = {
  children: PropTypes.node.isRequired,
};
