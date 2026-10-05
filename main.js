// Número de WhatsApp Business: solo números, con código de país y sin el 15.
// Ejemplo: "5493855123456". Mientras esté vacío, los botones llevan a la sección de contacto.
const WHATSAPP = "";
const NUMERO_VISIBLE = ""; // Ejemplo: "385 512-3456"
const MENSAJE_GENERAL = "Hola, vi la página de Soluciones Cerca y quiero hacer una consulta.";

// Opiniones: se arman desde testimonios.js
const lista = document.querySelector("[data-opiniones]");
const enMiCompu = ["localhost", "127.0.0.1", ""].includes(location.hostname);
const opiniones =
  typeof TESTIMONIOS !== "undefined" && TESTIMONIOS.length
    ? TESTIMONIOS
    : enMiCompu && typeof TESTIMONIOS_PRUEBA !== "undefined"
      ? TESTIMONIOS_PRUEBA
      : [];
if (lista && opiniones.length) {
  lista.replaceChildren(...opiniones.map(crearOpinion));
}

function crearOpinion(t) {
  const tarjeta = document.createElement("figure");
  tarjeta.className = "opinion";

  if (t.estrellas) {
    const estrellas = document.createElement("div");
    estrellas.className = "opinion-estrellas";
    const n = Math.max(1, Math.min(5, t.estrellas));
    estrellas.textContent = "★".repeat(n) + "☆".repeat(5 - n);
    estrellas.setAttribute("aria-label", `${n} de 5 estrellas`);
    tarjeta.append(estrellas);
  }

  const texto = document.createElement("blockquote");
  texto.textContent = `“${t.texto}”`;
  tarjeta.append(texto);

  const autor = document.createElement("figcaption");
  const avatar = document.createElement(t.foto ? "img" : "span");
  avatar.className = "opinion-avatar";
  if (t.foto) {
    avatar.src = t.foto;
    avatar.alt = "";
  } else {
    avatar.textContent = t.nombre.split(" ").map((p) => p[0]).join("").slice(0, 2).toUpperCase();
  }
  const datos = document.createElement("div");
  const nombre = document.createElement("strong");
  nombre.textContent = t.nombre;
  const lugar = document.createElement("span");
  lugar.textContent = t.lugar || "";
  datos.append(nombre, lugar);
  autor.append(avatar, datos);

  if (t.servicio) {
    const servicio = document.createElement("span");
    servicio.className = "opinion-servicio";
    servicio.textContent = t.servicio;
    autor.append(servicio);
  }

  tarjeta.append(autor);
  return tarjeta;
}

if (WHATSAPP) {
  document.querySelectorAll("[data-whatsapp]").forEach((enlace) => {
    const mensaje = enlace.dataset.mensaje || MENSAJE_GENERAL;
    enlace.href = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(mensaje)}`;
    enlace.target = "_blank";
    enlace.rel = "noopener";
  });
}

if (NUMERO_VISIBLE) {
  document.querySelectorAll("[data-numero]").forEach((el) => (el.textContent = NUMERO_VISIBLE));
}

document.querySelectorAll("[data-anio]").forEach((el) => (el.textContent = new Date().getFullYear()));
