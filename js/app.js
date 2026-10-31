/* Player HTML5: nenhum cadastro, serviço externo ou dependência. */
(() => {
  "use strict";

  const $ = (id) => document.getElementById(id);
  const audio = $("audio");
  const tracks = (Array.isArray(window.SFELIPE_TRACKS) ? window.SFELIPE_TRACKS : [])
    .slice().sort((a, b) => b.releaseDate.localeCompare(a.releaseDate));
  const playButtons = [];
  const rows = [];
  const durationCells = new Map();
  const knownDurations = new Map();
  let currentIndex = 0;
  let noticeTimer;

  function time(seconds) {
    const value = Number.isFinite(seconds) ? Math.max(0, Math.floor(seconds)) : 0;
    return `${Math.floor(value / 60)}:${String(value % 60).padStart(2, "0")}`;
  }

  function node(tag, className, text) {
    const element = document.createElement(tag);
    if (className) element.className = className;
    if (text !== undefined) element.textContent = text;
    return element;
  }

  function icon(name) {
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("class", "icon");
    svg.setAttribute("aria-hidden", "true");
    const use = document.createElementNS(svg.namespaceURI, "use");
    use.setAttribute("href", `#i-${name}`);
    svg.append(use);
    return svg;
  }

  function cover(track, className) {
    const image = node("img", className);
    image.src = track.cover;
    image.alt = "";
    image.loading = "lazy";
    image.width = 600;
    image.height = 600;
    image.addEventListener("error", () => { image.src = "assets/capas/padrao.svg"; }, { once: true });
    return image;
  }

  function notice(message, persistent = false) {
    clearTimeout(noticeTimer);
    $("status").textContent = message;
    $("status").hidden = false;
    if (!persistent) noticeTimer = setTimeout(clearNotice, 6500);
  }

  function clearNotice() {
    clearTimeout(noticeTimer);
    $("status").hidden = true;
    $("status").textContent = "";
  }

  function description(track) {
    return track.demo ? "Demonstração · áudio sintético" : track.artist;
  }

  function trackButton(track, className) {
    const button = node("button", className);
    button.type = "button";
    button.dataset.trackId = track.id;
    button.setAttribute("aria-label", `Reproduzir ${track.title}`);
    button.setAttribute("aria-pressed", "false");
    button.addEventListener("click", () => {
      const index = tracks.indexOf(track);
      if (index === currentIndex) togglePlayback();
      else selectTrack(index, true);
    });
    playButtons.push({ button, track });
    return button;
  }

  function shareButton(track) {
    const button = node("button", "icon-button card-share");
    button.type = "button";
    button.setAttribute("aria-label", `Compartilhar ${track.title}`);
    button.append(icon("share"));
    button.addEventListener("click", () => shareTrack(track));
    return button;
  }

  function renderCatalog() {
    tracks.slice(0, 3).forEach((track, index) => {
      const card = node("article", "release-card");
      const art = node("div", "card-cover");
      const button = trackButton(track, "cover-play");
      const play = node("span", "card-play-icon");
      play.append(icon("play"));
      button.append(cover(track), play);
      art.append(button);
      if (track.demo || index === 0) {
        art.append(node("span", "card-badge", track.demo ? "DEMONSTRAÇÃO" : "NOVO LANÇAMENTO"));
      }
      const info = node("div", "card-info");
      const names = node("div");
      names.append(node("h3", "", track.title), node("p", "", description(track)));
      info.append(names, shareButton(track));
      card.append(art, info);
      $("release-grid").append(card);
    });

    tracks.forEach((track, index) => {
      const row = node("div", "track-row");
      row.setAttribute("role", "row");
      const numberCell = node("div");
      numberCell.setAttribute("role", "cell");
      const number = trackButton(track, "track-number");
      number.append(node("span", "", String(index + 1).padStart(2, "0")), icon("play"));
      numberCell.append(number);

      const titleCell = node("div", "track-cell");
      titleCell.setAttribute("role", "cell");
      const title = trackButton(track, "track-name");
      title.textContent = track.title;
      const labels = node("div");
      labels.append(title, node("span", "track-subtitle", description(track)));
      titleCell.append(cover(track), labels);

      const date = node("div", "date-column", new Date(`${track.releaseDate}T12:00:00`).toLocaleDateString("pt-BR", { day: "2-digit", month: "short", year: "numeric" }));
      date.setAttribute("role", "cell");
      const duration = node("div", "duration-column", time(track.duration));
      duration.setAttribute("role", "cell");
      durationCells.set(track.id, duration);
      const shareCell = node("div");
      shareCell.setAttribute("role", "cell");
      shareCell.append(shareButton(track));
      row.append(numberCell, titleCell, date, duration, shareCell);
      rows.push(row);
      $("track-list").append(row);
    });
  }

  function paintRange(input) {
    const percent = Number(input.max) ? Number(input.value) / Number(input.max) * 100 : 0;
    input.style.setProperty("--progress", `${percent}%`);
  }

  function currentDuration() {
    return Number.isFinite(audio.duration) && audio.duration > 0 ? audio.duration : 0;
  }

  function updatePosition() {
    const duration = currentDuration();
    const position = Number.isFinite(audio.currentTime) ? audio.currentTime : 0;
    $("elapsed").textContent = time(position);
    $("seek").max = duration || 1;
    $("seek").value = position;
    $("seek").disabled = !duration;
    $("seek").setAttribute("aria-valuetext", `${time(position)} de ${time(duration || tracks[currentIndex].duration)}`);
    paintRange($("seek"));
    if (duration) {
      $("total").textContent = time(duration);
      durationCells.get(tracks[currentIndex].id).textContent = time(duration);
      knownDurations.set(tracks[currentIndex].id, duration);
    }
    if ("mediaSession" in navigator && navigator.mediaSession.setPositionState && duration) {
      try {
        navigator.mediaSession.setPositionState({ duration, playbackRate: audio.playbackRate, position: Math.min(position, duration) });
      } catch { /* Alguns navegadores implementam apenas parte da Media Session API. */ }
    }
  }

  function syncPlayback() {
    const playing = !audio.paused && !audio.ended;
    const track = tracks[currentIndex];
    $("toggle-play").setAttribute("aria-label", playing ? "Pausar" : "Reproduzir");
    $("toggle-play").querySelector("use").setAttribute("href", playing ? "#i-pause" : "#i-play");
    playButtons.forEach(({ button, track: buttonTrack }) => {
      const active = buttonTrack === track && playing;
      button.setAttribute("aria-pressed", String(active));
      button.setAttribute("aria-label", `${active ? "Pausar" : "Reproduzir"} ${buttonTrack.title}`);
      button.querySelectorAll("use").forEach((use) => use.setAttribute("href", active ? "#i-pause" : "#i-play"));
    });
    rows.forEach((row, index) => row.classList.toggle("is-current", index === currentIndex));
    const heroActive = currentIndex === 0 && playing;
    $("hero-play").replaceChildren(icon(heroActive ? "pause" : "play"), document.createTextNode(heroActive ? "Pausar lançamento" : "Ouvir lançamento"));
    document.title = playing ? `${track.title} · SFelipe Music` : "SFelipe Music — O som é meu. O play é seu.";
    if ("mediaSession" in navigator) navigator.mediaSession.playbackState = playing ? "playing" : "paused";
  }

  function setMediaMetadata(track) {
    if (!("mediaSession" in navigator) || !("MediaMetadata" in window)) return;
    try {
      const artUrl = new URL(track.cover, document.baseURI);
      const type = /\.svg$/i.test(artUrl.pathname) ? "image/svg+xml" : /\.png$/i.test(artUrl.pathname) ? "image/png" : /\.webp$/i.test(artUrl.pathname) ? "image/webp" : "image/jpeg";
      navigator.mediaSession.metadata = new MediaMetadata({
        title: track.title,
        artist: track.demo ? "Demonstração · áudio sintético" : track.artist,
        album: "SFelipe Music",
        artwork: [{ src: artUrl.href, sizes: "600x600", type }]
      });
      if (navigator.mediaSession.setPositionState) navigator.mediaSession.setPositionState();
    } catch { /* A reprodução continua mesmo sem metadados no dispositivo. */ }
  }

  async function play() {
    const requestedTrack = tracks[currentIndex];
    try {
      await audio.play();
      clearNotice();
    } catch (error) {
      if (error.name === "AbortError" || requestedTrack !== tracks[currentIndex]) return;
      notice(error.name === "NotAllowedError"
        ? "Toque em Reproduzir para iniciar o áudio neste navegador."
        : "Não foi possível tocar esta faixa. Verifique a conexão ou tente outra música.", true);
      syncPlayback();
    }
  }

  function togglePlayback() {
    if (audio.paused || audio.ended) play();
    else audio.pause();
  }

  function selectTrack(index, shouldPlay = false) {
    audio.pause();
    currentIndex = index;
    const track = tracks[index];
    clearNotice();
    audio.src = track.audio;
    audio.load();
    $("player-title").textContent = track.title;
    $("player-artist").textContent = description(track);
    $("player-cover").src = track.cover;
    $("elapsed").textContent = "0:00";
    $("total").textContent = time(knownDurations.get(track.id) || track.duration);
    $("seek").max = 1;
    $("seek").value = 0;
    $("seek").disabled = true;
    paintRange($("seek"));
    $("previous").disabled = index === 0;
    $("next").disabled = index === tracks.length - 1;
    setMediaMetadata(track);
    syncPlayback();
    if (shouldPlay) play();
  }

  function next() {
    if (currentIndex < tracks.length - 1) selectTrack(currentIndex + 1, true);
  }

  function previous() {
    if (currentIndex > 0) selectTrack(currentIndex - 1, true);
  }

  async function shareTrack(track) {
    const url = new URL(window.location.href);
    url.searchParams.set("faixa", track.id);
    url.hash = "";
    const title = `${track.title} · SFelipe Music`;
    if (navigator.share) {
      try {
        await navigator.share({ title, text: track.demo ? "Ouça esta faixa de demonstração do SFelipe Music." : `Ouça ${track.title}, de ${track.artist}.`, url: url.href });
        return;
      } catch (error) {
        if (error.name === "AbortError") return;
      }
    }
    if (navigator.clipboard && window.isSecureContext) {
      try {
        await navigator.clipboard.writeText(url.href);
        notice("Link da faixa copiado. Pronto para compartilhar!");
        return;
      } catch { /* Se a cópia automática for bloqueada, oferecemos o link selecionável. */ }
    }
    $("share-url").value = url.href;
    $("share-dialog").showModal();
    $("share-url").focus();
    $("share-url").select();
  }

  function init() {
    if (!tracks.length) {
      $("release-grid").append(node("p", "section-caption", "As músicas chegam em breve."));
      $("player-title").textContent = "Nenhuma faixa disponível";
      $("player-artist").textContent = "SFelipe Music";
      ["toggle-play", "previous", "next", "hero-play", "seek", "volume"].forEach((id) => { $(id).disabled = true; });
      document.querySelector(".demo-notice").hidden = true;
      document.querySelector(".hero-art").hidden = true;
      return;
    }
    renderCatalog();
    document.querySelector(".demo-notice").hidden = !tracks.some((track) => track.demo);
    document.querySelector(".demo-mini").hidden = !tracks[0].demo;
    $("hero-cover").src = tracks[0].cover;
    $("hero-cover").alt = `Capa ${tracks[0].demo ? "ilustrativa " : ""}de ${tracks[0].title}`;
    $("hero-track-title").textContent = tracks[0].title;
    $("hero-cover").addEventListener("error", () => { $("hero-cover").src = "assets/capas/padrao.svg"; }, { once: true });
    $("player-cover").addEventListener("error", () => {
      if (!$("player-cover").src.endsWith("/assets/capas/padrao.svg")) $("player-cover").src = "assets/capas/padrao.svg";
    });

    $("toggle-play").addEventListener("click", togglePlayback);
    $("next").addEventListener("click", next);
    $("previous").addEventListener("click", previous);
    $("hero-play").addEventListener("click", () => currentIndex === 0 ? togglePlayback() : selectTrack(0, true));
    $("seek").addEventListener("input", () => {
      if (!currentDuration()) return;
      audio.currentTime = Number($("seek").value);
      updatePosition();
    });

    // iOS usa o volume do próprio aparelho; esse navegador não aceita volume por JS.
    const systemVolumeOnly = /iPad|iPhone|iPod/.test(navigator.userAgent) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
    $("volume-control").hidden = systemVolumeOnly;
    if (!systemVolumeOnly) {
      audio.volume = Number($("volume").value);
      $("volume-control").hidden = Math.abs(audio.volume - Number($("volume").value)) > 0.01;
      paintRange($("volume"));
      $("volume").addEventListener("input", () => {
        audio.volume = Number($("volume").value);
        $("volume").setAttribute("aria-valuetext", `${Math.round(audio.volume * 100)}%`);
        paintRange($("volume"));
      });
    }
    ["play", "pause", "ended"].forEach((event) => audio.addEventListener(event, syncPlayback));
    ["timeupdate", "loadedmetadata", "durationchange", "seeked"].forEach((event) => audio.addEventListener(event, updatePosition));
    audio.addEventListener("playing", clearNotice);
    audio.addEventListener("ended", next);
    audio.addEventListener("error", () => {
      notice("Esta faixa não pôde ser carregada. Verifique a conexão ou tente outra música.", true);
      syncPlayback();
    });

    if ("mediaSession" in navigator) {
      const actions = {
        play,
        pause: () => audio.pause(),
        previoustrack: previous,
        nexttrack: next,
        seekto: (details) => {
          if (Number.isFinite(details.seekTime) && currentDuration()) {
            audio.currentTime = Math.min(Math.max(details.seekTime, 0), currentDuration());
            updatePosition();
          }
        }
      };
      Object.entries(actions).forEach(([action, handler]) => {
        try { navigator.mediaSession.setActionHandler(action, handler); } catch { /* Ação opcional. */ }
      });
    }

    $("close-share").addEventListener("click", () => $("share-dialog").close());
    const requested = new URLSearchParams(window.location.search).get("faixa");
    const index = tracks.findIndex((track) => track.id === requested);
    selectTrack(index >= 0 ? index : 0);
    if (requested && index < 0) notice("Esse link não corresponde a uma faixa disponível. Escolha uma música na biblioteca.");
  }

  // Reserva exatamente a altura do player, inclusive no iPhone com área segura.
  function measurePlayer() {
    document.documentElement.style.setProperty("--player-height", `${Math.ceil(document.querySelector(".player").getBoundingClientRect().height)}px`);
  }
  init();
  measurePlayer();
  if ("ResizeObserver" in window) new ResizeObserver(measurePlayer).observe(document.querySelector(".player"));
  else window.addEventListener("resize", measurePlayer);
})();
