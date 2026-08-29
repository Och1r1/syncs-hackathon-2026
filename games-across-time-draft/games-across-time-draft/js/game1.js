/**
 * Golf Swing Meter + 4-Player Horse Race
 * ------------------------------------------------------------
 * Visual theme: vintage-atlas palette with a carpet-textured
 * background behind the whole widget, larger board + pieces,
 * and a fence built from swappable <img> elements (one per
 * step) instead of styled divs — drop your own art into
 * opts.fencePostImage / opts.fenceFinishImage.
 *
 * SWING BAR:
 *   1st press: starts the swing — a cursor sweeps up/down the bar
 *   2nd press: locks the shot at the cursor's position
 *              -> fires "swing" event with the result
 *
 * HORSE RACE (4 players, turn-based):
 *   Quality of each swing maps to steps gained:
 *     Great Throw!  -> +4 steps
 *     Good Throw    -> +3 steps
 *     Decent Throw  -> +2 steps
 *     Normal Throw  -> +1 step
 *     Bad Throw     -> +0 steps
 *   Track has 14 steps to the finish line. First horse to reach
 *   step 14 wins and the race stops (fires "racefinish").
 *
 * Mounts itself into the ".game-window" element from your HTML.
 * ------------------------------------------------------------
 */

class SwingMeter {
  constructor(opts = {}) {
    this.container =
      typeof opts.container === "string"
        ? document.querySelector(opts.container)
        : opts.container || document.querySelector(".game-window");

    if (!this.container) {
      throw new Error("SwingMeter: no container element found");
    }

    // Bigger board + pieces by default
    this.barWidth = opts.barWidth || 210;
    this.height = opts.height || 560;
    this.raceWidth = opts.raceWidth || 560;
    this.totalSteps = opts.totalSteps || 14;
    this.speed = opts.speed || 1.4;
    this.sweetSpot = opts.sweetSpot ?? 0.92;
    this.onSwing = opts.onSwing || (() => {});
    this.onFinish = opts.onFinish || (() => {});

    // Fence art — swap these paths for your own images later
    this.fencePostImage = opts.fencePostImage || "assets/fence-post.png";
    this.fenceFinishImage = opts.fenceFinishImage || "assets/fence-finish.png";

    this.playerColors = ["#8a3928", "#6e6a50", "#b58a45", "#645540"];
    this.playerImages = opts.playerImages || [
      "img/horse1.png",
      "img/horse2.png",
      "img/horse3.png",
      "img/horse4.png",
    ];

    this.players = this.playerImages.map((image, i) => ({
      id: i,
      name: "Player " + (i + 1),
      color: this.playerColors[i],
      image,
      step: 0,
      finished: false,
      horseEl: null,
      progressEl: null,
    }));
    this.currentPlayerIndex = 0;
    this.raceOver = false;

    this.stage = "idle";
    this.value = 0;
    this.lockedValue = null;

    this._t0 = 0;
    this._raf = null;

    this._injectStyles();
    this._buildDom();
    this._bindInput();
    this._loop = this._loop.bind(this);
    this._drawBarCanvas();
    this._updateHint();
  }

  /* ---------------------------------------------------------- */
  /* Setup                                                       */
  /* ---------------------------------------------------------- */

  _injectStyles() {
    if (document.getElementById("swing-meter-styles")) return;
    const style = document.createElement("style");
    style.id = "swing-meter-styles";
    style.textContent = `
      .swing-meter-wrap {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 16px;
        user-select: none;
        touch-action: manipulation;
        font-family: Inter, system-ui, sans-serif;
        padding: 30px;
        /* carpet: deep maroon base with a woven diamond/ornament pattern */
        background:
          repeating-linear-gradient(45deg, rgba(0,0,0,.10) 0 2px, transparent 2px 14px),
          repeating-linear-gradient(-45deg, rgba(0,0,0,.08) 0 2px, transparent 2px 14px),
          radial-gradient(circle at 50% 50%, rgba(176,138,69,.20) 0, transparent 60%),
          repeating-radial-gradient(circle at 0 0, rgba(181,138,69,.14) 0 3px, transparent 3px 26px),
          linear-gradient(180deg, #5c1f1a, #4a1712);
        border: 10px solid #2c1712;
        outline: 2px solid rgba(181,138,69,.5);
        outline-offset: -14px;
        box-shadow: 0 30px 70px rgba(20,10,6,.5), inset 0 0 60px rgba(0,0,0,.35);
        border-radius: 4px;
      }
      .swing-meter-row {
        display: flex;
        flex-direction: row-reverse;
        align-items: stretch;
        gap: 22px;
      }
      .swing-meter-canvas {
        border-radius: 3px;
        background: #211b13;
        border: 2px solid rgba(181,138,69,.5);
        box-shadow: inset 0 0 0 5px rgba(217,189,137,.06), 0 12px 30px rgba(34,25,14,.35);
        cursor: pointer;
      }
      .swing-meter-hint {
        font-family: "Cormorant Garamond", Georgia, serif;
        font-size: 20px;
        font-style: italic;
        letter-spacing: 0.01em;
        color: #f0dfbd;
        text-align: center;
        min-height: 24px;
        text-shadow: 0 1px 3px rgba(0,0,0,.5);
      }
      .swing-meter-result {
        font-family: "Cormorant Garamond", Georgia, serif;
        font-weight: 700;
        font-size: 26px;
        color: #e0a24f;
        text-align: center;
        min-height: 32px;
        text-shadow: 0 1px 3px rgba(0,0,0,.5);
      }

      /* --- Race track --- */
      .horse-race-wrap {
        display: flex;
        flex-direction: column;
        border-radius: 3px;
        background:
          repeating-linear-gradient(90deg, rgba(76,56,30,.02) 0 1px, transparent 1px 6px),
          linear-gradient(180deg, #f3e4c0, #e1c48f);
        border: 2px solid rgba(65,49,30,.35);
        box-shadow: 0 12px 30px rgba(20,10,6,.35), inset 0 0 0 1px rgba(255,255,255,.25);
        padding: 20px 22px 18px;
        box-sizing: border-box;
      }
      .horse-race-title {
        font-family: "Cormorant Garamond", Georgia, serif;
        font-size: 17px;
        font-weight: 700;
        letter-spacing: 0.14em;
        text-transform: uppercase;
        color: #6a583d;
        text-align: center;
        margin-bottom: 12px;
      }

      /* Fence: one <img> element per required step */
      .fence-row {
        position: relative;
        display: flex;
        align-items: flex-end;
        height: 54px;
        margin: 0 8px 10px;
        gap: 4px;
      }
      .fence-post {
        flex: 1 1 0;
        position: relative;
        height: 100%;
      }
      .fence-post img {
        width: 100%;
        height: 100%;
        object-fit: contain;
        object-position: bottom center;
        display: block;
      }
      .fence-post-label {
        position: absolute;
        bottom: -18px;
        left: 50%;
        transform: translateX(-50%);
        font-family: Inter, sans-serif;
        font-size: 10px;
        color: #7c684a;
      }
      .fence-post.is-finish .fence-post-label {
        color: #8a3928;
        font-weight: 700;
      }

      /* Lanes */
      .lanes {
        display: flex;
        flex-direction: column;
        gap: 16px;
        margin-top: 24px;
      }
      .lane {
        position: relative;
        height: 44px;
        background: rgba(65,49,30,.05);
        border-radius: 3px;
        border-bottom: 1px dashed rgba(65,49,30,.22);
      }
      .lane.is-current {
        background: rgba(181,138,69,.14);
        box-shadow: inset 0 0 0 1px rgba(181,138,69,.5);
      }
      .lane-label {
        position: absolute;
        left: 8px;
        top: 50%;
        transform: translateY(-50%);
        font-family: "Cormorant Garamond", Georgia, serif;
        font-weight: 700;
        font-size: 15px;
        letter-spacing: 0.02em;
        color: #4d3d29;
        opacity: 0.85;
        z-index: 2;
        pointer-events: none;
      }
      .horse-marker {
        position: absolute;
        top: 50%;
        left: 0%;
        transform: translate(-6px, -50%);
        width: 40px;
        height: 40px;
        transition: left 0.6s cubic-bezier(0.25, 0.8, 0.35, 1);
        z-index: 1;
      }
      .horse-marker.is-winner {
        filter: drop-shadow(0 0 8px #d0a65f);
      }
    `;
    document.head.appendChild(style);
  }

  _buildDom() {
    this.wrap = document.createElement("div");
    this.wrap.className = "swing-meter-wrap";

    this.row = document.createElement("div");
    this.row.className = "swing-meter-row";

    this.canvas = document.createElement("canvas");
    this.canvas.className = "swing-meter-canvas";
    this.canvas.width = this.barWidth;
    this.canvas.height = this.height;
    this.ctx = this.canvas.getContext("2d");

    this.raceWrap = document.createElement("div");
    this.raceWrap.className = "horse-race-wrap";
    this.raceWrap.style.width = this.raceWidth + "px";
    this.raceWrap.style.height = this.height + "px";

    const title = document.createElement("div");
    title.className = "horse-race-title";
    title.textContent = "The Steeplechase";
    this.raceWrap.appendChild(title);

    // fence: one <img> per step, swap fencePostImage/fenceFinishImage for your own art
    this.fenceRow = document.createElement("div");
    this.fenceRow.className = "fence-row";
    for (let i = 1; i <= this.totalSteps; i++) {
      const isFinish = i === this.totalSteps;
      const post = document.createElement("div");
      post.className = "fence-post" + (isFinish ? " is-finish" : "");

      const img = document.createElement("img");
      img.src = isFinish ? this.fenceFinishImage : this.fencePostImage;
      img.alt = isFinish ? "Finish fence" : `Fence step ${i}`;
      post.appendChild(img);

      const label = document.createElement("span");
      label.className = "fence-post-label";
      label.textContent = isFinish ? "FIN" : String(i);
      post.appendChild(label);

      this.fenceRow.appendChild(post);
    }
    this.raceWrap.appendChild(this.fenceRow);

    this.lanesEl = document.createElement("div");
    this.lanesEl.className = "lanes";

    this.players.forEach((p) => {
      const lane = document.createElement("div");
      lane.className = "lane";

      const label = document.createElement("span");
      label.className = "lane-label";
      label.textContent = p.name;
      label.style.color = p.color;
      lane.appendChild(label);

      const horse = document.createElement("div");
      horse.className = "horse-marker";
      horse.innerHTML = `<img src="${p.image}" style="width:100%;height:100%;object-fit:contain;" />`;
      lane.appendChild(horse);

      p.horseEl = horse;
      p.laneEl = lane;
      this.lanesEl.appendChild(lane);
    });

    this.raceWrap.appendChild(this.lanesEl);

    this.row.appendChild(this.canvas);
    this.row.appendChild(this.raceWrap);

    this.hint = document.createElement("div");
    this.hint.className = "swing-meter-hint";

    this.result = document.createElement("div");
    this.result.className = "swing-meter-result";

    this.wrap.appendChild(this.row);
    this.wrap.appendChild(this.hint);
    this.wrap.appendChild(this.result);
    this.container.appendChild(this.wrap);
  }

  _bindInput() {
    const advance = (e) => {
      e.preventDefault();
      this._advance();
    };
    this.canvas.addEventListener("click", advance);
    this.canvas.addEventListener("touchstart", advance, { passive: false });
    this._keyHandler = (e) => {
      if (e.code === "Space") advance(e);
    };
    window.addEventListener("keydown", this._keyHandler);
  }

  destroy() {
    cancelAnimationFrame(this._raf);
    window.removeEventListener("keydown", this._keyHandler);
    this.wrap.remove();
  }

  /* ---------------------------------------------------------- */
  /* Swing state machine                                         */
  /* ---------------------------------------------------------- */

  _currentPlayer() {
    return this.players[this.currentPlayerIndex];
  }

  _nextPlayerIndex() {
    let idx = this.currentPlayerIndex;
    for (let i = 0; i < this.players.length; i++) {
      idx = (idx + 1) % this.players.length;
      if (!this.players[idx].finished) return idx;
    }
    return this.currentPlayerIndex;
  }

  _updateHint() {
    if (this.raceOver) return;
    const p = this._currentPlayer();
    this.players.forEach((pl) =>
      pl.laneEl.classList.toggle("is-current", pl === p),
    );
    if (this.stage === "idle") {
      this.hint.textContent = `${p.name}'s turn — click or press space to begin the swing`;
    } else if (this.stage === "swinging") {
      this.hint.textContent = `${p.name}: click again to strike the ball`;
    } else if (this.stage === "done") {
      this.hint.textContent = "Click to continue";
    }
  }

  _advance() {
    if (this.raceOver) return;

    if (this.stage === "idle") {
      this.stage = "swinging";
      this._t0 = performance.now();
      this.result.textContent = "";
      this._updateHint();
      if (!this._raf) this._raf = requestAnimationFrame(this._loop);
    } else if (this.stage === "swinging") {
      this.lockedValue = this.value;
      this.stage = "done";
      this._finishSwing();
    } else if (this.stage === "done") {
      this._reset();
    }
  }

  _reset() {
    this.stage = "idle";
    this.value = 0;
    this.lockedValue = null;
    this.result.textContent = "";
    this._updateHint();
    this._drawBarCanvas();
  }

  _finishSwing() {
    const player = this._currentPlayer();
    const raw = this.lockedValue;
    const overswing = raw > 1;

    const error = Math.abs(raw - this.sweetSpot);
    let quality = Math.max(0, 1 - error / this.sweetSpot);
    if (overswing) quality *= 0.5;
    quality = Math.max(0, Math.min(1, quality));
    const qualityPct = Math.round(quality * 100);

    let tier, label;
    if (qualityPct > 92) {
      tier = 4;
      label = "Great Throw!";
    } else if (qualityPct > 75) {
      tier = 3;
      label = "Good Throw";
    } else if (qualityPct > 50) {
      tier = 2;
      label = "Decent Throw";
    } else if (qualityPct > 25) {
      tier = 1;
      label = "Normal Throw";
    } else {
      tier = 0;
      label = "Bad Throw";
    }

    player.step = Math.min(player.step + tier, this.totalSteps);
    this._positionHorse(player);

    const result = {
      player: player.name,
      playerId: player.id,
      power: Math.round(Math.min(raw, 1) * 100),
      overswing,
      quality: qualityPct,
      tier,
      label,
      step: player.step,
      totalSteps: this.totalSteps,
    };

    this.result.textContent = `${player.name}: ${label} — +${tier} step${tier === 1 ? "" : "s"} (${player.step}/${this.totalSteps})`;
    this._drawBarCanvas();

    this.canvas.dispatchEvent(new CustomEvent("swing", { detail: result }));
    this.onSwing(result);

    if (player.step >= this.totalSteps && !player.finished) {
      player.finished = true;
      player.horseEl.classList.add("is-winner");
      this.raceOver = true;
      this.hint.textContent = `${player.name} wins the steeplechase`;
      this.result.textContent = `${player.name} crossed the finish line!`;
      this.canvas.dispatchEvent(
        new CustomEvent("racefinish", { detail: result }),
      );
      this.onFinish(result);
      return;
    }

    this.currentPlayerIndex = this._nextPlayerIndex();
  }

  _positionHorse(player) {
    const pct = (player.step / this.totalSteps) * 100;
    player.horseEl.style.left = `calc(${pct}%)`;
  }

  /* ---------------------------------------------------------- */
  /* Animation loop                                               */
  /* ---------------------------------------------------------- */

  _loop(now) {
    const elapsed = (now - this._t0) / 1000;

    if (this.stage === "swinging") {
      const cycle = (elapsed * this.speed) % 2;
      this.value = cycle <= 1 ? cycle * 1.15 : (2 - cycle) * 1.15;
      this._drawBarCanvas();
      this._raf = requestAnimationFrame(this._loop);
    } else {
      this._raf = null;
    }
  }

  /* ---------------------------------------------------------- */
  /* Rendering — swing bar                                        */
  /* ---------------------------------------------------------- */

  _drawBarCanvas() {
    const { ctx, barWidth: W, height: H } = this;
    ctx.clearRect(0, 0, W, H);

    const bg = ctx.createLinearGradient(0, 0, 0, H);
    bg.addColorStop(0, "#211b13");
    bg.addColorStop(1, "#302516");
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, W, H);

    this._drawBar();
  }

  _drawBar() {
    const { ctx, barWidth: W, height: H } = this;
    const barW = 76;
    const barX = (W - barW) / 2;
    const barTop = 54;
    const barBottom = H - 54;
    const barH = barBottom - barTop;

    // track — aged paper tone
    ctx.fillStyle = "#4a3c28";
    this._roundRect(ctx, barX, barTop, barW, barH, 8);
    ctx.fill();

    // sweet-spot marker — bright gold
    const sweetY = barBottom - (this.sweetSpot * barH) / 1.15;
    ctx.strokeStyle = "#d0a65f";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(barX - 10, sweetY);
    ctx.lineTo(barX + barW + 10, sweetY);
    ctx.stroke();

    // fill — gold gradient
    const value =
      this.stage === "idle"
        ? 0
        : this.stage === "swinging"
          ? this.value
          : this.lockedValue;
    const fillTop = Math.max(barTop, barBottom - (value * barH) / 1.15);
    const grad = ctx.createLinearGradient(0, fillTop, 0, barBottom);
    grad.addColorStop(0, "#d0a65f");
    grad.addColorStop(1, "#8a6837");
    ctx.fillStyle = grad;
    this._roundRect(ctx, barX, fillTop, barW, barBottom - fillTop, 8);
    ctx.fill();

    // cursor line while active or locked
    if (this.stage === "swinging" || this.stage === "done") {
      ctx.strokeStyle = "#f3e4c0";
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(barX - 14, fillTop);
      ctx.lineTo(barX + barW + 14, fillTop);
      ctx.stroke();
    }

    // label
    ctx.fillStyle = "#ead4a3";
    ctx.font = "600 15px 'Cormorant Garamond', serif";
    ctx.textAlign = "center";
    ctx.fillText("THROW", barX + barW / 2, barTop - 20);

    // whose turn indicator above the bar
    const p = this._currentPlayer();
    ctx.fillStyle = "#f3e4c0";
    ctx.font = "700 13px Inter, sans-serif";
    ctx.fillText(p.name.toUpperCase(), barX + barW / 2, 22);
  }

  _roundRect(ctx, x, y, w, h, r) {
    if (h < 0) h = 0;
    const rr = Math.min(r, w / 2, h / 2);
    ctx.beginPath();
    ctx.moveTo(x + rr, y);
    ctx.arcTo(x + w, y, x + w, y + h, rr);
    ctx.arcTo(x + w, y + h, x, y + h, rr);
    ctx.arcTo(x, y + h, x, y, rr);
    ctx.arcTo(x, y, x + w, y, rr);
    ctx.closePath();
  }
}

/* ---------------------------------------------------------- */
/* Boot it up against the .game-window from the HTML           */
/* ---------------------------------------------------------- */

document.addEventListener("DOMContentLoaded", () => {
  const meter = new SwingMeter({
    container: ".game-window",
    playerImages: [
      "assets/jp-card.img",
      "assets/jp-card.img",
      "assets/jp-card.img",
      "assets/jp-card.img",
    ],
    // Fence art — replace these with your own images whenever ready
    fencePostImage: "assets/fence-post.png",
    fenceFinishImage: "assets/fence-finish.png",
    totalSteps: 14,
    speed: 8,
    sweetSpot: 0.6,
    playerNames: ["Player 1", "Player 2", "Player 3", "Player 4"],
    onSwing: (result) => {
      console.log("Swing result:", result);
    },
    onFinish: (result) => {
      console.log("Race won!", result);
    },
  });

  window.swingMeter = meter;
});
