"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Check,
  CheckCheck,
  Paperclip,
  Send,
  Smile,
  Phone,
  Video,
  MoreHorizontal,
} from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

import {
  getChatMessages,
  markChatRead,
  sendChatMessage,
} from "@/src/actions/user/chatactions";

const msgVariants = {
  hidden: { opacity: 0, y: 10, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.28, ease: [0.22, 1, 0.36, 1] },
  },
  exit: { opacity: 0, scale: 0.95, transition: { duration: 0.15 } },
};

const typingVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.25 } },
  exit: { opacity: 0, y: 4, transition: { duration: 0.15 } },
};

function Avatar({ initials, size = "md", online = false }) {
  const dimensions =
    size === "sm"
      ? "w-8 h-8 text-[11px]"
      : size === "lg"
        ? "w-12 h-12 text-[15px]"
        : "w-10 h-10 text-[13px]";

  return (
    <div className="relative shrink-0">
      <div
        className={`${dimensions} rounded-full flex items-center justify-center font-bold text-white`}
        style={{ background: "linear-gradient(135deg, #D89216, #11201b)" }}
      >
        {initials}
      </div>
      {online ? (
        <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-white bg-[#D89216]" />
      ) : null}
    </div>
  );
}

function StatusIcon({ status }) {
  if (status === "read") return <CheckCheck size={13} className="text-[#8F5E00]" />;
  if (status === "delivered") {
    return <CheckCheck size={13} className="text-[#11201b] opacity-50" />;
  }
  return <Check size={13} className="text-[#11201b] opacity-40" />;
}

function TypingDots() {
  return (
    <div className="flex items-center gap-1 px-1 py-1">
      {[0, 1, 2].map((index) => (
        <motion.span
          key={index}
          className="h-1.5 w-1.5 rounded-full bg-[#D89216]"
          animate={{ y: [0, -4, 0] }}
          transition={{
            duration: 0.6,
            repeat: Infinity,
            delay: index * 0.15,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

function MessageBubble({ msg, isMe, meInitials, partnerInitials }) {
  return (
    <motion.div
      layout
      variants={msgVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className={`flex items-end gap-2 ${isMe ? "flex-row-reverse" : "flex-row"}`}
    >
      {!isMe ? <Avatar initials={partnerInitials} size="sm" /> : null}

      <div className={`flex max-w-[72%] flex-col gap-1 ${isMe ? "items-end" : "items-start"}`}>
        <div
          className={`rounded-2xl px-4 py-2.5 text-[13.5px] leading-relaxed shadow-sm ${
            isMe
              ? "rounded-br-sm text-[#ffffff]"
              : "rounded-bl-sm border border-[#D89216]/15 text-[#11201b]"
          }`}
          style={{
            background: isMe
              ? "linear-gradient(135deg, #11201b, #D89216)"
              : "#ffffff",
          }}
        >
          {msg.text}
        </div>

        <div className={`flex items-center gap-1.5 px-1 ${isMe ? "flex-row-reverse" : "flex-row"}`}>
          <span className="text-[10px] text-slate-500 opacity-60">{msg.timestamp}</span>
          {isMe ? <StatusIcon status={msg.status} /> : null}
        </div>
      </div>

      {isMe ? <Avatar initials={meInitials} size="sm" /> : null}
    </motion.div>
  );
}

function DateSeparator({ label }) {
  return (
    <div className="my-3 flex items-center gap-3">
      <div className="h-px flex-1 bg-[#D89216]/35" />
      <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#11201b]">
        {label}
      </span>
      <div className="h-px flex-1 bg-[#D89216]/35" />
    </div>
  );
}

function SwapBanner({ chat }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.3 }}
      className="mx-4 mb-1 mt-3 flex flex-wrap items-center gap-3 rounded-xl px-4 py-2.5"
      style={{
        background: "rgba(17,32,27,0.08)",
        border: "1px solid rgba(17,32,27,0.2)",
      }}
    >
      <span className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#11201b]">
        {chat.status === "active" ? "Active swap" : "Swap request"}
      </span>
      <div className="flex flex-wrap gap-2">
        <span
          className="rounded-full px-2.5 py-0.5 text-[11px] font-semibold"
          style={{ background: "rgba(17,32,27,0.12)", color: "#11201b" }}
        >
          {chat.partner.name} teaches {chat.swap.receive}
        </span>
        <span
          className="rounded-full px-2.5 py-0.5 text-[11px] font-semibold"
          style={{ background: "rgba(216,146,22,0.12)", color: "#11201b" }}
        >
          You teach {chat.swap.offer}
        </span>
      </div>
    </motion.div>
  );
}

export default function ChatClient({ chat }) {
  const [messages, setMessages] = useState(chat.messages);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [connected, setConnected] = useState(true);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);
  const pollRef = useRef(null);
  // Use a ref for isMounted so the polling closure always sees the latest value
  const isMountedRef = useRef(true);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  useEffect(() => {
    isMountedRef.current = true;

    async function hydrateMessages() {
      try {
        const result = await getChatMessages(chat.requestId);
        if (isMountedRef.current && !result?.error && Array.isArray(result.messages)) {
          setMessages(result.messages);
          setConnected(true);
        }
        await markChatRead(chat.requestId);
      } catch {
        if (isMountedRef.current) {
          setConnected(false);
        }
      } finally {
        if (isMountedRef.current) {
          setIsTyping(false);
        }
      }
    }

    hydrateMessages();

    pollRef.current = setInterval(async () => {
      if (!isMountedRef.current) return;
      try {
        const result = await getChatMessages(chat.requestId);
        if (!isMountedRef.current) return;
        if (!result?.error && Array.isArray(result.messages)) {
          // Compute diff OUTSIDE the setMessages updater so we never
          // call a server action (markChatRead) during React's render phase.
          setMessages((current) => {
            const currentIds = current.map((msg) => msg._id).join(",");
            const nextIds = result.messages.map((msg) => msg._id).join(",");
            const hasChanged =
              currentIds !== nextIds ||
              current.length !== result.messages.length;
            return hasChanged ? result.messages : current;
          });

          // Detect new incoming messages and mark read AFTER state update,
          // never inside the updater callback.
          setMessages((current) => {
            const hasIncomingNew = result.messages.some(
              (msg) =>
                msg.senderId === "other" &&
                !current.find((item) => item._id === msg._id),
            );
            if (hasIncomingNew) {
              // Fire-and-forget outside render — safe here because setMessages
              // updaters run asynchronously after paint in concurrent mode,
              // but to be 100% safe we push it to a microtask.
              Promise.resolve().then(() =>
                markChatRead(chat.requestId).catch(() => {}),
              );
            }
            return current;
          });

          setConnected(true);
        }
      } catch {
        if (isMountedRef.current) {
          setConnected(false);
        }
      }
    }, 2000);

    return () => {
      isMountedRef.current = false;
      if (pollRef.current) {
        clearInterval(pollRef.current);
      }
    };
  }, [chat.requestId]);

  const handleSend = useCallback(async () => {
    const text = input.trim();
    if (!text) return;

    const optimisticMessage = {
      _id: `temp-${Date.now()}`,
      senderId: "me",
      text,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      status: "sent",
    };

    setMessages((prev) => [...prev, optimisticMessage]);
    setInput("");
    inputRef.current?.focus();

    const result = await sendChatMessage({
      requestId: chat.requestId,
      text,
    });

    if (result.success) {
      setMessages((prev) =>
        prev.map((message) =>
          message._id === optimisticMessage._id ? result.message : message,
        ),
      );
    } else {
      setMessages((prev) =>
        prev.filter((message) => message._id !== optimisticMessage._id),
      );
      toast.error(result.error || "Unable to send message.");
    }
  }, [chat.requestId, input]);

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSend();
    }
  };

  const handleInputChange = (event) => {
    setInput(event.target.value);
  };

  const quickReplies = ["Sounds good!", "Let me check", "Can we reschedule?", "See you then!"];

  return (
    <>
      <Toaster position="top-right" />

      {/* Root container */}
      <div
        className="flex h-screen flex-col"
        style={{ background: "linear-gradient(160deg, #ffffff 0%, #ffffff 55%, #ffffff 100%)" }}
      >
        {/* ── Header ── */}
        <header
          className="flex shrink-0 items-center gap-3 border-b px-4 py-3"
          style={{
            borderColor: "rgba(17,32,27,0.18)",
            background: "rgba(255,255,255,0.82)",
            backdropFilter: "blur(12px)",
          }}
        >
          <Link
            href="/user/chat"
            className="flex h-8 w-8 items-center justify-center rounded-full transition-colors hover:bg-[#D89216]/15"
          >
            <ArrowLeft size={18} className="text-[#11201b]" />
          </Link>

          <Avatar initials={chat.partner.initials} size="md" online={chat.partner.online} />

          <div className="min-w-0 flex-1">
            <p className="truncate text-[14px] font-semibold text-slate-900">
              {chat.partner.name}
            </p>
            <p className="truncate text-[11px] text-slate-500">
              {chat.partner.online ? "Online now" : chat.partner.lastSeen}
            </p>
          </div>

          {/* Connection indicator */}
          {!connected && (
            <span className="rounded-full bg-[#D89216]/15 px-2 py-0.5 text-[10px] font-semibold text-[#11201b]">
              Reconnecting…
            </span>
          )}

          <div className="flex items-center gap-1">
            <button className="flex h-8 w-8 items-center justify-center rounded-full transition-colors hover:bg-[#D89216]/10">
              <Phone size={16} className="text-[#11201b]" />
            </button>
            <button className="flex h-8 w-8 items-center justify-center rounded-full transition-colors hover:bg-[#D89216]/10">
              <Video size={16} className="text-[#11201b]" />
            </button>
            <button className="flex h-8 w-8 items-center justify-center rounded-full transition-colors hover:bg-[#D89216]/10">
              <MoreHorizontal size={16} className="text-[#11201b]" />
            </button>
          </div>
        </header>

        {/* ── Swap banner ── */}
        <SwapBanner chat={chat} />

        {/* ── Message list ── */}
        <div className="flex-1 overflow-y-auto px-4 py-3">
          <DateSeparator label="Today" />

          <AnimatePresence initial={false}>
            {messages.map((msg) => (
              <div key={msg._id} className="mb-3">
                <MessageBubble
                  msg={msg}
                  isMe={msg.senderId === "me"}
                  meInitials={chat.me.initials}
                  partnerInitials={chat.partner.initials}
                />
              </div>
            ))}

            {isTyping && (
              <motion.div
                key="typing"
                variants={typingVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="mb-3 flex items-end gap-2"
              >
                <Avatar initials={chat.partner.initials} size="sm" />
                <div
                  className="rounded-2xl rounded-bl-sm border border-[#D89216]/15 px-4 py-2.5 shadow-sm"
                  style={{ background: "#ffffff" }}
                >
                  <TypingDots />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div ref={bottomRef} />
        </div>

        {/* ── Quick replies ── */}
        <div className="flex shrink-0 gap-2 overflow-x-auto px-4 pb-2 pt-1">
          {quickReplies.map((reply) => (
            <button
              key={reply}
              onClick={() => setInput(reply)}
              className="shrink-0 rounded-full border px-3 py-1 text-[11.5px] font-medium transition-colors hover:bg-[#D89216]/10"
              style={{
                borderColor: "rgba(216,146,22,0.3)",
                color: "#11201b",
                background: "rgba(248,249,252,0.8)",
              }}
            >
              {reply}
            </button>
          ))}
        </div>

        {/* ── Input bar ── */}
        <div
          className="shrink-0 border-t px-4 py-3"
          style={{
            borderColor: "rgba(216,146,22,0.18)",
            background: "rgba(248,249,252,0.9)",
            backdropFilter: "blur(12px)",
          }}
        >
          <div
            className="flex items-end gap-2 rounded-2xl border px-3 py-2"
            style={{
              borderColor: "rgba(216,146,22,0.25)",
              background: "#ffffff",
            }}
          >
            <button className="mb-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full transition-colors hover:bg-[#D89216]/10">
              <Smile size={18} className="text-[#11201b]" />
            </button>

            <textarea
              ref={inputRef}
              value={input}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              placeholder="Type a message…"
              rows={1}
              className="max-h-32 flex-1 resize-none bg-transparent text-[13.5px] text-[#11201b] placeholder-[#11201b]/40 outline-none"
              style={{ lineHeight: "1.5" }}
            />

            <button className="mb-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full transition-colors hover:bg-[#D89216]/10">
              <Paperclip size={16} className="text-[#11201b]" />
            </button>

            <button
              onClick={handleSend}
              disabled={!input.trim()}
              className="mb-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-all disabled:opacity-30"
              style={{
                background: input.trim()
                  ? "linear-gradient(135deg, #11201b, #11201b)"
                  : "transparent",
              }}
            >
              <Send
                size={15}
                className={input.trim() ? "text-[#ffffff]" : "text-[#11201b]"}
              />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
