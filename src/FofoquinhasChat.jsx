import React, { useEffect, useMemo, useRef, useState } from "react"; import { motion, AnimatePresence } from "framer-motion"; import { Play, Pause, RotateCcw, Volume2, VolumeX, Smartphone, Sparkles, MessageCircle } from "lucide-react";

// ========================= // Helper types // =========================

type Msg = { id: string; from: "me" | "other"; text?: string; media?: { type: "image" | "audio" | "video"; src: string }; delay?: number; // ms until this message appears after previous };

// ========================= // Demo script — edite aqui! // =========================

const SCRIPT: Msg[] = [ { id: "m1", from: "other", text: "Amiga, tu viu a fofoca de hoje? ", delay: 600 }, { id: "m2", from: "me", text: "Qual delas? 😂", delay: 900 }, { id: "m3", from: "other", text: "A do casal que reatou 🔥", delay: 900 }, { id: "m4", from: "me", text: "Me conta TUDO!", delay: 1100 }, { id: "m5", from: "other", text: "Vazou áudio 👀 (mas calma que eu explico)" , delay: 1000}, { id: "m6", from: "other", text: "Resumo em 15s e vc tira suas conclusões…", delay: 1200}, ];

// ========================= // Branding configurável // =========================

const BRAND = { name: "TikTok Fofoquinhas", handle: "@fofoquinhas", primary: "#10b981", // emerald-500 accent: "#f472b6", // pink-400 watermarkOpacity: 0.12, };

// ========================= // UI Components // =========================

function PhoneFrame({ children }: { children: React.ReactNode }) { return ( <div className="mx-auto max-w-[380px] p-4"> <div className="relative mx-auto aspect-[9/19] w-full rounded-[3rem] bg-neutral-900 shadow-2xl ring-4 ring-black/60"> {/* Notch /} <div className="absolute left-1/2 top-0 z-10 h-6 w-36 -translate-x-1/2 rounded-b-2xl bg-black" /> {/ Screen */} <div className="absolute inset-1.5 overflow-hidden rounded-[2.4rem] bg-gradient-to-b from-neutral-900 to-neutral-800"> {children} </div> </div> </div> ); }

function HeaderBar() { return ( <div className="relative z-10 flex items-center gap-3 border-b border-white/5 bg-black/30 px-4 py-3 backdrop-blur"> <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10"> <MessageCircle className="h-5 w-5" /> </div> <div className="flex-1"> <div className="text-sm font-semibold tracking-wide text-white/90"> {BRAND.name} </div> <div className="text-[11px] text-white/50">Fofoquinha do dia 💅</div> </div> <div className="rounded-full bg-emerald-500/20 px-3 py-1 text-[10px] font-medium text-emerald-300 ring-1 ring-emerald-400/30"> Original </div> </div> ); }

function Watermark() { return ( <div
className="pointer-events-none absolute inset-0 select-none"
aria-hidden
> <div className="absolute -right-10 bottom-6 -rotate-12 text-4xl font-black tracking-tight" style={{ color: BRAND.accent, opacity: BRAND.watermarkOpacity, textShadow: "0 2px 20px rgba(255,255,255,0.06)", }} > {BRAND.name} </div> <div className="absolute left-4 bottom-4 text-[10px] uppercase tracking-widest text-white/40"> {BRAND.handle} </div> </div> ); }

function TypingDots() { return ( <div className="flex items-center gap-1"> <span className="sr-only">digitando…</span> <motion.span className="inline-block h-1.5 w-1.5 rounded-full bg-white/70" animate={{ y: [0, -3, 0] }} transition={{ repeat: Infinity, duration: 0.9 }} /> <motion.span className="inline-block h-1.5 w-1.5 rounded-full bg-white/70" animate={{ y: [0, -3, 0] }} transition={{ repeat: Infinity, duration: 0.9, delay: 0.15 }} /> <motion.span className="inline-block h-1.5 w-1.5 rounded-full bg-white/70" animate={{ y: [0, -3, 0] }} transition={{ repeat: Infinity, duration: 0.9, delay: 0.3 }} /> </div> ); }

function ChatBubble({ from, children }: { from: Msg["from"]; children: React.ReactNode }) { const base = "max-w-[78%] rounded-2xl px-3.5 py-2 text-[13px] leading-snug shadow/20"; const me = "ml-auto bg-emerald-600 text-white shadow-[0_6px_20px_rgba(16,185,129,0.3)]"; const other = "mr-auto bg-white/10 text-white/90 backdrop-blur";

return ( <motion.div initial={{ opacity: 0, y: 20, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ type: "spring", stiffness: 320, damping: 26 }} className={relative mb-2 ${base} ${from === "me" ? me : other}} > {children} </motion.div> ); }

function ToolRibbon() { return ( <div className="pointer-events-none absolute inset-x-0 top-10 mx-auto w-[92%]"> <div className="pointer-events-auto flex items-center justify-between rounded-2xl border border-white/10 bg-black/30 px-3 py-2 text-[11px] text-white/70 backdrop-blur"> <div className="flex items-center gap-1.5"> <Smartphone className="h-3.5 w-3.5" /> <span>Layout exclusivo</span> </div> <div className="flex items-center gap-1.5"> <Sparkles className="h-3.5 w-3.5" /> <span>Edição + animação</span> </div> <div className="flex items-center gap-1.5"> <MessageCircle className="h-3.5 w-3.5" /> <span>Conteúdo original</span> </div> </div> </div> ); }

function Controls({ playing, toggle, reset, muted, toggleMute }: any) { return ( <div className="flex items-center justify-center gap-3 border-t border-white/5 bg-black/30 px-4 py-3"> <button
onClick={toggle}
className="flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-white ring-1 ring-white/15 hover:bg-white/10"
> {playing ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />} {playing ? "Pausar" : "Reproduzir"} </button> <button
onClick={reset}
className="flex items-center gap-2 rounded-full px-3 py-2 text-sm text-white/80 ring-1 ring-white/15 hover:bg-white/10"
> <RotateCcw className="h-4 w-4" /> Reiniciar </button> <button
onClick={toggleMute}
className="ml-auto flex items-center gap-2 rounded-full px-3 py-2 text-sm text-white/80 ring-1 ring-white/15 hover:bg-white/10"
> {muted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />} {muted ? "Mudo" : "Som"} </button> </div> ); }

// ========================= // Main component // =========================

export default function FofoquinhasChat() { const [index, setIndex] = useState(0); // how many messages are shown const [playing, setPlaying] = useState(true); const [muted, setMuted] = useState(true); const audioRef = useRef<HTMLAudioElement | null>(null); const containerRef = useRef<HTMLDivElement | null>(null);

const sequence = useMemo(() => SCRIPT, []);

useEffect(() => { if (!playing || index >= sequence.length) return;

const delay = sequence[index]?.delay ?? 900;
const t = setTimeout(() => setIndex((i) => i + 1), delay);
return () => clearTimeout(t);

}, [index, playing, sequence]);

useEffect(() => { if (!containerRef.current) return; containerRef.current.scrollTo({ top: containerRef.current.scrollHeight, behavior: "smooth" }); }, [index]);

useEffect(() => { if (!muted) { audioRef.current?.play().catch(() => {}); } else { audioRef.current?.pause(); } }, [muted]);

const toggle = () => setPlaying((p) => !p); const reset = () => setIndex(0);

const visible = sequence.slice(0, index); const next = sequence[index];

return ( <div className="min-h-screen w-full bg-neutral-950 text-white/90"> <div className="mx-auto max-w-5xl px-4 py-8"> <h1 className="mb-2 text-center text-2xl font-black tracking-tight"> {BRAND.name} <span className="text-white/50 text-base font-semibold">— modelo WhatsApp</span> </h1> <p className="mb-6 text-center text-sm text-white/60"> Edite o <code>SCRIPT</code> no topo do arquivo para gerar conversas animadas e gravar sua tela. </p>

<PhoneFrame>
      <div className="flex h-full flex-col">
        <HeaderBar />
        <ToolRibbon />

        {/* Chat area */}
        <div ref={containerRef} className="relative flex-1 space-y-1 overflow-y-auto px-3 py-3">
          <Watermark />

          <AnimatePresence initial={false}>
            {visible.map((m) => (
              <ChatBubble key={m.id} from={m.from}>
                {m.text}
              </ChatBubble>
            ))}
          </AnimatePresence>

          {/* Typing indicator for the next message */}
          <AnimatePresence>
            {playing && next ? (
              <motion.div
                key="typing"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="mr-auto w-fit rounded-2xl bg-white/10 px-3.5 py-2 backdrop-blur"
              >
                <TypingDots />
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>

        <Controls
          playing={playing}
          toggle={toggle}
          reset={reset}
          muted={muted}
          toggleMute={() => setMuted((m) => !m)}
        />
      </div>

      {/* Tiny ambient beat just para dar vida. Substitua por sua trilha. */}
      <audio ref={audioRef} loop src="https://cdn.pixabay.com/audio/2022/03/15/audio_0a9c0f2d2e.mp3" />
    </PhoneFrame>

    {/* Guia rápido */}
    <div className="mx-auto mt-6 max-w-[380px] text-xs text-white/60">
      <ul className="list-disc space-y-1 pl-5">
        <li>Troque <span className="font-semibold text-white/80">BRAND.name</span> e <span className="font-semibold text-white/80">BRAND.handle</span> para sua marca.</li>
        <li>Edite as falas no array <span className="font-semibold text-white/80">SCRIPT</span>. Cada item aceita <code>from</code>, <code>text</code> e <code>delay</code>.</li>
        <li>Grave a tela em 1080×1920 (ou 720×1280). O layout já tem moldura, watermark e selo “Original”.</li>
        <li>Depois, no TikTok, adicione a música oficial e legendas. Evite postar o vídeo cru sem cortes.</li>
      </ul>
    </div>
  </div>
</div>

); }