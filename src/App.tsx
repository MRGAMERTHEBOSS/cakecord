import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HomeView from "./components/HomeView";
import PremiumView from "./components/PremiumView";
import CommandsView from "./components/CommandsView";
import TeamView from "./components/TeamView";
import ChangelogView from "./components/ChangelogView";
import SupportView from "./components/SupportView";
import DashboardView from "./components/DashboardView";
import PrivacyView from "./components/PrivacyView";
import TermsView from "./components/TermsView";

export default function App() {
  const [activeTab, setActiveTab] = useState<string>("home");
  const [isPremiumUnlocked, setIsPremiumUnlocked] = useState<boolean>(false);

  const handleUnlockPremium = () => {
    setIsPremiumUnlocked(true);
  };

  const handleInviteRedirect = () => {
    window.location.href = "https://discord.com/oauth2/authorize?client_id=1505549918436069477&permissions=139855252544&scope=bot%20applications.commands";
  };

  return (
    <div className="min-h-screen bg-[#030303] text-[#f4f4f5] antialiased relative flex flex-col justify-between overflow-x-hidden">
      
      {/* Dynamic Grid Background with Ambient Glow Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute inset-0 grid-bg opacity-50" />
        {/* Layered Ambient Glow Orbs (Blue, Purple, Pink) */}
        <div className="absolute top-[-10%] left-[-15%] w-[60%] h-[60%] rounded-full bg-blue-500/10 blur-[130px] opacity-80" />
        <div className="absolute top-[25%] right-[-15%] w-[50%] h-[50%] rounded-full bg-purple-600/8 blur-[140px] opacity-70" />
        <div className="absolute bottom-[15%] left-[10%] w-[45%] h-[45%] rounded-full bg-pink-500/6 blur-[120px] opacity-60" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[55%] h-[55%] rounded-full bg-blue-600/10 blur-[140px] opacity-80" />
        {/* Radial mask to blend edges smoothly */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_center,transparent_0%,rgba(3,3,3,0.3)_40%,#030303_85%)]" />
      </div>
      
      {/* Floating Header */}
      <Navbar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onInviteClick={handleInviteRedirect}
      />

      {/* Main Body Section */}
      <main className="relative flex-1 pt-24 md:pt-28 pb-12">
        {activeTab === "home" && (
          <HomeView
            onTabChange={setActiveTab}
            onInviteClick={handleInviteRedirect}
          />
        )}

        {activeTab === "premium" && (
          <PremiumView
            isPremiumUnlocked={isPremiumUnlocked}
            onUnlockPremium={handleUnlockPremium}
          />
        )}

        {activeTab === "commands" && <CommandsView />}

        {activeTab === "team" && <TeamView />}

        {activeTab === "changelog" && <ChangelogView />}

        {activeTab === "support" && <SupportView />}

        {activeTab === "dashboard" && (
          <DashboardView
            isPremiumUnlocked={isPremiumUnlocked}
            onUnlockPremium={handleUnlockPremium}
          />
        )}

        {activeTab === "privacy" && <PrivacyView />}

        {activeTab === "terms" && <TermsView />}
      </main>

      {/* Corporate footer */}
      <Footer onTabChange={setActiveTab} />

    </div>
  );
}
