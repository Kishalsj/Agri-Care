import formatDate from "@/utils/format-date";

export default function ContactSupportMessage({
  content,
  createdAt,
  isUserMessage,
}) {
  const messageStyle = isUserMessage
    ? "self-end bg-[#1893f8] text-white"
    : "self-start bg-[#002248]";

  return (
    <div
      className={`flex flex-col p-5 mx-4 rounded-2xl max-w-md text-white shadow ${messageStyle}`}
    >
      <div>{content}</div>
      <div className="flex text-[12px] flex-row gap-3">
        <span>{isUserMessage === true ? "me" : "checkins.ai support"}</span>
        {createdAt && (
          <span suppressHydrationWarning={true}>{formatDate(createdAt)}</span>
        )}
      </div>
    </div>
  );
}
