import { useEffect, useRef, useState } from "react";
import { Monitor, Tablet, Smartphone, RotateCcw, ExternalLink } from "lucide-react";
import type { PortfolioProject } from "../../content/portfolio";
import { cn } from "../utils/cn";

const devices = [
  { id: "desktop", label: "Desktop", width: 1440, height: 900, icon: Monitor },
  { id: "tablet", label: "Tablet", width: 768, height: 1024, icon: Tablet },
  { id: "mobile", label: "Celular", width: 390, height: 844, icon: Smartphone },
] as const;

export function TemplatePreview({ project }: { project: PortfolioProject }) {
  const [deviceId, setDeviceId] = useState<string>("desktop");
  const [availableWidth, setAvailableWidth] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [revision, setRevision] = useState(0);
  const holder = useRef<HTMLDivElement>(null);
  const device = devices.find(entry => entry.id === deviceId)!;
  const scale = Math.min(1, availableWidth / device.width, 640 / device.height);

  useEffect(() => {
    const element = holder.current;
    if (!element) return;
    const observer = new ResizeObserver(([entry]) => setAvailableWidth(entry.contentRect.width));
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 bg-graphite px-3 py-2">
        <div className="flex gap-1" role="group" aria-label="Tamanho da prévia">
          {devices.map(({ id, label, icon: Icon }) => (
            <button key={id} type="button" aria-pressed={deviceId === id} onClick={() => setDeviceId(id)}
              className={cn("flex min-h-10 items-center gap-2 rounded-md px-2.5 text-xs font-medium transition focus-visible:outline-2 focus-visible:outline-electric-light", deviceId === id ? "bg-electric/15 text-electric-light" : "text-muted hover:bg-white/5 hover:text-ink")}>
              <Icon size={15} aria-hidden="true" />{label}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <button type="button" aria-label="Recarregar prévia" onClick={() => { setLoaded(false); setRevision(value => value + 1); }}
            className="grid h-10 w-10 place-items-center rounded-md text-muted transition hover:bg-white/5 hover:text-ink focus-visible:outline-2 focus-visible:outline-electric-light">
            <RotateCcw size={15} aria-hidden="true" />
          </button>
          <a href={project.previewUrl} target="_blank" rel="noreferrer" aria-label="Abrir prévia em nova aba"
            className="grid h-10 w-10 place-items-center rounded-md text-muted transition hover:bg-white/5 hover:text-ink focus-visible:outline-2 focus-visible:outline-electric-light">
            <ExternalLink size={15} aria-hidden="true" />
          </a>
        </div>
      </div>
      <div ref={holder} className="relative flex justify-center overflow-hidden bg-[#111319]" aria-busy={!loaded}>
        {!loaded && <div role="status" className="absolute inset-0 z-10 grid place-items-center bg-graphite text-sm text-soft pointer-events-none">Carregando prévia…</div>}
        <div className="relative shrink-0 overflow-hidden bg-white" style={{ width: device.width * scale, height: device.height * scale }}>
          <iframe key={revision} src={project.previewUrl} title={`Prévia interativa de ${project.name}`} loading="lazy"
            sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox"
            onLoad={() => setLoaded(true)}
            className="absolute left-0 top-0 block origin-top-left border-0"
            style={{ width: device.width, height: device.height, transform: `scale(${scale})` }} />
        </div>
      </div>
      <div className="flex flex-wrap items-center justify-between gap-2 border-t border-white/10 px-4 py-2 text-[11px] text-muted">
        <span>Prévia interativa · navegue e role dentro do site</span>
        <span className="font-mono">{device.width} × {device.height}</span>
      </div>
    </div>
  );
}
