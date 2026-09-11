const fs = require("fs");
const path = require("path");
const { chromium } = require("playwright");
const sharp = require("sharp");

const root = path.resolve(__dirname, "..");
const outDir = path.join(root, "linkedin-assets");
const screenshotPath = path.join(outDir, "gestor-gastos-screenshot.png");
const W = 1080;
const H = 1080;
const GREEN = "#2f9e63";
const NAVY = "#172b4d";
const CREAM = "#f7f4ee";
const MINT = "#dff2e7";
const MUTED = "#667085";

fs.mkdirSync(outDir, { recursive: true });

function esc(text) {
  return text.replace(/[&<>\"]/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '\"': "&quot;" })[char]);
}

function lines(items, x, size, gap = 1.18) {
  return items.map((line, i) => `<tspan x="${x}" dy="${i ? size * gap : 0}">${esc(line)}</tspan>`).join("");
}

function canvas(body) {
  return Buffer.from(`<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">
    <rect width="1080" height="1080" fill="${CREAM}"/>
    <circle cx="1015" cy="80" r="235" fill="${MINT}"/>
    <circle cx="35" cy="1015" r="220" fill="${GREEN}" opacity=".11"/>
    <style>.sans{font-family:Inter,Arial,sans-serif}.shadow{filter:drop-shadow(0 24px 34px rgba(23,43,77,.16))}</style>
    ${body}
  </svg>`);
}

async function captureSite() {
  const chromePath = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
  const browser = await chromium.launch(fs.existsSync(chromePath) ? { executablePath: chromePath } : {});
  const page = await browser.newPage({ viewport: { width: 1440, height: 1100 }, deviceScaleFactor: 1 });
  await page.goto(`file://${path.join(root, "index.html").replace(/\\/g, "/")}`);
  await page.locator(".budget__input").fill("500");
  await page.getByRole("button", { name: "Asignar" }).click();
  await page.screenshot({ path: screenshotPath, fullPage: true });
  await browser.close();
}

async function makeCard1() {
  const shot = await sharp(screenshotPath).extract({ left: 0, top: 0, width: 1440, height: 760 }).resize(940, 496, { fit: "cover" }).png().toBuffer();
  const bg = canvas(`
    <rect x="70" y="70" width="940" height="496" rx="26" fill="#fff" class="shadow"/>
    <rect x="70" y="70" width="940" height="496" rx="26" fill="none" stroke="#fff" stroke-width="10"/>
    <text class="sans" x="76" y="655" font-size="28" font-weight="700" fill="${GREEN}">Proyecto Frontend</text>
    <text class="sans" x="76" y="733" font-size="68" font-weight="750" fill="${NAVY}">Gestor de gastos</text>
    <text class="sans" x="76" y="807" font-size="30" font-weight="500" fill="${MUTED}">${lines(["Una aplicación para registrar gastos, controlar", "el presupuesto y consultar estadísticas."], 76, 30)}</text>
    <rect x="76" y="918" width="330" height="54" rx="8" fill="${NAVY}"/>
    <text class="sans" x="102" y="953" font-size="22" font-weight="700" fill="#fff">HTML5 + CSS3 + JavaScript</text>
  `);
  await sharp(bg).composite([{ input: shot, left: 70, top: 70 }]).png().toFile(path.join(outDir, "linkedin-01-proyecto.png"));
}

async function makeCard2() {
  const shot = await sharp(screenshotPath).extract({ left: 180, top: 160, width: 1040, height: 620 }).resize(430, 380, { fit: "cover" }).png().toBuffer();
  const features = ["DOM y eventos", "Cálculos dinámicos", "localStorage", "Estadísticas", "Modales", "CSS con BEM"];
  const pills = features.map((item, i) => {
    const x = 76 + (i % 2) * 304;
    const y = 665 + Math.floor(i / 2) * 82;
    return `<rect x="${x}" y="${y}" width="260" height="54" rx="8" fill="#fff" stroke="#9fd4b6"/><text class="sans" x="${x + 22}" y="${y + 35}" font-size="21" font-weight="700" fill="${NAVY}">${esc(item)}</text>`;
  }).join("");
  const bg = canvas(`
    <text class="sans" x="76" y="128" font-size="30" font-weight="700" fill="${GREEN}">Stack y práctica</text>
    <text class="sans" x="76" y="212" font-size="66" font-weight="750" fill="${NAVY}">${lines(["De interfaz", "a aplicación"], 76, 66)}</text>
    <text class="sans" x="76" y="390" font-size="30" font-weight="500" fill="${MUTED}">${lines(["Datos persistentes, estadísticas", "y una experiencia interactiva."], 76, 30)}</text>
    <rect x="594" y="152" width="430" height="380" rx="26" fill="#fff" class="shadow"/>
    ${pills}
  `);
  await sharp(bg).composite([{ input: shot, left: 594, top: 152 }]).png().toFile(path.join(outDir, "linkedin-02-funcionalidades.png"));
}

async function makeCard3() {
  const bg = canvas(`
    <text class="sans" x="76" y="128" font-size="30" font-weight="700" fill="${GREEN}">Aprendizajes</text>
    <text class="sans" x="76" y="216" font-size="68" font-weight="750" fill="${NAVY}">${lines(["Programar para", "resolver algo real"], 76, 68)}</text>
    <rect x="76" y="390" width="928" height="1" fill="#aed8bf"/>
    <text class="sans" x="116" y="488" font-size="34" font-weight="700" fill="${GREEN}">01</text><text class="sans" x="210" y="488" font-size="31" font-weight="650" fill="${NAVY}">Organizar la lógica de una aplicación</text>
    <text class="sans" x="116" y="606" font-size="34" font-weight="700" fill="${GREEN}">02</text><text class="sans" x="210" y="606" font-size="31" font-weight="650" fill="${NAVY}">Actualizar la interfaz desde JavaScript</text>
    <text class="sans" x="116" y="724" font-size="34" font-weight="700" fill="${GREEN}">03</text><text class="sans" x="210" y="724" font-size="31" font-weight="650" fill="${NAVY}">Persistir datos con localStorage</text>
    <rect x="76" y="875" width="928" height="86" rx="10" fill="${NAVY}"/>
    <text class="sans" x="112" y="928" font-size="23" font-weight="700" fill="#fff">github.com/AllenPrkr/web_project_expenses_es</text>
  `);
  await sharp(bg).png().toFile(path.join(outDir, "linkedin-03-aprendizajes.png"));
}

async function main() {
  await captureSite();
  await makeCard1();
  await makeCard2();
  await makeCard3();
  console.log(`Assets written to ${outDir}`);
}

main().catch((error) => { console.error(error); process.exit(1); });
