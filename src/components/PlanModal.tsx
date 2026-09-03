import { useEffect, useId, useMemo, useRef, useState } from "react";
import { ArrowUpRight, Check, X } from "lucide-react";
import { plans, type Plan } from "../content/site";
import { buildWhatsAppLink } from "../lib/whatsapp";

type PlanModalProps = {
  plan: Plan | null;
  onClose: () => void;
  onChangePlan?: (plan: Plan) => void;
};

function getDisplayPrice(basePriceStr: string, hasContentPanel: boolean, hasCare: boolean) {
  const match = basePriceStr.match(/(\d+\.?\d*)/);
  if (!match) return basePriceStr;

  const baseNumber = parseInt(match[1].replace(/\./g, ""), 10);
  const upfrontTotal = baseNumber + (hasContentPanel ? 300 : 0);
  
  const prefix = basePriceStr.includes("A partir de") ? "A partir de " : "";
  const formattedUpfront = `R$ ${upfrontTotal.toLocaleString('pt-BR')}`;
  
  let result = `${prefix}${formattedUpfront}`;
  if (hasCare) {
    result += " + R$ 99/mês";
  }
  
  return result;
}

export function PlanModal({ plan, onClose, onChangePlan }: PlanModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  const [contentPanel, setContentPanel] = useState(false);
  const [care, setCare] = useState(false);
  const [observation, setObservation] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (plan) {
      if (!dialog.open) dialog.showModal();
      document.documentElement.classList.add("modal-scroll-lock");
    } else {
      if (dialog.open) dialog.close();
      document.documentElement.classList.remove("modal-scroll-lock");
    }

    return () => {
      document.documentElement.classList.remove("modal-scroll-lock");
    };
  }, [plan]);

  const displayPrice = useMemo(() => {
    if (!plan) return "";
    return getDisplayPrice(plan.price, contentPanel, care);
  }, [plan, contentPanel, care]);

  const whatsapp = useMemo(() => {
    if (!plan) return null;

    return buildWhatsAppLink({
      plan: plan.name,
      price: displayPrice,
      contentPanel,
      care,
      observation,
      phoneNumber: import.meta.env.VITE_WHATSAPP_NUMBER,
    });
  }, [care, contentPanel, observation, plan, displayPrice]);

  const handleClose = () => {
    dialogRef.current?.close();
    document.documentElement.classList.remove("modal-scroll-lock");
    setContentPanel(false);
    setCare(false);
    setObservation("");
    setIsDropdownOpen(false);
    onClose();
  };

  return (
    <dialog
      ref={dialogRef}
      className="scrollbar-hide"
      aria-labelledby={titleId}
      onCancel={(event) => {
        event.preventDefault();
        handleClose();
      }}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) handleClose();
      }}
    >
      {plan ? (
        <div className="p-5 sm:p-7">
          <div className="flex items-start justify-between gap-5 border-b border-white/[0.08] pb-5">
            <div>
              <p className="font-mono text-[0.68rem] tracking-[0.1em] text-electric-light">
                CONFIGURE SEU PROJETO
              </p>
              <h2 id={titleId} className="mt-2 font-display text-3xl font-semibold tracking-[-0.045em] flex items-center gap-2">
                <span>Arche</span>
                <div 
                  className={`flex items-center rounded-lg border border-white/[0.08] transition-all duration-500 ease-out overflow-hidden ${
                    isDropdownOpen ? "bg-white/[0.04] p-1 gap-1" : "bg-white/[0.02] p-1 gap-0"
                  }`}
                >
                  {plans.map(p => {
                    const isSelected = p.id === plan.id;
                    const isVisible = isDropdownOpen || isSelected;
                    
                    return (
                      <button
                        key={p.id}
                        type="button"
                        onClick={() => { 
                           if (!isDropdownOpen) {
                              setIsDropdownOpen(true);
                           } else {
                              onChangePlan?.(p); 
                              setIsDropdownOpen(false); 
                           }
                        }}
                        className={`font-display text-2xl sm:text-3xl font-semibold rounded-md whitespace-nowrap transition-all duration-500 ease-out overflow-hidden flex items-center justify-center ${
                          isVisible 
                            ? "px-3 py-1 opacity-100 max-w-[200px]" 
                            : "px-0 py-1 opacity-0 max-w-0 border-none"
                        } ${
                          !isDropdownOpen && isSelected
                            ? "bg-white/[0.04] text-electric-light shadow-sm hover:bg-white/[0.08]"
                            : isDropdownOpen && isSelected
                              ? "bg-white/[0.08] text-ink shadow-sm"
                              : "text-muted hover:bg-white/[0.04] hover:text-ink"
                        }`}
                      >
                        {p.name.replace("Arche ", "")}
                      </button>
                    )
                  })}
                </div>
              </h2>
              <p className="mt-2 text-sm font-medium text-electric-light transition-all duration-300">
                {displayPrice}
              </p>
            </div>
            
            <button
              className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-white/[0.12] text-muted hover:border-white/25 hover:text-ink transition-colors"
              type="button"
              aria-label="Fechar configurador"
              onClick={handleClose}
            >
              <X aria-hidden="true" size={20} strokeWidth={1.7} />
            </button>
          </div>

          <div className="mt-6 space-y-3">
            <label className="checkbox-control">
              <input
                type="checkbox"
                checked={contentPanel}
                onChange={(event) => setContentPanel(event.target.checked)}
              />
              <span>
                <span className="block text-sm font-semibold text-ink">Painel de Conteúdo</span>
                <span className="mt-1 block text-sm leading-relaxed text-muted">
                  Edite textos, imagens e informações básicas.
                </span>
              </span>
              <span className="font-mono text-xs text-ink">+ R$ 300</span>
            </label>

            <label className="checkbox-control">
              <input
                type="checkbox"
                checked={care}
                onChange={(event) => setCare(event.target.checked)}
              />
              <span>
                <span className="block text-sm font-semibold text-ink">Arche Care</span>
                <span className="mt-1 block text-sm leading-relaxed text-muted">
                  Gestão e manutenção contínua após a publicação.
                </span>
              </span>
              <span className="font-mono text-xs text-ink">R$ 99/mês</span>
            </label>
          </div>

          <div className="mt-6">
            <label htmlFor="project-note" className="mb-2 block text-sm font-semibold text-ink">
              Conte um pouco sobre o projeto
            </label>
            <textarea
              id="project-note"
              className="field min-h-28"
              value={observation}
              onChange={(event) => setObservation(event.target.value)}
              placeholder="Exemplo: preciso apresentar meus serviços e receber pedidos pelo WhatsApp."
            />
          </div>

          <div className="mt-6 rounded-xl border border-white/[0.08] bg-obsidian p-4">
            <div className="flex items-center gap-2 text-sm font-semibold text-ink">
              <Check aria-hidden="true" size={17} strokeWidth={1.7} className="text-electric-light" />
              Sua mensagem já vai organizada
            </div>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              Plano, adicionais e observação serão enviados para iniciar uma conversa comercial.
            </p>
          </div>

          <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <button className="button button-secondary" type="button" onClick={handleClose}>
              Voltar
            </button>
            <a
              className="button button-primary"
              href={whatsapp?.url}
              target="_blank"
              rel="noreferrer"
              onClick={handleClose}
            >
              Continuar pelo WhatsApp
              <ArrowUpRight aria-hidden="true" size={17} strokeWidth={1.7} />
            </a>
          </div>
        </div>
      ) : null}
    </dialog>
  );
}
