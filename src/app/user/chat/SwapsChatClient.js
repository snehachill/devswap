"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  MoreHorizontal,
  Paperclip,
  Phone,
  Search,
  Send,
  Video,
  X,
  MessageSquareText,
} from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

import {
  getChatThread,
  getSwapsChatPageData,
  markChatRead,
  sendChatMessage,
} from "@/src/actions/user/chatactions";

const ease = [0.22, 1, 0.36, 1];
const QUICK_REPLIES = [
  "Sounds good!",
  "Let's schedule!",
  "Can we reschedule?",
  "See you then!",
  "That works for me!",
];

function formatMessageDateLabel(value) {
  const date = new Date(value);
  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);

  const sameDay =
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear();

  if (sameDay) {
    return "TODAY";
  }

  const sameAsYesterday =
    date.getDate() === yesterday.getDate() &&
    date.getMonth() === yesterday.getMonth() &&
    date.getFullYear() === yesterday.getFullYear();

  if (sameAsYesterday) {
    return "YESTERDAY";
  }

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  })
    .format(date)
    .toUpperCase();
}

function initialsTone(seed = "") {
  const tones = [
    "from-[#11201b] to-[#D89216]",
    "from-[#D89216] to-[#11201b]",
    "from-[#11201b] to-[#11201b]",
    "from-[#11201b] to-[#11201b]",
    "from-[#D89216] to-[#D89216]",
  ];

  const sum = seed.split("").reduce((total, char) => total + char.charCodeAt(0), 0);
  return tones[sum % tones.length];
}

function ConversationAvatar({ initials, online, seed }) {
  return (
    <div className="relative shrink-0">
      <div
        className={`flex h-13 w-13 items-center justify-center rounded-2xl bg-gradient-to-br ${initialsTone(seed)} text-sm font-semibold text-white shadow-sm`}
      >
        {initials}
      </div>
      <span
        className={`absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full border-2 border-white ${
          online ? "bg-[#D89216]" : "bg-[#D89216]"
        }`}
      />
    </div>
  );
}

function DateSeparator({ label }) {
  return (
    <div className="my-5 flex items-center gap-3">
      <div className="h-px flex-1 bg-[#D89216]" />
      <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#72766f]">
        {label}
      </span>
      <div className="h-px flex-1 bg-[#D89216]" />
    </div>
  );
}

function TypingBubble({ initials, seed }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 4 }}
      className="flex items-end gap-3"
    >
      <ConversationAvatar initials={initials} online seed={seed} />
      <div className="rounded-[20px] rounded-bl-md border border-[#e7e8e4] bg-white px-4 py-3 shadow-sm">
        <div className="flex items-center gap-1.5">
          {[0, 1, 2].map((index) => (
            <motion.span
              key={index}
              className="h-2 w-2 rounded-full bg-[#D89216]"
              animate={{ y: [0, -4, 0] }}
              transition={{
                duration: 0.8,
                repeat: Infinity,
                delay: index * 0.15,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function ChatBubble({ message, isMe, showAvatar, avatarInitials, seed }) {
  return (
    <div className={`flex items-end gap-3 ${isMe ? "justify-end" : "justify-start"}`}>
      {!isMe ? (
        showAvatar ? (
          <ConversationAvatar initials={avatarInitials} online seed={seed} />
        ) : (
          <div className="h-13 w-13 shrink-0" />
        )
      ) : null}

      <div className={`max-w-[78%] ${isMe ? "items-end" : "items-start"} flex flex-col`}>
        <div
          className={`px-4 py-2.5 text-[13px] leading-6 shadow-sm ${
            isMe
              ? "rounded-[22px] rounded-br-md bg-gradient-to-br from-[#11201b] to-[#D89216] text-white"
              : "rounded-[22px] rounded-bl-md border border-[#e7e8e4] bg-white text-[#11201b]"
          }`}
        >
          {message.text}
        </div>

        <div className={`mt-1 flex items-center gap-1.5 px-1 text-[10px] text-[#72766f] ${isMe ? "self-end" : "self-start"}`}>
          <span>{message.timestamp}</span>
          {isMe ? (
            <>
              {message.status === "sent" ? <span>✓</span> : null}
              {message.status === "delivered" ? <span className="text-[#72766f]">✓✓</span> : null}
              {message.status === "read" ? <span className="text-[#11201b]">✓✓</span> : null}
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
}

function EmptyListState() {
  return (
    <div className="flex h-full flex-col items-center justify-center px-8 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#ffffff] text-[#11201b]">
        <MessageSquareText size={22} />
      </div>
      <h3 className="mt-5 text-lg font-semibold text-[#11201b]">No swaps yet</h3>
      <p className="mt-2 max-w-xs text-sm leading-6 text-[#72766f]">
        Accept a swap request to start exchanging skills and chatting with your partner.
      </p>
      <Link
        href="/user/requests"
        className="mt-5 inline-flex min-h-11 items-center justify-center rounded-full bg-[#11201b] px-5 text-sm font-semibold text-white transition hover:bg-[#11201b]"
      >
        Go to Requests
      </Link>
    </div>
  );
}

function EmptyChatState() {
  return (
    <div className="hidden h-full flex-col items-center justify-center px-8 text-center md:flex">
      <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-gradient-to-br from-[#11201b] to-[#11201b] text-white shadow-lg shadow-[#11201b]/20">
        <MessageSquareText size={28} />
      </div>
      <h2 className="mt-6 text-2xl font-semibold text-[#11201b]" style={{ fontFamily: "var(--font-dm-serif), serif" }}>
        Select a swap to start chatting
      </h2>
      <p className="mt-3 max-w-md text-sm leading-7 text-[#72766f]">
        Pick one of your swap partners from the left to continue the conversation without leaving this page.
      </p>
    </div>
  );
}

export default function SwapsChatClient({ initialData }) {
  const router = useRouter();
  const pathname = usePathname();
  const [conversations, setConversations] = useState(initialData?.conversations ?? []);
  const [selectedChat, setSelectedChat] = useState(initialData?.selectedChat ?? null);
  const [selectedId, setSelectedId] = useState(initialData?.selectedRequestId ?? "");
  const [query, setQuery] = useState("");
  const [input, setInput] = useState("");
  const [showBanner, setShowBanner] = useState(true);
  const [isPartnerTyping, setIsPartnerTyping] = useState(false);
  const [isConnected, setIsConnected] = useState(true);
  const [isThreadLoading, setIsThreadLoading] = useState(false);
  const [isMobileChatOpen, setIsMobileChatOpen] = useState(Boolean(initialData?.selectedChat));
  const listScrollRef = useRef(null);
  const messagesScrollRef = useRef(null);
  const textareaRef = useRef(null);
  const pollingRef = useRef(null);
  const typingTimeoutRef = useRef(null);

  const filteredConversations = useMemo(() => {
    const normalized = query.trim().toLowerCase();

    return conversations.filter((conversation) => {
      const haystack = [
        conversation.partner.name,
        conversation.partner.teaches,
        conversation.partner.learns,
        conversation.preview,
      ]
        .join(" ")
        .toLowerCase();

      return !normalized || haystack.includes(normalized);
    });
  }, [conversations, query]);

  const messageRows = useMemo(() => {
    const items = [];
    const messages = selectedChat?.messages ?? [];

    messages.forEach((message, index) => {
      const prev = messages[index - 1];
      const next = messages[index + 1];
      const currentDate = formatMessageDateLabel(message.createdAt);
      const previousDate = prev ? formatMessageDateLabel(prev.createdAt) : null;
      const nextSameSender =
        next &&
        next.senderId === message.senderId &&
        formatMessageDateLabel(next.createdAt) === currentDate;

      if (currentDate !== previousDate) {
        items.push({
          type: "separator",
          key: `separator-${message._id}`,
          label: currentDate,
        });
      }

      items.push({
        type: "message",
        key: message._id,
        message,
        showAvatar: !nextSameSender && message.senderId === "other",
        compactTop:
          prev &&
          prev.senderId === message.senderId &&
          formatMessageDateLabel(prev.createdAt) === currentDate,
      });
    });

    return items;
  }, [selectedChat]);

  useEffect(() => {
    if (!textareaRef.current) {
      return;
    }

    textareaRef.current.style.height = "0px";
    const nextHeight = Math.min(textareaRef.current.scrollHeight, 120);
    textareaRef.current.style.height = `${nextHeight}px`;
  }, [input]);

  useEffect(() => {
    messagesScrollRef.current?.scrollTo({
      top: messagesScrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [selectedChat?.messages, isPartnerTyping]);

  useEffect(() => {
    if (!selectedId) {
      return;
    }

    markChatRead(selectedId).catch(() => {});
  }, [selectedId]);

  const syncWorkspace = useCallback(async () => {
    try {
      const result = await getSwapsChatPageData(selectedId);

      if (result?.error) {
        setIsConnected(false);
        return;
      }

      setConversations(result.conversations ?? []);
      if (selectedId) {
        setSelectedChat(result.selectedChat ?? null);
      }
      setIsConnected(true);
    } catch {
      setIsConnected(false);
    }
  }, [selectedId]);

  useEffect(() => {
    pollingRef.current = setInterval(() => {
      syncWorkspace();
    }, 2500);

    return () => {
      if (pollingRef.current) {
        clearInterval(pollingRef.current);
      }

      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
    };
  }, [syncWorkspace]);

  async function handleSelectConversation(conversationId) {
    if (!conversationId || conversationId === selectedId) {
      setIsMobileChatOpen(true);
      return;
    }

    setIsThreadLoading(true);

    try {
      const result = await getChatThread(conversationId);

      if (result?.error) {
        toast.error(result.error);
        return;
      }

      setSelectedId(conversationId);
      setSelectedChat(result.chat);
      setShowBanner(true);
      setIsMobileChatOpen(true);
      router.replace(`${pathname}?swap=${conversationId}`, { scroll: false });
      await markChatRead(conversationId);
      await syncWorkspace();
    } finally {
      setIsThreadLoading(false);
    }
  }

  function handleBackToList() {
    setIsMobileChatOpen(false);
    router.replace(pathname, { scroll: false });
  }

  async function handleSend() {
    const text = input.trim();

    if (!text || !selectedId || !selectedChat) {
      return;
    }

    const optimisticMessage = {
      _id: `temp-${Date.now()}`,
      senderId: "me",
      text,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      dateLabel: formatMessageDateLabel(new Date().toISOString()),
      status: "sent",
      createdAt: new Date().toISOString(),
    };

    setSelectedChat((current) =>
      current
        ? { ...current, messages: [...current.messages, optimisticMessage] }
        : current,
    );
    setInput("");

    const result = await sendChatMessage({ requestId: selectedId, text });

    if (!result.success) {
      setSelectedChat((current) =>
        current
          ? {
              ...current,
              messages: current.messages.filter((message) => message._id !== optimisticMessage._id),
            }
          : current,
      );
      toast.error(result.error || "Unable to send message.");
      return;
    }

    setSelectedChat((current) =>
      current
        ? {
            ...current,
            messages: current.messages.map((message) =>
              message._id === optimisticMessage._id ? result.message : message,
            ),
          }
        : current,
    );

    setConversations((current) =>
      current.map((conversation) =>
        conversation.id === selectedId
          ? {
              ...conversation,
              preview: text,
              previewTimestamp: "now",
            }
          : conversation,
      ),
    );

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    setIsPartnerTyping(true);
    typingTimeoutRef.current = setTimeout(() => {
      setIsPartnerTyping(false);
    }, 1200);
  }

  function handleInputKeyDown(event) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSend();
    }
  }

  function renderListPanel() {
    return (
      <div className="flex h-full min-h-0 flex-col overflow-hidden border-r border-[#e7e8e4] bg-[#ffffff]">
      <div className="shrink-0 border-b border-[#e7e8e4] px-5 pb-4 pt-5">
        <div className="flex items-center gap-3">
          <h1
            className="text-[1.9rem] font-semibold leading-none text-[#11201b]"
            style={{ fontFamily: "var(--font-dm-serif), serif" }}
          >
            Swaps
          </h1>
          <span className="rounded-full bg-[#ffffff] px-2.5 py-1 text-[11px] font-semibold text-[#11201b]">
            {conversations.length}
          </span>
        </div>

        <div className="relative mt-4">
          <Search
            size={16}
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#72766f]"
          />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search by name or skill"
            className="w-full rounded-2xl border border-[#e7e8e4] bg-white py-3 pl-11 pr-11 text-sm text-[#11201b] outline-none transition focus:border-[#e7e8e4] focus:ring-2 focus:ring-[#D89216]"
          />
          <AnimatePresence>
            {query ? (
              <motion.button
                key="clear"
                type="button"
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.85 }}
                onClick={() => setQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-[#72766f] transition hover:bg-[#ffffff] hover:text-[#11201b]"
              >
                <X size={15} />
              </motion.button>
            ) : null}
          </AnimatePresence>
        </div>
      </div>

      <div ref={listScrollRef} className="min-h-0 flex-1 overflow-y-auto overscroll-contain">
        {!conversations.length ? (
          <EmptyListState />
        ) : filteredConversations.length ? (
          <div className="p-2">
            {filteredConversations.map((conversation) => {
              const isActive = conversation.id === selectedId;

              return (
                <button
                  key={conversation.id}
                  type="button"
                  onClick={() => handleSelectConversation(conversation.id)}
                  className={`relative flex w-full items-start gap-3 rounded-2xl px-3 py-3 text-left transition ${
                    isActive
                      ? "bg-[#ffffff]"
                      : "hover:bg-[#ffffff]"
                  }`}
                >
                  <span
                    className={`absolute bottom-3 left-0 top-3 w-1 rounded-full ${
                      isActive ? "bg-[#D89216]" : "bg-transparent"
                    }`}
                  />

                  <ConversationAvatar
                    initials={conversation.partner.initials}
                    online={conversation.partner.online}
                    seed={conversation.partner.name}
                  />

                  <div className="min-w-0 flex-1 pl-1">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <p className="truncate text-[14px] font-semibold text-[#11201b]">
                          {conversation.partner.name}
                        </p>
                        <p
                          className={`mt-1 truncate text-[12px] ${
                            conversation.preview
                              ? "text-[#11201b]"
                              : "italic text-[#72766f]"
                          }`}
                        >
                          {conversation.preview || "Start the conversation..."}
                        </p>
                      </div>

                      <div className="shrink-0 text-right">
                        <p className="text-[10px] text-[#72766f]">
                          {conversation.previewTimestamp || ""}
                        </p>
                        {conversation.unreadCount ? (
                          <span className="mt-1 inline-flex min-w-5 items-center justify-center rounded-full bg-[#ffffff] px-1.5 py-0.5 text-[10px] font-semibold text-[#11201b]">
                            {conversation.unreadCount}
                          </span>
                        ) : null}
                      </div>
                    </div>

                    <div className="mt-2 flex flex-wrap gap-2">
                      <span className="rounded-full bg-[#ffffff] px-2 py-1 text-[10px] font-semibold text-[#11201b]">
                        Teaches {conversation.partner.teaches}
                      </span>
                      <span className="rounded-full bg-[#ffffff] px-2 py-1 text-[10px] font-semibold text-[#11201b]">
                        Learns {conversation.partner.learns}
                      </span>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        ) : (
          <div className="flex h-full items-center justify-center px-8 text-center text-sm text-[#72766f]">
            No swap partners match that search yet.
          </div>
        )}
      </div>
    </div>
    );
  }

  function renderChatPanel() {
    if (!selectedChat) {
      return <EmptyChatState />;
    }

    return (
      <div className="flex h-full min-h-0 flex-col overflow-hidden bg-[#ffffff]">
      <div className="shrink-0 border-b border-[#e7e8e4] bg-[#FFFFFF]">
        <div className="flex items-center gap-3 px-4 py-4">
          <button
            type="button"
            onClick={handleBackToList}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full text-[#11201b] transition hover:bg-[#ffffff] md:hidden"
          >
            <ArrowLeft size={18} />
          </button>

          <ConversationAvatar
            initials={selectedChat.partner.initials}
            online={selectedChat.partner.online}
            seed={selectedChat.partner.name}
          />

          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-[#11201b]">
              {selectedChat.partner.name}
            </p>
            <p className="truncate text-xs text-[#72766f]">
              {selectedChat.partner.online ? "Active now" : selectedChat.partner.lastSeen}
            </p>
          </div>

          <div className="flex items-center gap-1">
            {[Phone, Video, MoreHorizontal].map((Icon, index) => (
              <button
                key={index}
                type="button"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full text-[#11201b] transition hover:bg-[#ffffff] hover:text-[#11201b]"
              >
                <Icon size={18} />
              </button>
            ))}
          </div>
        </div>

        <AnimatePresence>
          {showBanner ? (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden border-t border-[#e7e8e4] bg-[#FFFFFF]"
            >
              <div className="flex items-center justify-between gap-4 px-4 py-2.5 text-sm text-[#72766f]">
                <p className="truncate">
                  {selectedChat.partner.name} teaches {selectedChat.swap.receive} · You teach{" "}
                  {selectedChat.swap.offer}
                </p>
                <button
                  type="button"
                  onClick={() => setShowBanner(false)}
                  className="rounded-full p-1 transition hover:bg-[#ffffff]"
                >
                  <X size={14} />
                </button>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>

      <div ref={messagesScrollRef} className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 py-4">
        {messageRows.map((item) =>
          item.type === "separator" ? (
            <DateSeparator key={item.key} label={item.label} />
          ) : (
            <div key={item.key} className={item.compactTop ? "mt-[3px]" : "mt-3"}>
              <ChatBubble
                message={item.message}
                isMe={item.message.senderId === "me"}
                showAvatar={item.showAvatar}
                avatarInitials={selectedChat.partner.initials}
                seed={selectedChat.partner.name}
              />
            </div>
          ),
        )}

        <AnimatePresence>
          {isPartnerTyping ? (
            <div className="mt-3">
              <TypingBubble
                initials={selectedChat.partner.initials}
                seed={selectedChat.partner.name}
              />
            </div>
          ) : null}
        </AnimatePresence>
      </div>

      {!input ? (
        <div className="shrink-0 overflow-x-auto px-4 pb-2 pt-1">
          <div className="flex gap-2">
            {QUICK_REPLIES.map((reply) => (
              <button
                key={reply}
                type="button"
                onClick={() => {
                  setInput(reply);
                  textareaRef.current?.focus();
                }}
                className="shrink-0 rounded-full border border-[#e7e8e4] bg-white px-3 py-1.5 text-[11px] font-medium text-[#11201b] transition hover:bg-[#ffffff]"
              >
                {reply}
              </button>
            ))}
          </div>
        </div>
      ) : null}

      <div className="shrink-0 border-t border-[#e7e8e4] bg-[#FFFFFF] px-4 py-3">
        <div className="flex items-end gap-2 rounded-[24px] border border-[#e7e8e4] bg-white px-3 py-2 shadow-sm focus-within:ring-2 focus-within:ring-[#D89216]">
          <button
            type="button"
            className="mb-1 inline-flex h-9 w-9 items-center justify-center rounded-full text-[#11201b] transition hover:bg-[#ffffff]"
          >
            <Paperclip size={17} />
          </button>

          <div className="relative flex-1">
            <textarea
              ref={textareaRef}
              rows={1}
              value={input}
              onChange={(event) => setInput(event.target.value)}
              onKeyDown={handleInputKeyDown}
              placeholder="Type a message"
              className="max-h-[120px] min-h-[24px] w-full resize-none overflow-y-auto bg-transparent pr-10 pt-[7px] text-sm leading-6 text-[#11201b] outline-none placeholder:text-[#72766f]"
            />
          </div>

          <AnimatePresence mode="wait" initial={false}>
            <motion.button
              key={input.trim() ? "active" : "idle"}
              type="button"
              onClick={handleSend}
              disabled={!input.trim()}
              initial={{ scale: 0.9, opacity: 0.8 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0.8 }}
              transition={{ duration: 0.18, ease }}
              className={`mb-1 inline-flex h-10 w-10 items-center justify-center rounded-full transition ${
                input.trim()
                  ? "bg-gradient-to-br from-[#11201b] to-[#D89216] text-white shadow-md"
                  : "bg-[#D89216] text-[#72766f]"
              }`}
            >
              <Send size={16} />
            </motion.button>
          </AnimatePresence>
        </div>
      </div>
    </div>
    );
  }

  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            border: "1px solid #D89216",
            background: "#FFFFFF",
            color: "#11201b",
          },
        }}
      />

      <div className="fixed inset-0 h-dvh overflow-hidden bg-[radial-gradient(circle_at_top_left,rgba(17,32,27,0.18),rgba(216,146,22,0.12)_28%),linear-gradient(180deg,#ffffff_0%,#ffffff_100%)]">
        <div className="h-full overflow-hidden p-2 md:p-3">
          <div className="grid h-full min-h-0 overflow-hidden rounded-[28px] border border-[#e7e8e4] bg-white shadow-[0_18px_55px_rgba(17,32,27,0.12)] md:grid-cols-[360px_minmax(0,1fr)]">
            <div className="h-full min-h-0 md:block">{renderListPanel()}</div>

            <div className="relative hidden h-full min-h-0 md:block">
              {!isConnected ? (
                <div className="absolute right-4 top-4 z-10 rounded-full bg-[#ffffff] px-3 py-1 text-xs font-semibold text-[#11201b]">
                  Reconnecting...
                </div>
              ) : null}
              {isThreadLoading ? (
                <div className="flex h-full items-center justify-center text-sm text-[#72766f]">
                  Loading conversation...
                </div>
              ) : (
                renderChatPanel()
              )}
            </div>

            <div className="relative h-full min-h-0 md:hidden">
              <AnimatePresence initial={false}>
                {!isMobileChatOpen || !selectedChat ? (
                  <motion.div
                    key="mobile-list"
                    initial={{ x: 0, opacity: 1 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -40, opacity: 0 }}
                    transition={{ duration: 0.26, ease }}
                    className="absolute inset-0 min-h-0"
                  >
                    {renderListPanel()}
                  </motion.div>
                ) : null}

                {isMobileChatOpen && selectedChat ? (
                  <motion.div
                    key="mobile-chat"
                    initial={{ x: "100%" }}
                    animate={{ x: 0 }}
                    exit={{ x: "100%" }}
                    transition={{ duration: 0.32, ease }}
                    className="absolute inset-0 z-20 min-h-0 bg-white"
                  >
                    {isThreadLoading ? (
                      <div className="flex h-full items-center justify-center text-sm text-[#72766f]">
                        Loading conversation...
                      </div>
                    ) : (
                      renderChatPanel()
                    )}
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
