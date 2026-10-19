export const metadata = {
  title: {
    default: "Your DevSwap Workspace",
    template: "%s | DevSwap",
  },
  description: "Manage your profile, discover skill swap partners, and keep track of your learning requests on DevSwap.",
  robots: {
    index: false,
    follow: false,
    googleBot: { index: false, follow: false },
  },
};

export default function UserLayout({ children }) {
  return children;
}
