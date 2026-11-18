import React, { useEffect, useState } from "react";
import { TbMail, TbTrash, TbCheck, TbUsers } from "react-icons/tb";
import { useAdmin } from "../useAdmin";
import { api } from "../../api/client";
import { Button, Card, EmptyState, inputCls } from "../components/ui";
import { formatDateTime } from "../data/adminData";

const TABS = [
  { key: "messages", label: "Contact messages", icon: TbMail },
  { key: "subscribers", label: "Newsletter", icon: TbUsers },
];

const AdminMessages = () => {
  const { notify } = useAdmin();
  const [tab, setTab] = useState("messages");
  const [messages, setMessages] = useState([]);
  const [subs, setSubs] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    try {
      const [m, s] = await Promise.all([api.messages.list(), api.subscribers.list()]);
      setMessages(m);
      setSubs(s);
    } catch (cause) {
      notify(cause.message, "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const markRead = async (message) => {
    if (message.read) return;
    await api.messages.setRead(message.id, true);
    setMessages((prev) =>
      prev.map((m) => (m.id === message.id ? { ...m, read: true } : m))
    );
  };

  const removeMessage = async (message) => {
    await api.messages.remove(message.id);
    setMessages((prev) => prev.filter((m) => m.id !== message.id));
    notify("Message deleted", "info");
  };

  const unread = messages.filter((m) => !m.read).length;
  const term = query.trim().toLowerCase();
  const visibleSubs = subs.filter(
    (s) => !term || s.email.toLowerCase().includes(term)
  );

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="text-[22px] sm:text-[26px] font-extrabold text-slate-900">
            Inbox
          </h2>
          <p className="text-[13px] text-slate-500 mt-1">
            {unread} unread message{unread === 1 ? "" : "s"} · {subs.length}{" "}
            newsletter subscriber{subs.length === 1 ? "" : "s"}
          </p>
        </div>
        <div className="flex gap-2">
          {TABS.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setTab(key)}
              className={`inline-flex items-center gap-1.5 h-9 px-3.5 rounded-xl text-[12.5px] font-bold transition ${
                tab === key
                  ? "bg-slate-900 text-white"
                  : "bg-white border border-slate-200 text-slate-600 hover:border-slate-300"
              }`}
            >
              <Icon className="text-[15px]" /> {label}
            </button>
          ))}
        </div>
      </div>

      {tab === "subscribers" && (
        <Card className="p-4">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search subscribers by email…"
            className={inputCls}
          />
        </Card>
      )}

      <Card className="overflow-hidden">
        {loading ? (
          <p className="py-14 text-center text-[13px] text-slate-400">
            Loading…
          </p>
        ) : tab === "messages" ? (
          messages.length === 0 ? (
            <EmptyState
              icon={<TbMail />}
              title="No messages yet"
              message="Contact form submissions will appear here."
            />
          ) : (
            <div className="divide-y divide-slate-100">
              {messages.map((message) => (
                <div
                  key={message.id}
                  onClick={() => markRead(message)}
                  className={`px-5 py-4 cursor-pointer transition hover:bg-slate-50/70 ${
                    message.read ? "" : "bg-rose-50/40"
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0 flex-1">
                      <p className="text-[13.5px] font-bold text-slate-900">
                        {!message.read && (
                          <span className="inline-block w-2 h-2 rounded-full bg-rose-500 mr-2 align-middle" />
                        )}
                        {message.subject}
                      </p>
                      <p className="text-[12px] text-slate-500 mt-0.5 truncate">
                        {message.name} · {message.email}
                      </p>
                      <p className="text-[12.5px] text-slate-600 mt-1.5 whitespace-pre-wrap">
                        {message.message}
                      </p>
                      <p className="text-[11px] text-slate-400 mt-1.5">
                        {formatDateTime(message.createdAt)}
                      </p>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        removeMessage(message);
                      }}
                      className="w-8 h-8 rounded-lg text-slate-400 hover:bg-rose-50 hover:text-rose-600 flex items-center justify-center transition shrink-0"
                      aria-label="Delete message"
                    >
                      <TbTrash className="text-[15px]" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )
        ) : visibleSubs.length === 0 ? (
          <EmptyState
            icon={<TbUsers />}
            title="No subscribers found"
            message="Newsletter signups from the storefront footer appear here."
          />
        ) : (
          <table className="w-full text-left text-[12.5px]">
            <thead>
              <tr className="text-[10.5px] uppercase tracking-wider text-slate-400 bg-slate-50/70">
                <th className="px-5 py-3 font-extrabold">Email</th>
                <th className="px-4 py-3 font-extrabold hidden sm:table-cell">Source</th>
                <th className="px-4 py-3 font-extrabold">Subscribed</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {visibleSubs.map((sub) => (
                <tr key={sub.id} className="hover:bg-slate-50/70">
                  <td className="px-5 py-3 font-semibold text-slate-800">
                    {sub.email}
                  </td>
                  <td className="px-4 py-3 text-slate-500 hidden sm:table-cell">
                    {sub.source}
                  </td>
                  <td className="px-4 py-3 text-slate-500">
                    {formatDateTime(sub.createdAt)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </Card>
    </div>
  );
};

export default AdminMessages;
