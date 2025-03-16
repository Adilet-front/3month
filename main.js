const url = "http://localhost:3000/products";

const Description2 = document.querySelector(".Description2");
const closeButton = document.querySelector("#closeButton");

const openCart = document.querySelector(".cart");
const closeCart = document.querySelector(".closeCart");
const wrapperCart = document.querySelector(".cartWrapper");
const items = document.querySelector(".items");
const add = document.querySelector(".add");
const module = document.querySelector(".module");
const moduleClose = document.querySelector(".moduleClose");
const addProduct = document.querySelector(".moduleAdd");

const title = document.querySelector("#title");
const price = document.querySelector("#price");
const description = document.querySelector("#description");
const category = document.querySelector("#category");
const image = document.querySelector("#image");
const rate = document.querySelector("#rate");
const count = document.querySelector("#count");
const categoryFilter = document.querySelector(".category");



addProduct.addEventListener("click", async (e) => {
  e.preventDefault();
  const newProduct = {
    id: `${Math.floor(Math.random() * 10000)}`,
    title: title.value,
    price: price.value,
    description: description.value,
    category: category.value,
    image: image.value,
    rating: {
      rate: rate.value,
      count: count.value,
    },
  };

  await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newProduct),
  });
});



add.addEventListener("click", () => {
  module.classList.add("openModule");
});

add.addEventListener("click", () => {
  Description2.classList.Description2("openDescription");
});

closeButton.addEventListener("click", () => {
  Description2.classList.remove("openDescription");
});

moduleClose.addEventListener("click", () => {
  module.classList.remove("openCart");
});

openCart.addEventListener("click", () => {
  wrapperCart.classList.add("openCart");
});

closeCart.addEventListener("click", () => {
  wrapperCart.classList.remove("openCart");
});

let products = [];
let productCategory = [];

fetch(url)
  .then((res) => res.json())
  .then((data) => {
    displayData(data);
  })
  .catch((error) => console.error("ошибка", error));
function displayData(data) {
  const descriptions = document.createElement("p");
  const image = document.createElement("img");

  descriptions.textContent = data.description;
  image.src = data.image;
}
const openDescription = () => {
  
  if (id) {
    addDescription.textContent = "description";
    module.classList.add("openDescription");
  }
};

fetch(url)
  .then((res) => res.json())
  .then((json) => json);

const editProduct = (id) => {
  if (id) {
    addProduct.textContent = "edit";
    module.classList.add("openModule");
    const product = products.filter((el) => el.id !== id);
    title.value = product[0].title;
  }
};
// item
const renderCategory = (newProduct) => {
  categoryFilter.innerHTML = "";

  productCategory.forEach((el) => {
    const p = document.createElement("p");
    p.textContent = el;
    p.addEventListener("click", () => {
      let listCategory = [];
      if (p.textContent === "All") {
        listCategory = products;
      } else {
        listCategory = products.filter((el) => el.category === p.textContent);
      }
      renderProducts(listCategory);
    });
    categoryFilter.appendChild(p);
  });
};

const renderMoreInfo = (product) => {
  Description2.innerHTML = "";

///////////////////////////////////////////////////////////////////////////////////////////
  Description2.innerHTML += `

    <div class="contMoreInfo">
      <div class="contImage">
        <img src="${product.image}" alt="${product.title}">
      </div>
      <h2>${product.title}</h2>
      <p>${product.description}</p>
      <p>Цена: $${product.price}</p>

    </div>
  `;
};

//items
const renderProducts = (newProduct = products) => {
  items.innerHTML = "";
  newProduct.forEach((product) => {
    items.innerHTML += `
			<div class='item'>
				<div class='image'>
					<img src="${product.image}" alt="image">
				</div>
				<h2>${product.title}</h2>
				<div class='bottomItem'>
					<p>${product.price}</p>
					<button>Add</button>
					<button id="${product.id}" class="delete">delete</button>
					<div class="fullDescription">
						<button id="${product.id}" >description</button>
					</div>
					<button id="${product.id}" class="edit">edit</button>
				</div>
        
			</div>`;
  });

  const deletes = document.querySelectorAll(".delete");
  const edits = document.querySelectorAll(".edit");

  const fullDescription = document.querySelectorAll(".fullDescription");


  fullDescription.forEach((el) => {
    el.addEventListener("click", (event) => {
      const productId = event.target.id;
      fetchProduct(productId);
      Description2.classList.add("openDescription");
    });
  });

  edits.forEach((button) => {
    button.addEventListener("click", () => {
      editProduct(button.id);
    });
  });

  deletes.forEach((button) => {
    button.addEventListener("click", () => {
      products = products.filter((el) => el.id !== button.id);
      renderProducts();
      fetch(`${url}/${button.id}`, {
        method: "DELETE",
      });
    });
  });
};

const fetchProduct = async (id) => {
  try {
    const response = await fetch(`${url}/${id}`);
    if (!response.ok) {
      throw new Error(`error: ${response.statusText}`);
    }
    const product = await response.json();
    renderMoreInfo(product);
  } catch (error) {
    console.error("error:", error);
    Description2.innerHTML = "<p>error.</p>";
  }
};

const startApp = () => {
  fetch(url)
    .then((res) => res.json())
    .then((productsData) => {
      products = productsData;
      productCategory = new Set([
        ...productsData.map((el) => el.category),
        "All",
      ]);
      renderProducts();
      renderCategory();
    });
};
fetchProduct()

startApp();
