"use client";

import Link from "next/link";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";

import { updateSwapRequestStatus } from "@/src/actions/user/requestactions";

function getInitials(name = "") {
  return name
    .split(" ")
    .filter(Boolean)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function avatarTone(direction, status) {
  if (status === "active") return "bg-[#e9f3e6] text-[#3a6e2e]";
  if (["completed", "cancelled", "declined"].includes(status)) {
    return "bg-[#eaeaea] text-[#666]";
  }
  return direction === "incoming"
    ? "bg-[#f5e6cf] text-[#8C5A3C]"
    : "bg-[#f8e9e4] text-[#a55a2f]";
}

function badgeStyle(status) {
  if (status === "active") return "bg-[#e9f3e6] border-[#b8d9b0] text-[#3a6e2e]";
  if (status === "completed") return "bg-[#e6f0fb] border-[#b5cce8] text-[#2a5a8c]";
  if (status === "cancelled" || status === "declined") {
    return "bg-[#f3eaea] border-[#e0b8b8] text-[#8c3a3a]";
  }
  return "bg-[#f7efe4] border-[#e4d5bd] text-[#8C5A3C]";
}

const cardVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: (index) => ({
    opacity: 1,
    y: 0,
    transition: { delay: index * 0.06, duration: 0.35, ease: [0.34, 1.56, 0.64, 1] },
  }),
  exit: {
    opacity: 0,
    y: -8,
    scale: 0.97,
    transition: { duration: 0.2, ease: "easeIn" },
  },
};

function AvatarBadge({ name, direction, status }) {
  return (
    <div
      className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-base font-medium ${avatarTone(direction, status)}`}
    >
      {getInitials(name)}
    </div>
  );
}

function RequestAction({ action, request, isBusy, onAction }) {
  const className = `flex items-center gap-2 rounded-xl px-5 py-2 text-[0.84rem] font-medium transition-colors ${
    action.primary
      ? "bg-[#3b2a1a] text-[#fff8f0] hover:bg-[#2f2115]"
      : "border border-[#b9aa95] bg-transparent text-[#3b2a1a] hover:bg-[#f5ede3]"
  }`;

  if (action.href) {
    return (
      <Link key={action.label} href={action.href(request)} className={className}>
        {action.label}
      </Link>
    );
  }

  return (
    <motion.button
      key={action.status}
      type="button"
      whileTap={{ scale: 0.96 }}
      onClick={() => onAction(request.id, action.status)}
      disabled={isBusy}
      className={`${className} disabled:cursor-not-allowed disabled:opacity-55`}
    >
      {isBusy ? (
        <>
          <motion.span
            className="block h-3.5 w-3.5 rounded-full border-2 border-[#f5e6cf] border-t-[#8C5A3C]"
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 0.7, ease: "linear" }}
          />
          Updating...
        </>
      ) : (
        action.label
      )}
    </motion.button>
  );
}

function RequestCard({ request, actions, pendingId, onAction, index }) {
  const isBusy = pendingId === request.id;

  return (
    <motion.article
      layout
      custom={index}
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="rounded-[20px] border border-[#d9ccb8] bg-[#fffdf9] px-5 py-5 shadow-[0_2px_12px_rgba(60,35,10,0.05)]"
    >
      <div className="flex flex-col gap-4">
        <div className="flex items-start gap-4">
          <AvatarBadge
            name={request.otherUser.name}
            direction={request.direction}
            status={request.status}
          />

          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="text-[1.1rem] font-medium leading-tight text-[#3b2a1a]">
                {request.otherUser.name}
              </h3>
              <span
                className={`rounded-full border px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-widest ${badgeStyle(request.status)}`}
              >
                {request.status}
              </span>
            </div>

            <p className="mt-1 text-[0.93rem] text-[#7a6550]">
              Offers <span className="font-medium text-[#5a3e28]">{request.teachSkillOffered}</span>
              {" · "}
              Wants <span className="font-medium text-[#5a3e28]">{request.learnSkillRequested}</span>
            </p>

            {request.otherUser.headline ? (
              <p className="mt-0.5 text-[0.8rem] text-[#9a846e]">
                {request.otherUser.headline}
              </p>
            ) : null}

            {request.message ? (
              <p className="mt-3 rounded-xl bg-[#f7f1e8] px-3 py-2 text-[0.82rem] leading-relaxed text-[#6b5a48]">
                {request.message}
              </p>
            ) : null}
          </div>
        </div>

        {actions.length > 0 ? (
          <div className="flex flex-wrap gap-2.5">
            {actions.map((action) => (
              <RequestAction
                key={action.label ?? action.status}
                action={action}
                request={request}
                isBusy={isBusy}
                onAction={onAction}
              />
            ))}
          </div>
        ) : null}
      </div>
    </motion.article>
  );
}

function RequestsSection({ title, items, empty, actions, pendingId, onAction }) {
  return (
    <section className="space-y-3">
      <h2 className="text-[1.35rem] font-medium tracking-tight text-[#3b2a1a]">
        {title}
      </h2>

      <AnimatePresence mode="popLayout">
        {items.length ? (
          items.map((request, index) => (
            <RequestCard
              key={request.id}
              request={request}
              actions={actions}
              pendingId={pendingId}
              onAction={onAction}
              index={index}
            />
          ))
        ) : (
          <motion.div
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="rounded-[20px] border border-dashed border-[#d9ccb8] bg-[#fffdf9] px-5 py-8 text-center text-[0.87rem] text-[#8b7763]"
          >
            {empty}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

export default function RequestsClient({ requests }) {
  const router = useRouter();
  const [, startTransition] = useTransition();
  const [pendingId, setPendingId] = useState(null);

  function handleAction(requestId, status) {
    setPendingId(requestId);

    startTransition(async () => {
      const result = await updateSwapRequestStatus({ requestId, status });

      if (result.success) {
        toast.success(result.message, {
          style: {
            background: "#3b2a1a",
            color: "#fff8f0",
            borderRadius: "12px",
            fontSize: "0.86rem",
            boxShadow: "0 4px 20px rgba(60,35,10,0.18)",
          },
          iconTheme: { primary: "#6ec87a", secondary: "#3b2a1a" },
        });
        router.refresh();
      } else {
        toast.error(result.error || "Unable to update request.", {
          style: {
            background: "#3b2a1a",
            color: "#fff8f0",
            borderRadius: "12px",
            fontSize: "0.86rem",
            boxShadow: "0 4px 20px rgba(60,35,10,0.18)",
          },
          iconTheme: { primary: "#e27272", secondary: "#3b2a1a" },
        });
      }

      setPendingId(null);
    });
  }

  return (
    <>
      <Toaster position="top-right" />

      <main className="min-h-screen bg-[#FFF8F0] px-4 pb-20 pt-28 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl space-y-10">
          <RequestsSection
            title="Incoming requests"
            items={requests.incoming}
            empty="No incoming requests right now."
            pendingId={pendingId}
            onAction={handleAction}
            actions={[
              { label: "Accept", status: "active", primary: true },
              { label: "Decline", status: "declined" },
            ]}
          />

          <RequestsSection
            title="My sent requests"
            items={requests.outgoing}
            empty="You haven't sent any pending requests."
            pendingId={pendingId}
            onAction={handleAction}
            actions={[{ label: "Cancel", status: "cancelled" }]}
          />

          <RequestsSection
            title="Active swaps"
            items={requests.active}
            empty="No active swaps yet."
            pendingId={pendingId}
            onAction={handleAction}
            actions={[
              { label: "Open Chat", href: (request) => `/user/chat/${request.id}` },
              { label: "Complete", status: "completed", primary: true },
              { label: "Cancel", status: "cancelled" },
            ]}
          />

          <RequestsSection
            title="History"
            items={requests.history}
            empty="Your completed and closed requests will show up here."
            pendingId={pendingId}
            onAction={handleAction}
            actions={[]}
          />
        </div>
      </main>
    </>
  );
}
