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
          background: var(--button-surface);
          color: var(--button-text);
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
      </style>
      <div class="generator">
        <div class="numbers"></div>
        <button type="button">번호 생성하기</button>
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
  themeToggle.textContent = theme === 'dark' ? '화이트 모드' : '다크 모드';
}

themeToggle.addEventListener('click', () => {
  const current = root.getAttribute('data-theme') || 'light';
  const next = current === 'dark' ? 'light' : 'dark';
  applyTheme(next);
});

applyTheme('light');

contactForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  contactStatus.textContent = '전송 중...';
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

    contactStatus.textContent = '문의가 정상적으로 접수되었습니다.';
    contactForm.reset();
  } catch (error) {
    contactStatus.textContent = '전송에 실패했습니다. 잠시 후 다시 시도해 주세요.';
  } finally {
    contactSubmit.disabled = false;
  }
});
