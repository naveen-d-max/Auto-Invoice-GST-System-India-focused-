function addItem() {
  const div = document.createElement("div");

  div.innerHTML = `
    <input placeholder="Item Name" class="name">
    <input placeholder="Price" class="price" type="number">
    <input placeholder="Qty" class="qty" type="number">
  `;

  document.getElementById("items").appendChild(div);
}

async function generate() {
  const customerName = document.getElementById("customer").value;
  const gstRate = parseFloat(document.getElementById("gst").value);

  const names = document.querySelectorAll(".name");
  const prices = document.querySelectorAll(".price");
  const qtys = document.querySelectorAll(".qty");

  let items = [];

  for (let i = 0; i < names.length; i++) {
    items.push({
      name: names[i].value,
      price: parseFloat(prices[i].value),
      quantity: parseInt(qtys[i].value)
    });
  }

  const response = await fetch("http://localhost:5000/generate-invoice", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ customerName, items, gstRate })
  });

  const blob = await response.blob();
  const url = window.URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "invoice.pdf";
  a.click();
}
