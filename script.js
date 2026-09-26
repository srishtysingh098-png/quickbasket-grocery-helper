let groceryItems = [];

function addItem() {
    const itemName = document.getElementById("itemName").value.trim();
    const quantity = document.getElementById("quantity").value;
    const category = document.getElementById("category").value;

    if (itemName === "" || quantity === "" || category === "") {
        alert("Please fill all the fields!");
        return;
    }

    const item = {
        id: Date.now(),
        name: itemName,
        quantity: Number(quantity),
        category: category,
        purchased: false
    };

    groceryItems.push(item);

    document.getElementById("itemName").value = "";
    document.getElementById("quantity").value = "1";
    document.getElementById("category").value = "";

    displayItems();
}

function displayItems(items = groceryItems) {
    const groceryList = document.getElementById("groceryList");

    groceryList.innerHTML = "";

    if (items.length === 0) {
        groceryList.innerHTML =
            '<p class="empty">No grocery items found.</p>';
        updateStats();
        return;
    }

    items.forEach(function(item) {

        const groceryItem = document.createElement("div");
        groceryItem.className = "grocery-item";

        groceryItem.innerHTML = `
            <div class="item-info ${item.purchased ? "purchased" : ""}">
                <strong>${item.name}</strong>
                <span class="item-category">${item.category}</span>
            </div>

            <span class="item-quantity">
                × ${item.quantity}
            </span>

            <div class="action-buttons">

                <button class="buy-btn"
                    onclick="togglePurchased(${item.id})">
                    ${item.purchased ? "Undo" : "Purchased"}
                </button>

                <button class="delete-btn"
                    onclick="deleteItem(${item.id})">
                    Delete
                </button>

            </div>
        `;

        groceryList.appendChild(groceryItem);
    });

    updateStats();
}

function togglePurchased(id) {

    groceryItems = groceryItems.map(function(item) {

        if (item.id === id) {
            item.purchased = !item.purchased;
        }

        return item;
    });

    displayItems();
}

function deleteItem(id) {

    groceryItems = groceryItems.filter(function(item) {
        return item.id !== id;
    });

    displayItems();
}

function updateStats() {

    const total = groceryItems.length;

    const purchased = groceryItems.filter(function(item) {
        return item.purchased;
    }).length;

    const remaining = total - purchased;

    document.getElementById("totalItems").textContent = total;
    document.getElementById("purchasedItems").textContent = purchased;
    document.getElementById("remainingItems").textContent = remaining;
}

function searchItems() {

    const searchText =
        document.getElementById("search").value.toLowerCase();

    const filteredItems = groceryItems.filter(function(item) {

        return (
            item.name.toLowerCase().includes(searchText) ||
            item.category.toLowerCase().includes(searchText)
        );

    });

    displayItems(filteredItems);
}
