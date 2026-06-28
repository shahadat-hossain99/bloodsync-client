import { createRoot } from "react-dom/client";

const cfg = {
  success: {
    border: "#1D9E75",
    iconBg: "#E1F5EE",
    iconColor: "#0F6E56",
    icon: "✓",
  },
  error: {
    border: "#E24B4A",
    iconBg: "#FCEBEB",
    iconColor: "#A32D2D",
    icon: "✕",
  },
  warning: {
    border: "#EF9F27",
    iconBg: "#FAEEDA",
    iconColor: "#854F0B",
    icon: "!",
  },
  info: {
    border: "#378ADD",
    iconBg: "#E6F1FB",
    iconColor: "#185FA5",
    icon: "i",
  },
};

let container = null;

function getContainer() {
  if (container) return container;
  container = document.createElement("div");
  Object.assign(container.style, {
    position: "fixed",
    top: "20px",
    left: "50%",
    transform: "translateX(-50%)",
    zIndex: 99999,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "10px",
    pointerEvents: "none",
  });
  document.body.appendChild(container);
  return container;
}

function Toast({ type, title, message, onClose }) {
  const c = cfg[type];
  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-start",
        gap: "12px",
        background: "#fff",
        border: `1px solid #e5e7eb`,
        borderLeft: `4px solid ${c.border}`,
        borderRadius: "12px",
        padding: "14px 40px 14px 14px",
        minWidth: "320px",
        maxWidth: "400px",
        position: "relative",
        boxShadow: "0 4px 16px rgba(0,0,0,0.10)",
        pointerEvents: "all",
        fontFamily: "Inter, system-ui, sans-serif",
        animation: "bt-in .22s ease",
      }}
    >
      <style>{`@keyframes bt-in{from{opacity:0;transform:translateY(-8px)}to{opacity:1;transform:translateY(0)}}`}</style>
      <div
        style={{
          width: 36,
          height: 36,
          borderRadius: 8,
          flexShrink: 0,
          background: c.iconBg,
          color: c.iconColor,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontWeight: 700,
          fontSize: 16,
        }}
      >
        {c.icon}
      </div>
      <div style={{ flex: 1 }}>
        <p
          style={{
            margin: 0,
            fontSize: 13.5,
            fontWeight: 600,
            color: "#111827",
            lineHeight: 1.4,
          }}
        >
          {title}
        </p>
        {message && (
          <p
            style={{
              margin: "3px 0 0",
              fontSize: 12,
              color: "#6b7280",
              lineHeight: 1.5,
            }}
          >
            {message}
          </p>
        )}
      </div>
      <button
        onClick={onClose}
        style={{
          position: "absolute",
          top: 10,
          right: 10,
          background: "none",
          border: "none",
          cursor: "pointer",
          fontSize: 16,
          color: "#d1d5db",
          lineHeight: 1,
          width: 20,
          height: 20,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 4,
          padding: 0,
        }}
        aria-label="close"
      >
        ✕
      </button>
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          height: 3,
          borderRadius: "0 0 0 8px",
          background: c.border,
          animation: "bt-bar 3s linear forwards",
        }}
      />
      <style>{`@keyframes bt-bar{from{width:100%}to{width:0%}}`}</style>
    </div>
  );
}

function fire(type, title, message) {
  const slot = document.createElement("div");
  getContainer().appendChild(slot);
  const root = createRoot(slot);

  function remove() {
    root.unmount();
    slot.remove();
  }

  root.render(
    <Toast type={type} title={title} message={message} onClose={remove} />,
  );

  setTimeout(remove, 3000);
}

export const showToast = {
  success: (title, message) => fire("success", title, message),
  error: (title, message) => fire("error", title, message),
  warning: (title, message) => fire("warning", title, message),
  info: (title, message) => fire("info", title, message),
};
