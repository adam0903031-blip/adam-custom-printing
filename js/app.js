const NGN = n => "₦" + Number(n).toLocaleString("en-NG");
const WA_NUM = "2347010000001";
let lastSuccessRef = null;
let lastSuccessItems = [];

// Translations
const i18n = {
  en: {}, ha: {}
};
let currentLang = "en";

// Products
const PRODUCTS = [
  {id:1, name:"Customized Mug (White)", base:3000, cat:"mug", category:"mugs", img:"https://images.unsplash.com/photo-1514228742587-6b1558cfcfd3?q=80&w=600&auto=format&fit=crop", desc:"11oz sublimation mug — vivid, dishwasher-safe print. Perfect gift.", tags:["mug"], colors:["White","Black","Magic Black","Gold Rim"], sizes:["11oz","15oz (+₦800)"], badge:"Bestseller"},
  {id:2, name:"Premium Mug (Colour + Box)", base:4500, cat:"mug", category:"mugs", img:"https://images.unsplash.com/photo-1514228742587-6b1558cfcfd3?q=80&w=600&auto=format&fit=crop", desc:"Premium inner-colour mug with gift box. Luxe finish.", tags:["mug","premium"], colors:["Red","Blue","Black","Yellow"], sizes:["11oz"], badge:"Premium"},
  {id:3, name:"Customized T-Shirt", base:5000, cat:"apparel", category:"tshirts", img:"https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=600&auto=format&fit=crop", desc:"Soft cotton tee with sublimation/DTF print. Unisex.", tags:["apparel"], colors:["White","Black","Navy","Red","Green"], sizes:["S","M","L","XL","XXL"], badge:"Hot"},
  {id:4, name:"Premium T-Shirt (Polo)", base:7500, cat:"apparel", category:"tshirts", img:"https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=600&auto=format&fit=crop", desc:"Premium polo with embroidery + print options.", tags:["apparel","premium"], colors:["White","Black","Navy"], sizes:["S","M","L","XL","XXL"], badge:"Premium"},
  {id:5, name:"Customized Phone Case", base:4000, cat:"accessories", category:"phone", img:"https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=600&auto=format&fit=crop", desc:"Hard/soft case for iPhone & Samsung — full-wrap sublimation.", tags:["phone","accessories"], colors:["Black","Clear","White"], sizes:["iPhone","Samsung","Infinix/Tecno"], badge:"Trending"},
  {id:6, name:"Customized Face Cap", base:3500, cat:"accessories", category:"caps", img:"https://images.unsplash.com/photo-1588850561407-ed78c282e89b?q=80&w=600&auto=format&fit=crop", desc:"Trucker/face cap with embroidery or sublimation.", tags:["cap","accessories"], colors:["Black","White","Red","Blue","Yellow"], sizes:["One Size"], badge:"New"},
  {id:7, name:"Customized Shopping Bag", base:3000, cat:"accessories", category:"bags", img:"https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=600&auto=format&fit=crop", desc:"Tote/shopping bag — reusable, eco-friendly print.", tags:["bag"], colors:["Beige","White","Black","Custom"], sizes:["Small","Medium","Large (+₦500)"], badge:"Eco"},
  {id:8, name:"Customized Backpack", base:8000, cat:"accessories", category:"bags", img:"https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=600&auto=format&fit=crop", desc:"School/travel backpack with full sublimation panel.", tags:["bag","premium"], colors:["Black","Navy","Custom Print"], sizes:["One Size"], badge:"Premium"},
  {id:9, name:"Photo Plate (Decorative)", base:5000, cat:"photo", category:"plates", img:"https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=600&auto=format&fit=crop", desc:"8-inch ceramic photo plate with stand — weddings & awards.", tags:["plate","photo"], colors:["White","Gold Rim"], sizes:["8 inch","10 inch (+₦1,500)"], badge:"Gift"},
  {id:10, name:"Small Photo Print (4x6)", base:500, cat:"photo", category:"photo", img:"https://images.unsplash.com/photo-1452587925148-ce544e77e70d?q=80&w=600&auto=format&fit=crop", desc:"High-resolution photo print — instant & archival.", tags:["photo"], colors:["Gloss","Matte"], sizes:["4x6"], badge:"From ₦500"},
  {id:11, name:"Medium Photo Print (8x10)", base:1500, cat:"photo", category:"photo", img:"https://images.unsplash.com/photo-1452587925148-ce544e77e70d?q=80&w=600&auto=format&fit=crop", desc:"8x10 premium lustre print.", tags:["photo"], colors:["Gloss","Matte"], sizes:["8x10"], badge:"Popular"},
  {id:12, name:"Large Photo Print (12x16 + Frame)", base:3500, cat:"photo", category:"photo", img:"https://images.unsplash.com/photo-1495745966610-2a67f2297e5e?q=80&w=600&auto=format&fit=crop", desc:"Large format with optional framing.", tags:["photo","premium"], colors:["Framed","Unframed"], sizes:["12x16"], badge:"Framed"},
  {id:13, name:"School & Class Shirts (Bulk)", base:5000, cat:"apparel", category:"tshirts", img:"https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=600&auto=format&fit=crop", desc:"Class uniforms, sportswear — durable prints for students.", tags:["apparel","school"], colors:["White","School Colour"], sizes:["Kids","S","M","L"], badge:"Bulk"},
  {id:14, name:"Corporate Branding Pack", base:5000, cat:"corporate", category:"corporate", img:"https://images.unsplash.com/photo-1556761175-b413da4baf72?q=80&w=600&auto=format&fit=crop", desc:"Logo design + branded merchandise for businesses.", tags:["corporate"], colors:["As per brand"], sizes:["Bulk"], badge:"Corporate"},
  {id:15, name:"Customized Souvenirs & Gifts", base:3000, cat:"corporate", category:"corporate", img:"https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=600&auto=format&fit=crop", desc:"Wedding, birthday & event souvenirs — mugs, bags, plates.", tags:["gift","corporate"], colors:["Custom"], sizes:["Mix"], badge:"Events"},
];

const SERVICES = [
  {id:101, name:"Customized Mugs", price:3000, img:"https://images.unsplash.com/photo-1514228742587-6b1558cfcfd3?q=80&w=600&auto=format&fit=crop", desc:"Personalized mugs for birthdays, weddings & corporate gifts.", tags:["Bestseller","Gift"]},
  {id:102, name:"T-Shirt Printing", price:5000, img:"https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=600&auto=format&fit=crop", desc:"Sublimation & DTF — vibrant prints that last wash after wash.", tags:["Unisex","Cotton"]},
  {id:103, name:"Phone Case Printing", price:4000, img:"https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=600&auto=format&fit=crop", desc:"Full-wrap cases for all major phone models.", tags:["iPhone","Samsung"]},
  {id:104, name:"Sublimation Printing", price:3000, img:"https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=600&auto=format&fit=crop", desc:"Professional sublimation on mugs, plates, caps & fabrics.", tags:["Pro","Vivid"]},
  {id:105, name:"Face Cap Printing", price:3500, img:"https://images.unsplash.com/photo-1588850561407-ed78c282e89b?q=80&w=600&auto=format&fit=crop", desc:"Embroidered or printed caps — branding that stands out.", tags:["Embroidery","Print"]},
  {id:106, name:"School & Class Shirts", price:5000, img:"https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=600&auto=format&fit=crop", desc:"Durable school uniforms, class tees & sportswear.", tags:["Bulk","School"]},
  {id:107, name:"Customized Bags & Backpacks", price:3000, img:"https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=600&auto=format&fit=crop", desc:"Tote bags, shopping bags & backpacks with your design.", tags:["Eco","Fashion"]},
  {id:108, name:"Photo Printing", price:500, img:"https://images.unsplash.com/photo-1452587925148-ce544e77e70d?q=80&w=600&auto=format&fit=crop", desc:"Small to large format — gloss, matte, lustre & framed.", tags:["Gloss","Matte"]},
  {id:109, name:"Photo Plates", price:5000, img:"https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=600&auto=format&fit=crop", desc:"Ceramic decorative plates for awards, memories & gifts.", tags:["Decor","Gift"]},
  {id:110, name:"Corporate Branding", price:5000, img:"https://images.unsplash.com/photo-1556761175-b413da4baf72?q=80&w=600&auto=format&fit=crop", desc:"Complete branding — logos, merchandise & promo items.", tags:["Business","Logo"]},
  {id:111, name:"Promotional Gifts", price:4000, img:"https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=600&auto=format&fit=crop", desc:"Branded gifts that keep your business top-of-mind.", tags:["Promo","Bulk"]},
  {id:112, name:"Wedding Souvenirs", price:3000, img:"https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=600&auto=format&fit=crop", desc:"Elegant wedding souvenirs — mugs, plates, bags & more.", tags:["Wedding","Elegant"]},
  {id:113, name:"Birthday Gifts", price:3000, img:"https://images.unsplash.com/photo-1530103862676-de8c9debad1d?q=80&w=600&auto=format&fit=crop", desc:"Personalized birthday surprises that wow.", tags:["Birthday","Fun"]},
  {id:114, name:"Event Merchandise", price:4000, img:"https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=600&auto=format&fit=crop", desc:"Concerts, conferences & festivals — custom merch.", tags:["Events","Bulk"]},
  {id:115, name:"Personalized Business Gifts", price:5000, img:"https://images.unsplash.com/photo-1513885535751-8b9238bd345a?q=80&w=600&auto=format&fit=crop", desc:"Executive gifts with premium finishing.", tags:["Executive","Premium"]},
];

const GALLERY = [
  {cat:"mugs", img:"https://images.unsplash.com/photo-1514228742587-6b1558cfcfd3?q=80&w=600&auto=format&fit=crop", cap:"Magic Mug — colour changing"},
  {cat:"tshirts", img:"https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=600&auto=format&fit=crop", cap:"Class 2024 Tees"},
  {cat:"caps", img:"https://images.unsplash.com/photo-1588850561407-ed78c282e89b?q=80&w=600&auto=format&fit=crop", cap:"Embroidered Face Cap"},
  {cat:"phone", img:"https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=600&auto=format&fit=crop", cap:"Custom iPhone Case"},
  {cat:"bags", img:"https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=600&auto=format&fit=crop", cap:"Branded Tote Bag"},
  {cat:"plates", img:"https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=600&auto=format&fit=crop", cap:"Wedding Photo Plate"},
  {cat:"corporate", img:"https://images.unsplash.com/photo-1556761175-b413da4baf72?q=80&w=600&auto=format&fit=crop", cap:"Corporate Gift Set"},
  {cat:"mugs", img:"https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=600&auto=format&fit=crop", cap:"Couple Mugs"},
  {cat:"tshirts", img:"https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=600&auto=format&fit=crop", cap:"Sublimation Jersey"},
  {cat:"caps", img:"https://images.unsplash.com/photo-1532241903570-6d65d8bed8ef?q=80&w=600&auto=format&fit=crop", cap:"Branded Trucker Cap"},
  {cat:"phone", img:"https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?q=80&w=600&auto=format&fit=crop", cap:"Anime Phone Case"},
  {cat:"bags", img:"https://images.unsplash.com/photo-1590874103328-eac38a683ce7?q=80&w=600&auto=format&fit=crop", cap:"School Backpack Print"},
];

let cart = JSON.parse(localStorage.getItem("adam_cart")||"[]");
let orders = JSON.parse(localStorage.getItem("adam_orders")||"[]");
let quotes = JSON.parse(localStorage.getItem("adam_quotes")||"[]");
let customProducts = JSON.parse(localStorage.getItem("adam_custom_products")||"null");
let currentProduct = null;
let showAll = false;

function save(){ localStorage.setItem("adam_cart", JSON.stringify(cart)); localStorage.setItem("adam_orders", JSON.stringify(orders)); localStorage.setItem("adam_quotes", JSON.stringify(quotes)); }

function getAllProducts(){ return customProducts ? customProducts : PRODUCTS; }

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("year").textContent = new Date().getFullYear();
  renderProducts();
  renderServices();
  renderPriceTable();
  renderGallery();
  updateCartUI();
  bindEvents();
  // admin stats refresh
  refreshAdminTables();
});

function bindEvents(){
  document.getElementById("hamburger").onclick = () => document.getElementById("mobileNav").classList.toggle("open");
  document.querySelectorAll("#mobileNav a").forEach(a=>a.onclick=()=>document.getElementById("mobileNav").classList.remove("open"));
  document.getElementById("cartBtn").onclick = openCart;
  document.getElementById("closeDrawer").onclick = closeCart;
  document.getElementById("drawerOverlay").onclick = closeCart;
  document.getElementById("searchBtn").onclick = openSearch;
  document.getElementById("loadMoreBtn").onclick = ()=>{ showAll=!showAll; renderProducts(); document.getElementById("loadMoreBtn").innerHTML = showAll ? 'Show Less <i class="fa-solid fa-chevron-up"></i>' : 'View All Products <i class="fa-solid fa-chevron-down"></i>'; };
  document.querySelectorAll("#categoryFilters .pill").forEach(btn=> btn.onclick = ()=> filterProducts(btn.dataset.filter, btn));
  document.querySelectorAll("#galleryFilters .pill").forEach(btn=> btn.onclick = ()=> filterGallery(btn.dataset.gfilter, btn));
  document.getElementById("enquiryForm").onsubmit = handleEnquiry;
  document.getElementById("checkoutForm").onsubmit = handleCheckout;
  document.getElementById("quoteForm").onsubmit = handleQuote;
  document.getElementById("mQty").oninput = syncLive;
  document.getElementById("mFile").onchange = e => { const f=e.target.files[0]; document.getElementById("mFileName").textContent = f ? f.name + ` (${Math.round(f.size/1024)} KB)` : "No file chosen"; if(f){ const r=new FileReader(); r.onload=()=> currentProduct._uploadPreview=r.result; r.readAsDataURL(f); } };
  document.getElementById("searchInput").oninput = e => doSearch(e.target.value);
  document.getElementById("langToggle").onclick = toggleLang;
  // smooth scroll active nav
  window.addEventListener("scroll", setActiveNav);
  // admin tabs
  document.querySelectorAll(".tab").forEach(t=> t.onclick=()=> switchTab(t.dataset.tab));
}

function setActiveNav(){
  const sections=["home","shop","services","prices","gallery","about","contact"];
  let cur="home";
  sections.forEach(id=>{ const el=document.getElementById(id); if(el && window.scrollY >= el.offsetTop-140) cur=id; });
  document.querySelectorAll(".nav_link").forEach(a=> a.classList.toggle("active", a.getAttribute("href")==="#"+cur));
}

function renderProducts(){
  const grid = document.getElementById("productGrid");
  const all = getAllProducts();
  const toShow = showAll ? all : all.slice(0,8);
  grid.innerHTML = toShow.map(p=> `
    <div class="product_card" data-cat="${p.cat}">
      <div class="product_media" onclick="openProduct(${p.id})"><img src="${p.img}" alt="${p.name}"><span class="badge_new">${p.badge}</span><span class="badge_cat">${p.category}</span></div>
      <div class="product_body">
        <h3>${p.name}</h3>
        <p>${p.desc}</p>
        <div class="price_row"><b>${NGN(p.base)}</b><span>Starting price</span></div>
        <div class="custom_opts"><span><i class="fa-solid fa-palette"></i> ${p.colors.slice(0,2).join(", ")}</span><span><i class="fa-solid fa-ruler"></i> ${p.sizes[0]}</span></div>
        <div class="card_actions"><button class="btn btn_outline_dark" onclick="openProduct(${p.id})">Customize</button><button class="btn btn_primary" onclick="quickAdd(${p.id})">Order Now</button></div>
      </div>
    </div>
  `).join("");
}

function filterProducts(cat, btn){
  document.querySelectorAll("#categoryFilters .pill").forEach(b=>b.classList.remove("active"));
  btn.classList.add("active");
  document.querySelectorAll(".product_card").forEach(c=>{
    c.style.display = (cat==="all" || c.dataset.cat===cat) ? "" : "none";
  });
}

function renderServices(){
  const grid=document.getElementById("servicesGrid");
  grid.innerHTML = SERVICES.map(s=> `
    <div class="service_card">
      <div class="service_media"><img src="${s.img}" alt="${s.name}"><div class="ov"></div><h3>${s.name}</h3></div>
      <div class="service_body">
        <div class="service_tags">${s.tags.map(t=>`<span>${t}</span>`).join("")}</div>
        <p>${s.desc}</p>
        <div class="service_meta"><b>From ${NGN(s.price)}</b><button class="btn btn_gold btn_sm" onclick="openService(${s.id})">Order Now</button></div>
      </div>
    </div>
  `).join("");
}
function openService(id){
  const s=SERVICES.find(x=>x.id===id);
  // map to nearest product or generic
  const prod = getAllProducts().find(p=> p.name.toLowerCase().includes(s.name.split(" ")[0].toLowerCase())) || getAllProducts()[0];
  openProduct(prod.id);
}

function renderPriceTable(){
  const tbody=document.getElementById("priceTableBody");
  const priceRows = [
    ["Customized Mug (11oz)",3000,"Any photo/text","Order Now"],
    ["Premium Mug (colour/box)",4500,"Gift-ready","Order Now"],
    ["Customized T-shirt",5000,"S–XXL, DTF/sublimation","Order Now"],
    ["Premium T-shirt (Polo)",7500,"Embroidery options","Order Now"],
    ["Customized Phone Case",4000,"All models","Order Now"],
    ["Customized Face Cap",3500,"Embroidery/sublimation","Order Now"],
    ["Customized Shopping Bag",3000,"Eco tote","Order Now"],
    ["Customized Backpack",8000,"Full-panel print","Order Now"],
    ["Photo Plate (8-inch)",5000,"With stand","Order Now"],
    ["Small Photo Print (4x6)",500,"Gloss/Matte","Order Now"],
    ["Medium Photo Print (8x10)",1500,"Lustre","Order Now"],
    ["Large Photo Print (12x16)",3500,"Framed optional","Order Now"],
    ["Simple Name/Text Design",1000,"1–2 revisions","Add Design"],
    ["Custom Product Design",2000,"Full artwork","Add Design"],
    ["Business Logo Design",5000,"3 concepts","Add Design"],
  ];
  // use editable prices from products where possible
  tbody.innerHTML = priceRows.map(r=> `
    <tr><td><b>${r[0]}</b></td><td><b style="color:var(--green)">${NGN(r[1])}</b><br><span style="font-size:11px;color:var(--muted)">Starting</span></td><td><span style="font-size:12px;background:#f1f5f9;padding:4px 8px;border-radius:999px">${r[2]}</span></td><td>${r[3].includes("Order")? '<button class="btn btn_gold btn_sm" onclick="openProduct(1)">Order Now</button>' : '<button class="btn btn_outline_dark btn_sm" onclick="openQuoteModal()">Request Quote</button>'}</td></tr>
  `).join("") + `<tr style="background:var(--gold-light)"><td colspan="4" style="text-align:center;font-weight:700;color:var(--green)">Bulk orders, school uniforms, corporate branding — <a href="#quote" onclick="openQuoteModal();return false" style="text-decoration:underline;color:var(--green)">Request a Quote</a> for best rates. Prices vary by quality, quantity & delivery.</td></tr>`;
}

function renderGallery(){
  const g=document.getElementById("galleryGrid");
  g.innerHTML = GALLERY.map(item=> `<div class="gallery_item" data-gcat="${item.cat}" onclick="openGalleryItem('${item.img}')"><img src="${item.img}" alt="${item.cap}"><div class="gcap">${item.cap}</div></div>`).join("");
}
function filterGallery(cat, btn){
  document.querySelectorAll("#galleryFilters .pill").forEach(b=>b.classList.remove("active")); btn.classList.add("active");
  document.querySelectorAll(".gallery_item").forEach(el=> el.style.display = (cat==="all" || el.dataset.gcat===cat) ? "" : "none");
}
function openGalleryItem(src){ window.open(src, "_blank"); }

/* Product Modal */
function openProduct(id){
  const p = getAllProducts().find(x=>x.id===id);
  if(!p) return;
  currentProduct = {...p};
  document.getElementById("mImg").src = p.img;
  document.getElementById("mTitle").textContent = p.name;
  document.getElementById("mDesc").textContent = p.desc;
  document.getElementById("mPrice").textContent = NGN(p.base);
  document.getElementById("mPriceNote").textContent = "Starting price • Final confirmed after artwork review";
  document.getElementById("mBadge").textContent = p.badge + " • " + p.category;
  document.getElementById("mColor").innerHTML = p.colors.map(c=> `<option>${c}</option>`).join("");
  document.getElementById("mSize").innerHTML = p.sizes.map(s=> `<option>${s}</option>`).join("");
  document.getElementById("mQty").value=1;
  document.getElementById("mText").value="";
  document.getElementById("mNotes").value="";
  document.getElementById("mFile").value="";
  document.getElementById("mFileName").textContent="No file chosen — you can add later via WhatsApp";
  document.getElementById("mQtyLive").textContent="1";
  document.getElementById("mLiveTotal").textContent=NGN(p.base);
  document.getElementById("mThumbs").innerHTML = `<img src="${p.img}" class="active"><img src="https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=200&auto=format&fit=crop"><img src="https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=200&auto=format&fit=crop">`;
  document.getElementById("productModal").classList.add("open");
  syncLive();
}
function closeProductModal(){ document.getElementById("productModal").classList.remove("open"); }
function chgQty(d){ const i=document.getElementById("mQty"); i.value=Math.max(1, parseInt(i.value||1)+d); syncLive(); }
function syncLive(){
  if(!currentProduct) return;
  const qty = Math.max(1, parseInt(document.getElementById("mQty").value||1));
  document.getElementById("mQtyLive").textContent=qty;
  document.getElementById("mLiveTotal").textContent=NGN(currentProduct.base*qty);
  document.getElementById("mQty").value=qty;
}
function addToCart(){
  const qty = Math.max(1, parseInt(document.getElementById("mQty").value||1));
  const item = {
    id: Date.now(),
    pid: currentProduct.id,
    name: currentProduct.name,
    img: currentProduct.img,
    price: currentProduct.base,
    qty, color: document.getElementById("mColor").value,
    size: document.getElementById("mSize").value,
    text: document.getElementById("mText").value,
    notes: document.getElementById("mNotes").value,
    uploadName: document.getElementById("mFile").files[0]?.name || ""
  };
  cart.push(item);
  save(); updateCartUI(); closeProductModal(); toast("Added to cart — " + item.name); openCart();
}
function quickAdd(id){ openProduct(id); setTimeout(addToCart, 300); }

/* Cart */
function updateCartUI(){
  document.getElementById("cartCount").textContent = cart.reduce((a,b)=>a+b.qty,0);
  document.getElementById("drawerCount").textContent = cart.reduce((a,b)=>a+b.qty,0);
  const body=document.getElementById("drawerBody");
  if(cart.length===0){ body.innerHTML=`<div style="text-align:center;padding:30px 10px;color:var(--muted)"><i class="fa-solid fa-bag-shopping" style="font-size:36px;color:#cbd5e1"></i><p>Your cart is empty</p><a href="#shop" onclick="closeCart()" class="btn btn_primary btn_sm">Start Shopping</a></div>`; }
  else {
    body.innerHTML = cart.map((it, idx)=> `
      <div class="drawer_item">
        <img src="${it.img}" alt="">
        <div style="flex:1">
          <h4>${it.name}</h4>
          <p>${it.color} • ${it.size} ${it.text? '• "'+it.text+'"' : ''}</p>
          <p><b style="color:var(--green)">${NGN(it.price)}</b> x ${it.qty} = <b>${NGN(it.price*it.qty)}</b></p>
          <div class="qty"><button onclick="updateQty(${idx},-1)">−</button><span>${it.qty}</span><button onclick="updateQty(${idx},1)">+</button><button onclick="removeItem(${idx})" style="margin-left:8px;background:#fee2e2;border-color:#fecaca;color:#b91c1c;padding:4px 8px;border-radius:6px"><i class="fa-solid fa-trash"></i></button></div>
        </div>
      </div>
    `).join("");
  }
  const subtotal = cart.reduce((a,b)=>a+b.price*b.qty,0);
  document.getElementById("drawerSubtotal").textContent = NGN(subtotal);
  document.getElementById("drawerTotal").textContent = subtotal ? NGN(subtotal) + " + delivery" : NGN(0);
  // checkout mirrors
  document.getElementById("chkSubtotal").textContent = NGN(subtotal);
  document.getElementById("chkTotal").textContent = subtotal ? NGN(subtotal) + " + delivery" : NGN(0);
  document.getElementById("checkoutItems").innerHTML = cart.map(it=> `
    <div class="checkout_item"><img src="${it.img}"><div><b>${it.name}</b><br><span style="font-size:12px;color:var(--muted)">${it.color}/${it.size} • Qty ${it.qty}</span><br><b style="color:var(--green)">${NGN(it.price*it.qty)}</b></div></div>
  `).join("") || '<p class="muted">No items yet.</p>';
  document.getElementById("chkSummary").innerHTML = cart.map(it=> `<div style="display:flex;justify-content:space-between;font-size:13px"><span>${it.name} x${it.qty}</span><b>${NGN(it.price*it.qty)}</b></div>`).join("") + (cart.length? `<div style="display:flex;justify-content:space-between;border-top:1px solid var(--border);padding-top:8px;margin-top:8px"><span>Subtotal</span><b>${NGN(subtotal)}</b></div>` : "");
}
function updateQty(idx,d){ cart[idx].qty=Math.max(1, cart[idx].qty+d); save(); updateCartUI(); }
function removeItem(idx){ cart.splice(idx,1); save(); updateCartUI(); toast("Item removed"); }
function openCart(){ document.getElementById("cartDrawer").classList.add("open"); document.getElementById("drawerOverlay").classList.add("open"); }
function closeCart(){ document.getElementById("cartDrawer").classList.remove("open"); document.getElementById("drawerOverlay").classList.remove("open"); }
function openCheckout(){ closeCart(); document.getElementById("checkoutModal").classList.add("open"); updateCartUI(); }
function closeCheckout(){ document.getElementById("checkoutModal").classList.remove("open"); }

function checkoutViaWhatsApp(){
  if(cart.length===0){ toast("Your cart is empty"); return; }
  const subtotal = cart.reduce((a,b)=>a+b.price*b.qty,0);
  let msg = `Hello Adam Custom Printing! %0A%0AI would like to order:%0A`;
  cart.forEach((it, i)=>{ msg += `${i+1}. ${it.name} — ${it.color}/${it.size} — Qty: ${it.qty} — ${NGN(it.price*it.qty)}%0A   ${it.text? 'Text: '+encodeURIComponent(it.text)+'%0A   ':''}${it.notes? 'Notes: '+encodeURIComponent(it.notes)+'%0A':''}`; });
  msg += `%0ASubtotal: ${encodeURIComponent(NGN(subtotal))} (delivery to be confirmed)%0APlease confirm availability and total with delivery to Kano.%0A%0A*Note: Order via WhatsApp — not confirmed until you reply.*`;
  window.open(`https://wa.me/${WA_NUM}?text=${msg}`, "_blank");
  toast("Opening WhatsApp — your order details are pre-filled");
}
function orderSingleViaWhatsApp(){
  const qty=document.getElementById("mQty").value;
  const color=document.getElementById("mColor").value;
  const size=document.getElementById("mSize").value;
  const text=document.getElementById("mText").value;
  const notes=document.getElementById("mNotes").value;
  const price=currentProduct.base*qty;
  let msg=`Hello Adam Custom Printing! I want to order: ${encodeURIComponent(currentProduct.name)} — Colour: ${encodeURIComponent(color)} — Size: ${encodeURIComponent(size)} — Qty: ${qty} — Estimated: ${encodeURIComponent(NGN(price))}%0A`;
  if(text) msg+=`Custom Text: ${encodeURIComponent(text)}%0A`;
  if(notes) msg+=`Notes: ${encodeURIComponent(notes)}%0A`;
  msg+=`Please confirm.`;
  window.open(`https://wa.me/${WA_NUM}?text=${msg}`, "_blank");
}
function handleCheckout(e){
  e.preventDefault();
  if(cart.length===0){ toast("Add items to cart first"); return; }
  const fd=new FormData(e.target);
  const subtotal= cart.reduce((a,b)=>a+b.price*b.qty,0);
  const ref = "ADM-" + Date.now().toString().slice(-6) + Math.floor(Math.random()*90+10);
  const order={ ref, name:fd.get("cName"), phone:fd.get("cPhone"), email:fd.get("cEmail"), delivery:fd.get("delivery"), address:fd.get("cAddress"), quote:fd.get("cQuote"), items:[...cart], subtotal, deliveryFee: fd.get("delivery")==="pickup"?0:1500, total: subtotal + (fd.get("delivery")==="pickup"?0:1500), status:"Pending Review", date:new Date().toISOString() };
  orders.unshift(order);
  lastSuccessRef=ref; lastSuccessItems=[...cart];
  cart=[]; save(); updateCartUI(); closeCheckout(); refreshAdminTables();
  document.getElementById("successRef").textContent=ref;
  document.getElementById("successModal").classList.add("open");
  e.target.reset();
}
function closeSuccess(){ document.getElementById("successModal").classList.remove("open"); }
function sendSuccessWhatsApp(){
  if(!lastSuccessRef) return;
  const subtotal= lastSuccessItems.reduce((a,b)=>a+b.price*b.qty,0);
  let msg=`Hello Adam Custom Printing! I just submitted Order *${lastSuccessRef}*:%0A`;
  lastSuccessItems.forEach((it,i)=> msg+=`${i+1}. ${encodeURIComponent(it.name)} x${it.qty} — ${encodeURIComponent(NGN(it.price*it.qty))}%0A`);
  msg+=`Total estimated: ${encodeURIComponent(NGN(subtotal))} + delivery%0APlease confirm.`;
  window.open(`https://wa.me/${WA_NUM}?text=${msg}`, "_blank");
}
function preparePaystack(){ toast("Payment gateway not yet configured — complete Paystack/Flutterwave setup in Admin > Settings. You can still submit order for confirmation."); }

/* Quote */
function openQuoteModal(){ document.getElementById("quoteModal").classList.add("open"); }
function closeQuoteModal(){ document.getElementById("quoteModal").classList.remove("open"); }
function handleQuote(e){
  e.preventDefault();
  const fd=new FormData(e.target);
  quotes.unshift({ id:Date.now(), name:fd.get("qName"), phone:fd.get("qPhone"), org:fd.get("qOrg"), details:fd.get("qDetails"), budget:fd.get("qBudget"), date:new Date().toLocaleString() });
  save(); refreshAdminTables();
  let msg=`Hello Adam Custom Printing! I need a QUOTE:%0AName: ${encodeURIComponent(fd.get("qName"))}%0APhone: ${encodeURIComponent(fd.get("qPhone"))}%0AOrg: ${encodeURIComponent(fd.get("qOrg"))}%0ADetails: ${encodeURIComponent(fd.get("qDetails"))}%0ABudget: ${encodeURIComponent(fd.get("qBudget"))}`;
  window.open(`https://wa.me/${WA_NUM}?text=${msg}`, "_blank");
  e.target.reset(); closeQuoteModal(); toast("Quote request sent via WhatsApp");
}

/* Enquiry */
function handleEnquiry(e){
  e.preventDefault();
  const fd=new FormData(e.target);
  let msg=`Hello Adam Custom Printing! Enquiry:%0AName: ${encodeURIComponent(fd.get("name"))}%0APhone: ${encodeURIComponent(fd.get("phone"))}%0AEmail: ${encodeURIComponent(fd.get("email")||"")}%0ASubject: ${encodeURIComponent(fd.get("subject"))}%0AMessage: ${encodeURIComponent(fd.get("message"))}`;
  window.open(`https://wa.me/${WA_NUM}?text=${msg}`, "_blank");
  toast("Enquiry ready — sending via WhatsApp");
  e.target.reset();
}

/* Search */
function openSearch(){ document.getElementById("searchModal").classList.add("open"); document.getElementById("searchInput").focus(); doSearch(""); }
function closeSearch(){ document.getElementById("searchModal").classList.remove("open"); }
function doSearch(q){
  const all=getAllProducts();
  const res = q ? all.filter(p=> (p.name+p.desc).toLowerCase().includes(q.toLowerCase())) : all.slice(0,6);
  document.getElementById("searchResults").innerHTML = res.map(p=> `<div class="sitem" onclick="closeSearch();openProduct(${p.id})"><img src="${p.img}" style="width:64px;height:64px;object-fit:cover;border-radius:8px"><div><b>${p.name}</b><br><span style="font-size:12px;color:var(--muted)">${p.desc.slice(0,60)}</span><br><b style="color:var(--green)">${NGN(p.base)}</b></div></div>`).join("") || '<p class="muted">No results</p>';
}

/* Policies */
const policies={
  delivery:`<h2>Delivery & Collection</h2><p>Kano City delivery: ₦1,000–₦3,000 depending on area. Outside Kano: calculated at checkout via courier partner. Most single-item orders ready in 24–48 hours; bulk orders 3–7 days. You will receive a confirmation message with pickup location or dispatch details.</p><ul><li>Pickup is free from our Kano studio (address provided on confirmation)</li><li>Delivery fees shown separately at checkout</li><li>Delays may occur during festive peaks — we notify in advance</li></ul>`,
  refund:`<h2>Refund & Reprint Policy</h2><p>We check every print before dispatch. If you receive a defective or incorrect print (wrong colour/design/quantity), contact us within 48 hours with photos.</p><ul><li>Reprint or replacement at no extra cost for verified errors</li><li>Refunds available for unstarted orders (before printing)</li><li>Custom personalized items cannot be returned if correct as approved</li></ul><p>WhatsApp: 0701 000 0001</p>`,
  privacy:`<h2>Privacy Policy</h2><p>We collect name, phone, email, address and uploaded artwork solely to process your order. We never store card PINs or security codes. Payments are processed securely via Paystack/Flutterwave after configuration.</p><ul><li>Your uploads are used only for printing your order</li><li>We do not share your data with third parties except delivery partners</li><li>Contact us to delete your data: adam0903031@gmail.com</li></ul>`,
  terms:`<h2>Terms of Service</h2><p>By ordering, you confirm you own rights to uploaded images/logos. Prohibited content (hate, explicit) will be rejected. Prices are provisional starting prices; final price confirmed after artwork review considering quality, quantity, dimensions, design complexity & delivery.</p><ul><li>Quotations for bulk/corporate are estimates until confirmed</li><li>Opening WhatsApp does not confirm an order — wait for our confirmation message with reference</li><li>We reserve the right to refuse orders that violate policy</li></ul>`
};
function openPolicy(key){ document.getElementById("policyContent").innerHTML=policies[key]; document.getElementById("policyModal").classList.add("open"); }
function closePolicy(){ document.getElementById("policyModal").classList.remove("open"); }
function subscribe(e){ e.preventDefault(); toast("Subscribed! Check your email for updates."); e.target.reset(); }

/* Admin */
function adminLogin(e){
  e.preventDefault();
  if(document.getElementById("adminPass").value==="admin123"){
    document.getElementById("adminLogin").style.display="none";
    document.getElementById("adminPanel").style.display="block";
    refreshAdminTables();
    toast("Welcome, Admin");
  } else toast("Incorrect password — demo: admin123");
}
function adminLogout(){ document.getElementById("adminPanel").style.display="none"; document.getElementById("adminLogin").style.display="block"; }
function switchTab(name){
  document.querySelectorAll(".tab").forEach(t=>t.classList.toggle("active", t.dataset.tab===name));
  document.querySelectorAll(".tab_pane").forEach(p=>p.classList.toggle("active", p.id==="tab-"+name));
}
function refreshAdminTables(){
  // stats
  const rev = orders.reduce((a,b)=>a+b.total,0);
  if(document.getElementById("statProducts")) document.getElementById("statProducts").textContent=getAllProducts().length;
  if(document.getElementById("statOrders")) document.getElementById("statOrders").textContent=orders.length;
  if(document.getElementById("statRevenue")) document.getElementById("statRevenue").textContent=NGN(rev);
  if(document.getElementById("statQuotes")) document.getElementById("statQuotes").textContent=quotes.length;
  // products
  const pb=document.getElementById("adminProductsBody");
  if(pb) pb.innerHTML=getAllProducts().map(p=> `<tr><td><b>${p.name}</b><br><span style="font-size:11px;color:var(--muted)">${p.cat}</span></td><td><input type="number" value="${p.base}" style="width:100px;padding:6px;border:1px solid #ddd;border-radius:6px" onchange="updatePrice(${p.id},this.value)"></td><td>${p.category}</td><td><button class="btn btn_outline_dark btn_sm" onclick="editProduct(${p.id})">Edit</button> <button class="btn" style="background:#fee2e2;color:#b91c1c;padding:6px 10px;border-radius:8px;border:1px solid #fecaca" onclick="deleteProduct(${p.id})">Delete</button></td></tr>`).join("");
  // orders
  const ob=document.getElementById("adminOrdersBody");
  if(ob) ob.innerHTML= orders.map(o=> `<tr><td><b>${o.ref}</b><br><span style="font-size:11px">${new Date(o.date).toLocaleDateString()}</span></td><td>${o.name}<br><a href="tel:${o.phone}" style="color:var(--green)">${o.phone}</a></td><td>${o.items.map(i=>i.name+" x"+i.qty).join("<br>")}</td><td><b>${NGN(o.total)}</b><br><span style="font-size:11px">${o.delivery}</span></td><td><span style="background:${o.status.includes('Completed')?'#dcfce7':'#fef9c3'};padding:4px 8px;border-radius:999px;font-size:11px;font-weight:700">${o.status}</span></td><td><select onchange="updateOrderStatus('${o.ref}',this.value)"><option>Pending Review</option><option>In Production</option><option>Ready for Pickup</option><option>Dispatched</option><option>Completed</option></select></td></tr>`).join("") || '<tr><td colspan="6" style="text-align:center;color:var(--muted)">No orders yet</td></tr>';
  // quotes
  const qb=document.getElementById("adminQuotesBody");
  if(qb) qb.innerHTML= quotes.map(q=> `<div style="border:1px solid var(--border);padding:12px;border-radius:12px;margin-bottom:10px;background:#fff"><b>${q.name} — ${q.phone}</b> <span style="font-size:11px;color:var(--muted)">${q.date}</span><p style="margin:6px 0;font-size:13px">${q.details}</p><p style="font-size:12px">Org: ${q.org||"-"} | Budget: ${q.budget||"-"}</p></div>`).join("") || '<p class="muted">No quotes yet</p>';
}
function updatePrice(id,val){ 
  let arr = customProducts ? [...customProducts] : [...PRODUCTS];
  const idx=arr.findIndex(p=>p.id===id); if(idx>-1){ arr[idx].base=parseInt(val)||arr[idx].base; customProducts=arr; localStorage.setItem("adam_custom_products", JSON.stringify(customProducts)); renderProducts(); renderPriceTable(); toast("Price updated — "+NGN(val)); refreshAdminTables(); }
}
function addProduct(){
  const name=prompt("Product name:"); if(!name) return;
  const price=parseInt(prompt("Starting price (NGN):","3000")); if(!price) return;
  const cat=prompt("Category (mug/apparel/accessories/photo/corporate):","mug")||"mug";
  const arr = customProducts ? [...customProducts] : [...PRODUCTS];
  arr.push({id:Date.now(), name, base:price, cat, category:cat, img:"https://images.unsplash.com/photo-1514228742587-6b1558cfcfd3?q=80&w=600&auto=format&fit=crop", desc:"New product — edit description in Admin.", colors:["White","Black"], sizes:["One Size"], badge:"New"});
  customProducts=arr; localStorage.setItem("adam_custom_products", JSON.stringify(customProducts)); renderProducts(); refreshAdminTables(); toast("Product added");
}
function editProduct(id){
  const arr = customProducts ? [...customProducts] : [...PRODUCTS];
  const p=arr.find(x=>x.id===id); const nn=prompt("Edit name:",p.name); if(nn){ p.name=nn; customProducts=arr; localStorage.setItem("adam_custom_products", JSON.stringify(customProducts)); renderProducts(); refreshAdminTables(); }
}
function deleteProduct(id){ if(!confirm("Delete product?")) return; let arr= customProducts ? [...customProducts] : [...PRODUCTS]; arr=arr.filter(p=>p.id!==id); customProducts=arr; localStorage.setItem("adam_custom_products", JSON.stringify(customProducts)); renderProducts(); refreshAdminTables(); toast("Product deleted"); }
function updateOrderStatus(ref, status){ const o=orders.find(x=>x.ref===ref); if(o){ o.status=status; save(); refreshAdminTables(); toast("Order "+ref+" → "+status); }}
function exportOrders(){
  if(orders.length===0){ toast("No orders to export"); return; }
  let csv="Ref,Name,Phone,Items,Total,Status,Date\n";
  orders.forEach(o=>{ csv+=`"${o.ref}","${o.name}","${o.phone}","${o.items.map(i=>i.name+" x"+i.qty).join("; ")}","${o.total}","${o.status}","${o.date}"\n`; });
  const blob=new Blob([csv],{type:"text/csv"}); const url=URL.createObjectURL(blob); const a=document.createElement("a"); a.href=url; a.download="adam_orders.csv"; a.click(); URL.revokeObjectURL(url); toast("Orders exported CSV");
}
function saveSettings(e){ e.preventDefault(); toast("Business settings saved (demo — connect database for persistence)"); }

function toggleLang(){
  currentLang = currentLang==="en" ? "ha" : "en";
  document.getElementById("langToggle").innerHTML = currentLang==="en" ? "EN | HA <i class='fa-solid fa-globe'></i>" : "HA | EN <i class='fa-solid fa-globe'></i>";
  if(currentLang==="ha"){
    document.querySelector(".hero_content h1").innerHTML = "Ka Kawo Ra'ayoyinka Rayuwa <span>da Buga na Musamman!</span>";
    toast("An sauya harshe zuwa Hausa — fassarar cikakkar na nan tafe.");
  } else {
    document.querySelector(".hero_content h1").innerHTML = "Bring Your Ideas to Life <span>with Custom Printing!</span>";
    toast("Switched to English");
  }
}

// Close modals on overlay click
document.addEventListener("click", e=>{
  if(e.target.classList.contains("modal_overlay")) e.target.classList.remove("open");
});

// Toast
function toast(msg){
  const t=document.getElementById("toast");
  t.textContent=msg; t.classList.add("show");
  setTimeout(()=>t.classList.remove("show"), 3000);
}
