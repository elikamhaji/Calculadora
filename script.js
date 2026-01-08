const karats = [
    { label: "10k", purity: 0.41 },
    { label: "14k", purity: 0.575 },
    { label: "18k", purity: 0.735 },
    { label: "87%", purity: 0.87 },
    { label: "88%", purity: 0.88 },
    { label: "90%", purity: 0.90 },
    { label: "91%", purity: 0.91 },
    { label: "92%", purity: 0.92 },
    { label: "93%", purity: 0.93 },
    { label: "95%", purity: 0.95 },
    { label: "99%", purity: 0.99 }
];

const priceListEl = document.getElementById("priceList");
const refDisplayEl = document.getElementById("refDisplay");
const shareBtn = document.getElementById("shareBtn");
const priceCard = document.getElementById("priceCard");

shareBtn.addEventListener("click", shareImage);

// 🔐 READ & DECODE OBFUSCATED CODE (?r=1062)
const params = new URLSearchParams(window.location.search);
const raw = params.get("r");

if (raw) {
    const code = parseInt(raw, 10) - 1000;
    if (code >= 60 && code <= 70) {
        loadPrices(code);
    }
}

async function loadPrices(code) {
    try {
        const res = await fetch("https://api.gold-api.com/price/XAU");
        const data = await res.json();

        const oz = data.price;
        const discount = code + 30;
        const pct = discount / 100;
        const gramBase = oz / 31.1035;

        priceListEl.innerHTML = "";

        karats.forEach(k => {
            const perGram = (gramBase * k.purity * pct).toFixed(2);
            const row = document.createElement("div");
            row.className = "row";
            row.innerHTML = `<span>${k.label}</span><span>$${perGram}</span>`;
            priceListEl.appendChild(row);
        });

        refDisplayEl.textContent = `Ref#9${Math.floor(oz)}${code}`;

    } catch (e) {
        console.log("price load error", e);
    }
}

async function shareImage() {
    const canvas = await html2canvas(priceCard, { scale: 3 });

    canvas.toBlob(blob => {
        if (!blob) return;

        const file = new File([blob], "gold-prices.png", { type: "image/png" });

        if (navigator.canShare && navigator.canShare({ files: [file] })) {
            navigator.share({ files: [file] });
        } else {
            const link = document.createElement("a");
            link.href = canvas.toDataURL("image/png");
            link.download = "gold-prices.png";
            link.click();
        }
    });
}
