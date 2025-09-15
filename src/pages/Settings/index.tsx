import SettingItem from "../../components/settings/SettingItem";
import { SVGProps } from "react";
import { BellIcon, CalendarNoteIcon, FingerprintIcon, GlobeIcon, InfoIcon, LogoutIcon, ShieldIcon } from "../../icons/Icons";

export default function Settings() {
  return (
    <div className="pb-28">
      {/* Title */}
      <header className="pt-2 pb-3">
        <h1 className="text-2xl font-extrabold text-white">Settings</h1>
      </header>

      <div className="space-y-4">
        <SettingItem
          to="/settings/time-zones"
          title="Time Zones"
          subtitle="Select your time zone"
          icon={<GlobeIcon className="w-7 h-7 text-[#1F66D1]" />}
        />

        <SettingItem
          to="/settings/notifications"
          title="Notifications"
          subtitle="Select notifications availability"
          icon={<BellIcon className="w-7 h-7 text-[#1F66D1]" />}
        />

        <SettingItem
          to="/settings/license"
          title="License"
          subtitle="View your license information"
          icon={<InfoIcon className="w-7 h-7 text-[#1F66D1]" />}
        />

        <SettingItem
          to="/settings/2fa"
          title="2-Factor Authentication"
          subtitle="Add an extra layer of security to your account"
          icon={<ShieldIcon className="w-7 h-7 text-[#1F66D1]" />}
        />

        <SettingItem
          to="/settings/reminders"
          title="Reminders and Calendar"
          subtitle="Sync your to-do’s with your phone"
          icon={<CalendarNoteIcon className="w-7 h-7 text-[#1F66D1]" />}
        />

        <SettingItem
          to="/settings/fingerprint"
          title="Fingerprint"
          subtitle="Enable secure login with your fingerprint"
          icon={<FingerprintIcon className="w-7 h-7 text-[#1F66D1]" />}
        />
      </div>

      {/* Logout */}
      <div className="py-8 flex justify-center">
        <button className="inline-flex items-center gap-2 text-red-500 text-xl">
          Logout
          <LogoutIcon className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}
