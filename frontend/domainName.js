// export const baseUrl = "http://localhost:3001";

window.location.hostname === "localhost"
  ? "http://localhost:8000"
  : `https://apiantiddos.${window.location.hostname.slice(9)}`;
