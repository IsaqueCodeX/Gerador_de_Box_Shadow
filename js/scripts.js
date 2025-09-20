class BoxShadowGenerator {
  #horizontal; #vertical; #blur; #spread; #color; #opacity; #inset;
  #horizontalRef; #verticalRef; #blurRef; #spreadRef; #colorRef; #opacityRef;
  #previewBox; #rule;

  constructor() {
    this.#horizontal = document.querySelector("#horizontal");
    this.#vertical = document.querySelector("#vertical");
    this.#blur = document.querySelector("#blur");
    this.#spread = document.querySelector("#spread");
    this.#color = document.querySelector("#color");
    this.#opacity = document.querySelector("#opacity");
    this.#inset = document.querySelector("#inset");

    this.#horizontalRef = document.querySelector("#horizontal-value");
    this.#verticalRef = document.querySelector("#vertical-value");
    this.#blurRef = document.querySelector("#blur-value");
    this.#spreadRef = document.querySelector("#spread-value");
    this.#colorRef = document.querySelector("#color-value");
    this.#opacityRef = document.querySelector("#opacity-value");

    this.#previewBox = document.querySelector("#box");
    this.#rule = document.querySelector("#rule");

    this.initialize();
  }

  initialize() {
    this.syncValues();
    this.applyRule();
    this.addEvents();
  }

  syncValues() {
    this.#horizontalRef.value = this.#horizontal.value;
    this.#verticalRef.value = this.#vertical.value;
    this.#blurRef.value = this.#blur.value;
    this.#spreadRef.value = this.#spread.value;
    this.#colorRef.value = this.#color.value;
    this.#opacityRef.value = this.#opacity.value;
  }

  addEvents() {
    const inputs = [
      this.#horizontal, this.#vertical, this.#blur,
      this.#spread, this.#color, this.#opacity, this.#inset,
      this.#horizontalRef, this.#verticalRef, this.#blurRef,
      this.#spreadRef, this.#colorRef, this.#opacityRef
    ];

    inputs.forEach(input => {
      input.addEventListener("input", () => {
        this.syncValues();
        this.applyRule();
      });
    });

    document.querySelector("#copy-btn").addEventListener("click", () => this.copyRule());
    document.querySelector("#reset-btn").addEventListener("click", () => this.resetValues());
  }

  hexToRgb(hex) {
    const bigint = parseInt(hex.slice(1), 16);
    return `${(bigint >> 16) & 255}, ${(bigint >> 8) & 255}, ${bigint & 255}`;
  }

  applyRule() {
    const rgb = this.hexToRgb(this.#color.value);
    const inset = this.#inset.checked ? "inset" : "";
    const rule = `${inset} ${this.#horizontalRef.value}px ${this.#verticalRef.value}px ${this.#blurRef.value}px ${this.#spreadRef.value}px rgba(${rgb}, ${this.#opacityRef.value})`;

    this.#previewBox.style.boxShadow = rule;
    this.#rule.innerText = `box-shadow: ${rule};`;
  }

  copyRule() {
    navigator.clipboard.writeText(this.#rule.innerText).then(() => {
      const msg = document.querySelector("#copy-instructions");
      msg.innerText = "✅ Copiado com sucesso!";
      setTimeout(() => msg.innerText = "Clique no botão para copiar o código", 2000);
    });
  }

  resetValues() {
    this.#horizontal.value = 5;
    this.#vertical.value = 5;
    this.#blur.value = 10;
    this.#spread.value = 3;
    this.#color.value = "#000000";
    this.#opacity.value = 1;
    this.#inset.checked = false;

    this.syncValues();
    this.applyRule();
  }
}

// Inicialização
new BoxShadowGenerator();
