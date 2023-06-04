const menuContainer = document.getElementById("menu-container");

//get menu function
const getMenu = async () => {
  let response, result;

  try {
    response = await fetch(
      "https://raw.githubusercontent.com/saksham-accio/f2_contest_3/main/food.json"
    );
    result = await response.json();
  } catch (err) {
    throw new Error("Menu could not loaded");
  }

  result.forEach((item) => {
    const menu = document.createElement("div");
    menu.className = "card";
    menu.innerHTML = `
         <img class="menu-img" src=${item.imgSrc}"/>
           <span>${item.name}</span>
           <span><b>Price: </b>$${item.price}</span>  
        `;
    menuContainer.append(menu);
  });
};

//Take Order function
const TakeOrder = () => {
  return new Promise((resolve, reject) => {
    setTimeout(
      () =>
        resolve({ order: ["Cheeseburger", "Chicken Burger", "Veggie Burger"] }),
      2500
    );
  });
};

//order prep function
const orderPrep = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve({ order_status: true, paid: false }), 1500);
  });
};

// pay order function
const payOrder = (order) => {
  if (order.order_status) {
    return new Promise((resolve, reject) => {
      setTimeout(() => resolve({ order_status: true, paid: true }), 1000);
    });
  } else {
    throw new Error("Order could not placed");
  }
};

// thank you function
const thankyouFnc = (order) => {
  if (order.order_status && order.paid) {
    alert("thankyou for eating with us today!");
  } else {
    throw new Error("Order not paid");
  }
};

getMenu()
  .then(() => TakeOrder())
  .then((data) => {
    console.log("Order", data.order);
    return orderPrep(data);
  })
  .then((orderStatus) => {
    console.log("Order Status after orderPrep", orderStatus);
    return payOrder(orderStatus);
  })
  .then((orderStatus) => {
    console.log("Order Status before after payOrder", orderStatus);
    return thankyouFnc(orderStatus);
  })
  .catch((err) => {
    console.error(err);
  });
