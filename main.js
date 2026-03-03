
class LottoGenerator extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          --brand-color: oklch(65% 0.2 260);
          --dark-color: oklch(40% 0.2 260);
          --light-color: oklch(98% 0.02 240);
          display: block;
          text-align: center;
        }
        .generator {
          background: var(--light-color);
          padding: 2rem;
          border-radius: 1rem;
          box-shadow: 0 10px 20px -5px rgba(0,0,0,0.1), 0 5px 10px -5px rgba(0,0,0,0.2);
        }
        .numbers {
          display: flex;
          justify-content: center;
          gap: 0.5rem;
          margin-bottom: 2rem;
        }
        .number {
          display: grid;
          place-content: center;
          width: 3rem;
          height: 3rem;
          border-radius: 50%;
          background: var(--brand-color);
          color: var(--light-color);
          font-weight: bold;
          font-size: 1.25rem;
          box-shadow: 0 0 10px 0px color-mix(in oklch, var(--brand-color), transparent 20%);
        }
        button {
          background: var(--brand-color);
          color: var(--light-color);
          border: none;
          padding: 1rem 2rem;
          font-size: 1rem;
          border-radius: 0.5rem;
          cursor: pointer;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
          box-shadow: 0 0 20px 0px color-mix(in oklch, var(--brand-color), transparent 20%);
        }
        button:hover {
          transform: translateY(-2px);
          box-shadow: 0 5px 15px -5px color-mix(in oklch, var(--brand-color), transparent 40%);
        }
        .icon {
          display: inline-block;
          width: 1em;
          height: 1em;
          vertical-align: -0.125em;
          background-repeat: no-repeat;
          background-size: contain;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='white'%3E%3Cpath d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z'/%3E%3C/svg%3E");
        }
      </style>
      <div class="generator">
        <div class="numbers"></div>
        <button>
          <span class="icon"></span> Generate Numbers
        </button>
      </div>
    `;

    this.button = this.shadowRoot.querySelector('button');
    this.numbersContainer = this.shadowRoot.querySelector('.numbers');
    this.button.addEventListener('click', this.generateNumbers.bind(this));
    this.generateNumbers();
  }

  generateNumbers() {
    const numbers = new Set();
    while (numbers.size < 6) {
      numbers.add(Math.floor(Math.random() * 45) + 1);
    }
    this.displayNumbers(Array.from(numbers).sort((a,b) => a-b));
  }

  displayNumbers(numbers) {
    this.numbersContainer.innerHTML = '';
    for (const number of numbers) {
      const numberEl = document.createElement('div');
      numberEl.className = 'number';
      numberEl.textContent = number;
      this.numbersContainer.appendChild(numberEl);
    }
  }
}

customElements.define('lotto-generator', LottoGenerator);
