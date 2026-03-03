class LottoGenerator extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          text-align: center;
        }
        .generator {
          background: var(--panel-surface);
          padding: 2rem;
          border-radius: 1rem;
          box-shadow: 0 10px 24px rgba(0, 0, 0, 0.25);
        }
        .numbers {
          display: flex;
          justify-content: center;
          gap: 0.5rem;
          margin-bottom: 1.5rem;
          flex-wrap: wrap;
        }
        .number {
          display: grid;
          place-content: center;
          width: 3rem;
          height: 3rem;
          border-radius: 50%;
          color: #fff;
          font-weight: 700;
          font-size: 1.1rem;
          border: 1px solid rgba(0, 0, 0, 0.2);
          text-shadow: 0 1px 2px rgba(0, 0, 0, 0.35);
        }
        .ball-yellow { background: #f9c62b; }
        .ball-blue { background: #2f73d9; }
        .ball-red { background: #e34c42; }
        .ball-gray { background: #7e8794; }
        .ball-green { background: #50b95a; }

        button {
          background: #0e2f74;
          color: #fff;
          border: none;
          padding: 0.8rem 1.3rem;
          font-size: 1rem;
          border-radius: 0.6rem;
          cursor: pointer;
          font-weight: 700;
        }
        button:hover {
          filter: brightness(1.08);
        }

        :host-context(:root[data-theme="dark"]) button {
          background: #d7e5ff;
          color: #0a1229;
        }
      </style>
      <div class="generator">
        <div class="numbers"></div>
        <button type="button">Generate Numbers</button>
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
    this.displayNumbers(Array.from(numbers).sort((a, b) => a - b));
  }

  getBallClass(number) {
    if (number <= 10) return 'ball-yellow';
    if (number <= 20) return 'ball-blue';
    if (number <= 30) return 'ball-red';
    if (number <= 40) return 'ball-gray';
    return 'ball-green';
  }

  displayNumbers(numbers) {
    this.numbersContainer.innerHTML = '';
    for (const number of numbers) {
      const numberEl = document.createElement('div');
      numberEl.className = `number ${this.getBallClass(number)}`;
      numberEl.textContent = number;
      this.numbersContainer.appendChild(numberEl);
    }
  }
}

customElements.define('lotto-generator', LottoGenerator);

const themeToggle = document.getElementById('themeToggle');
const root = document.documentElement;
const contactForm = document.getElementById('contactForm');
const contactStatus = document.getElementById('contactStatus');
const contactSubmit = document.getElementById('contactSubmit');

function applyTheme(theme) {
  root.setAttribute('data-theme', theme);
  themeToggle.textContent = theme === 'dark' ? 'White Mode' : 'Dark Mode';
}

themeToggle.addEventListener('click', () => {
  const current = root.getAttribute('data-theme') || 'light';
  const next = current === 'dark' ? 'light' : 'dark';
  applyTheme(next);
});

applyTheme('light');

contactForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  contactStatus.textContent = 'Sending...';
  contactSubmit.disabled = true;

  const formData = new FormData(contactForm);
  try {
    const response = await fetch(contactForm.action, {
      method: 'POST',
      body: formData,
      headers: {
        Accept: 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Request failed');
    }

    contactStatus.textContent = 'Thanks! Your message has been sent.';
    contactForm.reset();
  } catch (error) {
    contactStatus.textContent = 'Failed to send. Please try again.';
  } finally {
    contactSubmit.disabled = false;
  }
});
