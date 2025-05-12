document.addEventListener("alpine:init", () => {
  Alpine.data("products", () => ({
    items: [
      {
        id: 1,
        name: "kopi mentah 250gram",
        img: "biji-kopi.jpg",
        price: 30000,
        // diskon: 55000,
      },
      {
        id: 2,
        name: "coklat dubai 250gram",
        img: "coklat-dubai.jpg",
        price: 25000,
        // diskon:"RP 1.000.000"
      },
      {
        id: 3,
        name: "jaMalone 100ML",
        img: "minyak-wangi.jpg",
        price: 880000,
        diskon: "RP",
      },
      {
        id: 4,
        name: "puding matcha wenak tenan",
        img: "puding-matcha.jpg",
        price: 45000,
      },
    ],
  }));

  Alpine.store("cart", {
    items: [],
    total: 0,
    quantity: 0,
    add(newItem) {
      // cek apakah ada barang yang sama di cart
      const cartItem = this.items.find((item) => item.id === newItem.id);

      // jika belum ada/ cart masih kosong
      if (!cartItem) {
        this.items.push({ ...newItem, quantity: 1, total: newItem.price });
        this.quantity++;
        this.total += newItem.price;
      } else {
        // jika barang sudah ada, cek apakah barang sama atau tidak
        this.items = this.items.map((item) => {
          // jika barng berbeda
          if (item.id !== newItem.id) {
            return item;
          } else {
            item.quantity++;
            item.total = item.price * item.quantity;
            this.quantity++;
            this.total += item.price;
            return item;
          }
        });
      }
    },
    remove(id) {
      const cartItem = this.items.find((item) => item.id === id);

      if (cartItem.quantity > 1) {
        this.items = this.items.map((item) => {
          if (item.id !== id) {
            return item;
          } else {
            item.quantity--;
            item.total = item.price * item.quantity;
            this.quantity--;
            this.total -= item.price;
            return item;
          }
        });
      } else if (cartItem.quantity === 1) {
        this.items = this.items.filter((item) => item.id !== id);
        this.quantity--;
        this.total -= cartItem.price;
      }
    },
  });
});

// form validation

const checkoutButton = document.querySelector(".co-btn");
checkoutButton.disabled = true;

const form = document.querySelector("#checkoutForm");

form.addEventListener("keyup", function () {
  for (let i = 0; i < form.elements.length; i++) {
    if (form.elements[i].value.length !== 0) {
      checkoutButton.classList.remove("disabled");
      checkoutButton.classList.add("disabled");
    } else {
      return false;
    }
  }

  checkoutButton.disabled = false;
  checkoutButton.classList.remove("disabled");
});

// kirim data ketika tombol di klik

checkoutButton.addEventListener("click", function (e) {
  e.preventDefault();
  const formData = new FormData(form);
  const data = new URLSearchParams(formData);
  const objData = Object.fromEntries(data);
  const massage = formatMasage(objData);
  window.open(
    "https://api.whatsapp.com/send/?phone=%2B6288296759533&text&type=phone_number&app_absent=0?text=" +
      encodeURIComponent(massage)
  );
});

// format pesan whatsapp

const formatMasage = (obj) => {
  return `Data Customer
    Nama: ${obj.name}
    Email ${obj.email}
    No HP ${obj.phone}

Data Pesanan
${JSON.parse(obj.items).map(
  (item) => `${item.name} (${item.quantity} x ${rupiah(item.total)})\n`
)}
    TOTAL: ${rupiah(obj.total)}
    Terima Kasih. `;
};

// konfersi ke rp

const rupiah = (number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(number);
};
