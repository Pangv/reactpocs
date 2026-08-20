import { Alert, Box, CircularProgress } from "@mui/material";
import mermaid from "mermaid";
import { JSX, useEffect, useId, useRef, useState } from "react";

interface PropFlowDiagramProps {
  diagram?: string;
}

type RenderState = "idle" | "loading" | "success" | "error";

export default function PropFlowDiagram({
  diagram,
}: PropFlowDiagramProps): JSX.Element | null {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const reactId = useId();
  const renderIdRef = useRef(`prop-flow-${reactId.replace(/[^a-zA-Z0-9_-]/g, "")}`);

  const [renderState, setRenderState] = useState<RenderState>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    if (!diagram?.trim()) {
      setRenderState("idle");
      setErrorMessage(null);
      if (containerRef.current) containerRef.current.innerHTML = "";
      return () => { cancelled = true; };
    }

    const renderDiagram = async (): Promise<void> => {
      setRenderState("loading");
      setErrorMessage(null);
      if (containerRef.current) containerRef.current.innerHTML = "";

      try {
        mermaid.initialize({ startOnLoad: false, securityLevel: "strict", theme: "default" });
        const { svg } = await mermaid.render(renderIdRef.current, diagram.trim());

        if (cancelled || !containerRef.current) return;
        containerRef.current.innerHTML = svg;
        setRenderState("success");
      } catch (error: unknown) {
        if (cancelled) return;
        const message = error instanceof Error ? error.message : "Diagramm konnte nicht gerendert werden.";
        setErrorMessage(message);
        setRenderState("error");
      }
    };

    void renderDiagram();
    return () => { cancelled = true; };
  }, [diagram]);

  if (!diagram?.trim()) return null;

  return (
    <Box sx={{ width: "100%", minHeight: 120, overflowX: "auto", display: "flex", justifyContent: "center", alignItems: "center", py: 2 }} aria-live="polite">
      {renderState === "loading" && (
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, py: 4 }}>
          <CircularProgress size={24} />
          <span>Diagramm wird geladen …</span>
        </Box>
      )}

      {renderState === "error" && (
        <Alert severity="error" sx={{ width: "100%" }}>
          <strong>Diagramm konnte nicht geladen werden.</strong>
          {errorMessage && <Box sx={{ mt: 0.5, fontSize: "0.875rem" }}>{errorMessage}</Box>}
        </Alert>
      )}

      <Box
        ref={containerRef}
        sx={{
          display: renderState === "success" ? "block" : "none",
          width: "100%",
          "& svg": { display: "block", maxWidth: "100%", height: "auto", margin: "0 auto" },
        }}
      />
    </Box>
  );
}