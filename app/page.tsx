"use client";

import { useState } from "react";

export default function ValentineCard() {
  const [name, setName] = useState("");
  const [showConfession, setShowConfession] = useState(false);
  const [yesClicked, setYesClicked] = useState(false);
  const [noPopup, setNoPopup] = useState(false);

  const handleYes = () => {
    setYesClicked(true);
    // Trigger confetti
    triggerConfetti();
  };

  const triggerConfetti = () => {
    if (typeof window === "undefined") return;

    // Create confetti pieces
    for (let i = 0; i < 100; i++) {
      const confettiPiece = document.createElement("div");
      confettiPiece.style.position = "fixed";
      confettiPiece.style.width = "10px";
      confettiPiece.style.height = "10px";
      confettiPiece.style.backgroundColor = [
        "#FF1493",
        "#FFB6C1",
        "#FFC0CB",
        "#FF69B4",
        "#FF6347",
      ][Math.floor(Math.random() * 5)];
      confettiPiece.style.left = Math.random() * window.innerWidth + "px";
      confettiPiece.style.top = "-10px";
      confettiPiece.style.borderRadius = "50%";
      confettiPiece.style.zIndex = "9999";
      confettiPiece.style.pointerEvents = "none";
      document.body.appendChild(confettiPiece);

      const randomX = (Math.random() - 0.5) * 400;
      const randomDuration = 2 + Math.random() * 1;

      const keyframes = `
        @keyframes fall-${i} {
          0% {
            transform: translateY(0) translateX(0) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(${window.innerHeight + 100}px) translateX(${randomX}px) rotate(360deg);
            opacity: 0;
          }
        }
      `;
      const style = document.createElement("style");
      style.innerHTML = keyframes;
      document.head.appendChild(style);

      confettiPiece.style.animation = `fall-${i} ${randomDuration}s linear forwards`;

      setTimeout(() => confettiPiece.remove(), randomDuration * 1000);
    }
  };

  const handleNo = () => {
    setNoPopup(true);
    setTimeout(() => setNoPopup(false), 3000);
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-pink-200 via-red-100 to-pink-300 flex items-center justify-center p-4">
      {/* Main Card */}
      <div className="max-w-md w-full">
        {!showConfession ? (
          // Name Input Screen
          <div className="bg-white rounded-3xl shadow-2xl p-8 text-center animate-bounce-in">
            <div className="text-5xl mb-6">💕</div>
            <h1 className="text-2xl font-bold text-pink-600 mb-4">
              Valentine&apos;s Day
            </h1>
            <p className="text-gray-600 mb-6">
              Enter your name to start the magic ✨
            </p>
            <input
              type="text"
              placeholder="Your name..."
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 border-2 border-pink-300 rounded-2xl focus:outline-none focus:border-pink-500 mb-4 text-center font-semibold"
            />
            <button
              onClick={() => name.trim() && setShowConfession(true)}
              disabled={!name.trim()}
              className="w-full bg-linear-to-r from-pink-500 to-red-500 text-white font-bold py-3 px-4 rounded-2xl hover:shadow-lg transition transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Continue 💝
            </button>
          </div>
        ) : !yesClicked ? (
          // Valentine Question Screen
          <div className="bg-white rounded-3xl shadow-2xl p-8 text-center animate-fade-in">
            <div className="text-6xl mb-6 animate-pulse">💘</div>
            <h1 className="text-3xl font-bold text-pink-600 mb-2">{name},</h1>
            <h2 className="text-2xl font-bold text-red-500 mb-8">
              Will you be my Valentine?
            </h2>

            {/* No Popup */}
            {noPopup && (
              <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-red-500 text-white px-6 py-4 rounded-full text-lg font-bold shadow-2xl animate-bounce z-50">
                ❌ You cannot click No!
              </div>
            )}

            <div className="flex gap-4">
              <button
                onClick={handleYes}
                className="flex-1 bg-linear-to-r from-green-400 to-green-500 text-white font-bold py-4 px-4 rounded-2xl hover:shadow-lg transition transform hover:scale-110 text-xl"
              >
                Yes! 💚
              </button>
              <button
                onClick={handleNo}
                className="flex-1 bg-linear-to-r from-gray-400 to-gray-500 text-white font-bold py-4 px-4 rounded-2xl hover:shadow-lg transition transform hover:scale-105 text-xl cursor-not-allowed opacity-70"
                disabled
              >
                No ❌
              </button>
            </div>
          </div>
        ) : (
          // Yes! Success Screen
          <div className="bg-white rounded-3xl shadow-2xl p-8 text-center animate-fade-in">
            <div className="text-7xl mb-6 animate-bounce">🎉</div>
            <h1 className="text-4xl font-bold text-pink-600 mb-4">Yes! 💕</h1>
            <p className="text-2xl text-red-500 font-bold mb-6">
              {name}, you just made me the happiest! 🥰
            </p>
            <div className="text-6xl mb-6">💑✨</div>
            <p className="text-gray-600 text-lg mb-8">
              This is going to be the best Valentine&apos;s Day ever! 🌹
            </p>
            <button
              onClick={() => {
                setYesClicked(false);
                setShowConfession(false);
                setName("");
              }}
              className="w-full bg-linear-to-r from-pink-500 to-red-500 text-white font-bold py-3 px-4 rounded-2xl hover:shadow-lg transition transform hover:scale-105"
            >
              Reset 🔄
            </button>
          </div>
        )}
      </div>

      {/* Floating hearts background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-10 left-10 text-4xl animate-float">💕</div>
        <div className="absolute top-20 right-20 text-3xl animate-float-delay">
          💖
        </div>
        <div className="absolute bottom-20 left-1/4 text-3xl animate-float-delay-2">
          💗
        </div>
        <div className="absolute bottom-10 right-1/4 text-4xl animate-float">
          💝
        </div>
      </div>

      {/* Custom animations */}
      <style jsx>{`
        @keyframes bounce-in {
          0% {
            opacity: 0;
            transform: scale(0.8);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }
        @keyframes fade-in {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }
        .animate-bounce-in {
          animation: bounce-in 0.5s ease-out;
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        .animate-float-delay {
          animation: float 3s ease-in-out 1s infinite;
        }
        .animate-float-delay-2 {
          animation: float 3s ease-in-out 2s infinite;
        }
      `}</style>
    </div>
  );
}
