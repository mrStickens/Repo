import React from "react";

const PRICES = [
  { id: 1, name: "Иглоукалывание по точкам", price: "150", time: "20 мин" },
  { id: 2, name: "Электроакупунктура (с током)", price: "30", time: "20 мин" },
  { id: 3, name: "Иглоукалывание для похудения", price: "150", time: "20 мин" },
  { id: 4, name: "Аппаратная стимуляция кровообращения головного мозга", price: "180", time: "20–30 мин" },
  { id: 5, name: "Иглоукалывание для омоложения лица", price: "180", time: "20 мин" },
  { id: 6, name: "Лечебный массаж по активным точкам", price: "150", time: "45 мин" },
  { id: 7, name: "Общий массаж", price: "100", time: "30 мин" },
  { id: 8, name: "Банки (общие)", price: "80", time: "10–15 мин" },
  { id: 9, name: "Кровопускание (кровяные банки)", price: "20 / банка", time: "15–20 мин" },
  { id: 10, name: "Банки к лечебному иглоукалыванию", price: "180", time: "20 мин" },
  { id: 11, name: "Иглонож (акупотомия)", price: "200–500 / точка", time: "20–30 мин" },
  { id: 12, name: "Инъекция по точкам (колено)", price: "1 000", time: "10 мин" },
  { id: 13, name: "Кетгутовое вшивание для похудения", price: "1 000–2 000", time: "20–30 мин" },
  { id: 14, name: "Вытяжение шейных позвонков", price: "120", time: "20 мин" },
  { id: 15, name: "Вытяжение поясничных позвонков", price: "120", time: "20 мин" },
  { id: 16, name: "Низкочастотная импульсная терапия", price: "180", time: "20–30 мин" },
  { id: 17, name: "Терапия ультракороткими волнами", price: "180", time: "20–30 мин" },
  { id: 18, name: "Моксотерапия (прижигание)", price: "180", time: "20–30 мин" },
  { id: 19, name: "Магниторезонансная термотерапия", price: "200", time: "20–30 мин" },
  { id: 20, name: "Травяные препараты (индивидуальный рецепт)", price: "от 150 / день", time: "—" },
];

export default function PricePage() {
  return (
    <div className="price-page" data-testid="price-page">
      {/* Header */}
      <header className="price-header" data-testid="price-header">
        <div className="price-header-inner">
          <p className="price-label">Государственный Военный Госпиталь</p>
          <div className="price-divider" />
          <h1 className="price-title">Стоимость процедур</h1>
          <p className="price-subtitle">Отделение Традиционной Китайской Медицины</p>
        </div>
      </header>

      {/* Table */}
      <main className="price-main" data-testid="price-table-section">
        <div className="price-table-wrap">
          <table className="price-table" data-testid="price-table">
            <thead>
              <tr>
                <th className="th-num">#</th>
                <th className="th-name">Процедура</th>
                <th className="th-price">Цена, &yen;</th>
                <th className="th-time">Время</th>
              </tr>
            </thead>
            <tbody>
              {PRICES.map((p) => (
                <tr key={p.id} data-testid={`price-row-${p.id}`}>
                  <td className="td-num">{p.id}</td>
                  <td className="td-name">{p.name}</td>
                  <td className="td-price">{p.price}</td>
                  <td className="td-time">{p.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Note */}
        <div className="price-note" data-testid="price-note">
          <p>Стоимость указана в китайских юанях (CNY). Итоговая стоимость лечения рассчитывается индивидуально после диагностики.</p>
          <p>Государственный стандарт гарантирует применение только сертифицированных методик.</p>
        </div>

        {/* Contacts */}
        <div className="price-contacts" data-testid="price-contacts">
          <div className="price-divider" />
          <p className="contact-line"><strong>hospital1946.ru</strong></p>
          <p className="contact-line">info@hospital1946.ru</p>
          <p className="contact-line">+86 198 7270 7491 <span className="contact-hint">— по вопросам сотрудничества</span></p>
          <div className="price-divider" />
          <p className="contact-footer">Государственный статус. Безупречная репутация с 1946 года.</p>
        </div>
      </main>
    </div>
  );
}
