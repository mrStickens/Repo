import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "@/App.css";
import PricePage from "./PricePage";
import "./PricePage.css";

const BROCHURE_URL = "/brochure.html";

const Viewer = () => {
  const [hoveredSide, setHoveredSide] = useState(null);

  return (
    <div className="viewer-app" data-testid="brochure-viewer">
      {/* Header */}
      <header className="viewer-header" data-testid="viewer-header">
        <div className="header-label">Государственный Военный Госпиталь</div>
        <h1 className="header-title">Трифолд-буклет</h1>
        <p className="header-sub">Премиальная медицинская листовка к China Fashion Week, Санья</p>
      </header>

      {/* Preview Section */}
      <section className="preview-section" data-testid="preview-section">
        <div className="preview-grid">
          <div
            className={`preview-card ${hoveredSide === 'outer' ? 'active' : ''}`}
            onMouseEnter={() => setHoveredSide('outer')}
            onMouseLeave={() => setHoveredSide(null)}
            data-testid="preview-outer"
          >
            <div className="preview-label">Сторона 1 — Внешняя</div>
            <div className="preview-frame">
              <iframe
                src={`${BROCHURE_URL}#page1`}
                title="Outer Spread"
                className="preview-iframe"
                scrolling="no"
              />
            </div>
            <div className="panel-labels">
              <span>Панель 5</span>
              <span>Панель 6</span>
              <span>Панель 1</span>
            </div>
          </div>

          <div
            className={`preview-card ${hoveredSide === 'inner' ? 'active' : ''}`}
            onMouseEnter={() => setHoveredSide('inner')}
            onMouseLeave={() => setHoveredSide(null)}
            data-testid="preview-inner"
          >
            <div className="preview-label">Сторона 2 — Внутренняя</div>
            <div className="preview-frame">
              <iframe
                src={`${BROCHURE_URL}#page2`}
                title="Inner Spread"
                className="preview-iframe"
                scrolling="no"
              />
            </div>
            <div className="panel-labels">
              <span>Панель 2</span>
              <span>Панель 3</span>
              <span>Панель 4</span>
            </div>
          </div>
        </div>
      </section>

      {/* Actions */}
      <section className="actions-section" data-testid="actions-section">
        <a
          href={BROCHURE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="action-btn primary"
          data-testid="open-brochure-btn"
        >
          Открыть буклет для печати
        </a>
        <button
          className="action-btn secondary"
          onClick={() => {
            const w = window.open(BROCHURE_URL, '_blank');
            setTimeout(() => w && w.print(), 1500);
          }}
          data-testid="print-pdf-btn"
        >
          Экспорт в PDF
        </button>
      </section>

      {/* Instructions */}
      <section className="instructions" data-testid="instructions-section">
        <h2>Инструкция для экспорта в PDF</h2>
        <div className="steps-grid">
          <div className="step">
            <div className="step-num">01</div>
            <div className="step-text">
              <strong>Откройте буклет</strong>
              <p>Нажмите кнопку «Открыть буклет для печати» выше</p>
            </div>
          </div>
          <div className="step">
            <div className="step-num">02</div>
            <div className="step-text">
              <strong>Ctrl + P (или Cmd + P)</strong>
              <p>Откройте диалог печати в браузере Chrome</p>
            </div>
          </div>
          <div className="step">
            <div className="step-num">03</div>
            <div className="step-text">
              <strong>Настройки печати</strong>
              <p>Принтер: «Сохранить как PDF». Поля: Нет. Масштаб: 100%. Фоновые рисунки: Включить</p>
            </div>
          </div>
          <div className="step">
            <div className="step-num">04</div>
            <div className="step-text">
              <strong>Сохраните PDF</strong>
              <p>Файл готов для отправки в типографию (303x216mm с вылетами)</p>
            </div>
          </div>
        </div>
      </section>

      {/* Specs */}
      <section className="specs-section" data-testid="specs-section">
        <h2>Технические характеристики</h2>
        <div className="specs-grid">
          <div className="spec-item">
            <span className="spec-label">Формат</span>
            <span className="spec-value">A4 Landscape</span>
          </div>
          <div className="spec-item">
            <span className="spec-label">Размер с вылетами</span>
            <span className="spec-value">303 x 216 mm</span>
          </div>
          <div className="spec-item">
            <span className="spec-label">Вылеты (Bleeds)</span>
            <span className="spec-value">3 mm</span>
          </div>
          <div className="spec-item">
            <span className="spec-label">Панелей</span>
            <span className="spec-value">6 (3 + 3)</span>
          </div>
          <div className="spec-item">
            <span className="spec-label">Безопасная зона</span>
            <span className="spec-value">10 mm</span>
          </div>
          <div className="spec-item">
            <span className="spec-label">Шрифты</span>
            <span className="spec-value">Cormorant Garamond, Montserrat</span>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="viewer-footer" data-testid="viewer-footer">
        <p>Государственный Военный Госпиталь &bull; Отделение ТКМ &bull; Санья, Хайнань &bull; hospital1946.ru</p>
      </footer>
    </div>
  );
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Viewer />} />
        <Route path="/price" element={<PricePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
