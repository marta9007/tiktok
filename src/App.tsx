// App.tsx
import React from "react";
import "./App.css";
import videoFofoquinha from "./assets/video-whatsapp.mp4";

const App: React.FC = () => {
  return (
    <div className="video-container">
      {/* Banner da marca */}
      <div className="brand-banner">
        TikTok Fofoquinhas
      </div>

      {/* Vídeo principal */}
      <video className="main-video" src={videoFofoquinha} controls autoPlay loop />

      {/* Balão de mensagem animado */}
      <div className="message-bubble">
        Olha a conversa!
      </div>
    </div>
  );
};

export default App;