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
  if (status === "active") return "bg-[#99ad7a]/20 text-[#99ad7a]";
  if (["completed", "cancelled", "declined"].includes(status)) {
    return "bg-slate-100 text-slate-500";
  }
  return direction === "incoming"
    ? "bg-[#546b41]/20 text-[#546b41]"
    : "bg-[#99ad7a]/20 text-[#99ad7a]";
}

function badgeStyle(status) {
  if (status === "active") return "bg-[#99ad7a]/20 border-[#99ad7a]/30 text-[#99ad7a]";
  if (status === "completed") return "bg-[#546b41]/20 border-[#546b41]/30 text-[#546b41]";
  if (status === "cancelled" || status === "declined") {
    return "bg-rose-100 border-rose-200 text-rose-700";
  }
  return "bg-[#dcccac]/10 border-[#dcccac]/20 text-[#dcccac]";
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
      ? "bg-[#546b41] text-white hover:bg-[#3d4f2f]"
      : "border border-[#546b41]/30 bg-transparent text-[#546b41] hover:bg-[#546b41]/10"
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
      className="rounded-[20px] border border-indigo-100 bg-white px-5 py-5 shadow-[0_2px_12px_rgba(79,70,229,0.08)]"
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
              <h3 className="text-[1.1rem] font-medium leading-tight text-slate-900">
                {request.otherUser.name}
              </h3>
              <span
                className={`rounded-full border px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-widest ${badgeStyle(request.status)}`}
              >
                {request.status}
              </span>
            </div>

            <p className="mt-1 text-[0.93rem] text-slate-500">
              Offers <span className="font-medium text-indigo-700">{request.teachSkillOffered}</span>
              {" · "}
              Wants <span className="font-medium text-cyan-700">{request.learnSkillRequested}</span>
            </p>

            {request.otherUser.headline ? (
              <p className="mt-0.5 text-[0.8rem] text-slate-500">
                {request.otherUser.headline}
              </p>
            ) : null}

            {request.message ? (
              <p className="mt-3 rounded-xl bg-indigo-50 px-3 py-2 text-[0.82rem] leading-relaxed text-slate-600">
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
      <h2 className="text-[1.35rem] font-medium tracking-tight text-slate-900">
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
            className="rounded-[20px] border border-dashed border-[#dcccac]/30 bg-white px-5 py-8 text-center text-[0.87rem] text-slate-500"
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
            background: "#4338ca",
            color: "#ffffff",
            borderRadius: "12px",
            fontSize: "0.86rem",
            boxShadow: "0 4px 20px rgba(67,56,202,0.2)",
          },
          iconTheme: { primary: "#06b6d4", secondary: "#4338ca" },
        });
        router.refresh();
      } else {
        toast.error(result.error || "Unable to update request.", {
          style: {
            background: "#4338ca",
            color: "#ffffff",
            borderRadius: "12px",
            fontSize: "0.86rem",
            boxShadow: "0 4px 20px rgba(67,56,202,0.2)",
          },
          iconTheme: { primary: "#fb7185", secondary: "#4338ca" },
        });
      }

      setPendingId(null);
    });
  }

  return (
    <>
      <Toaster position="top-right" />

      <main className="min-h-screen bg-transparent px-4 pb-20 pt-28 sm:px-6 lg:px-8">
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
