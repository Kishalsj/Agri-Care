import { Fragment } from "react";

import ContactSupportMessage from "@/components/sections/client-dashboard/contact-support/ContactSupportMessage";

export default function ContactSupportMessageList({ children, messages }) {
  console.log(messages);
  return (
    <div id="message-list" className="text-center w-full">
      <div className="w-full text-start flex flex-col h-[200px] sm:h-[400px] overflow-y-auto rounded-t-2xl space-y-2">
        {messages.length > 0 ? (
          messages.map((message, index) => (
            <Fragment key={message.id}>
              {message && message.replies && Array.isArray(message.replies) && message.replies.length > 0 &&
                message.replies.map((message) => (
                  <ContactSupportMessage
                    key={message?.id}
                    content={message?.reply_content}
                    createdAt={message?.reply_created_at}
                    isUserMessage={false} // Assuming admin replies are on the left side
                  />
                ))}
              <ContactSupportMessage
                key={message?.id}
                content={message?.message_content}
                createdAt={message?.message_created_at}
                isUserMessage={true} // Assuming user messages are on the right side
              />
            </Fragment>
          ))
        ) : (
          <ContactSupportMessage
            key="initial-message"
            content="We're here to help and answer any question you might have. We look forward to hearing from you."
            isUserMessage={false}
          />
        )}
        {children}
      </div>
    </div>
  );
}
