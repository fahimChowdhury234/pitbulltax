import SupportCard from "../../components/SupportCard";
import { SVGProps } from "react";
import {
  NewTicketIcon,
  TicketListIcon,
  FAQIcon,
  WhatsAppIcon,
} from "../../icons/Icons";

export default function Support() {
  return (
    <div className=" pb-28">
      {/* Title */}
      <header className="pt-2 pb-4">
        <h1 className="text-2xl font-extrabold text-white">Support</h1>
      </header>

      <div className="space-y-4">
        <SupportCard
          to="/support/new-ticket"
          title="New Ticket"
          subtitle="Create a new support request"
          icon={<NewTicketIcon className="w-8 h-8 text-[#1F66D1]" />}
        />

        <SupportCard
          to="/support/tickets"
          title="Ticket List"
          subtitle="View and track the status of your tickets"
          icon={<TicketListIcon className="w-8 h-8 text-[#1F66D1]" />}
          badge={1}
        />

        <SupportCard
          to="/support/faqs"
          title="FAQs"
          subtitle="Find quick answers to common questions"
          icon={<FAQIcon className="w-8 h-8 text-[#1F66D1]" />}
        />

        <SupportCard
          to="/support/whatsapp"
          title="WhatsApp"
          subtitle="Chat with our team for live assistance via WhatsApp"
          icon={<WhatsAppIcon className="w-8 h-8 text-[#25D366]" />}
        />
      </div>
    </div>
  );
}
