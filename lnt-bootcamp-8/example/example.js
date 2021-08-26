const firebaseConfig = {
  apiKey: "AIzaSyCxM73SI6LRU5CjgmVdpMucMAfWvUU51zQ",
  authDomain: "lnt-bootcamp-bncc.firebaseapp.com",
  projectId: "lnt-bootcamp-bncc",
  storageBucket: "lnt-bootcamp-bncc.appspot.com",
  messagingSenderId: "385964867384",
  appId: "1:385964867384:web:6a117d2cff77b2fed24bcd",
  measurementId: "G-PJSFZS80QX",
};
let localDb = [];
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
let db = firebase.firestore();

let toDoCollection = db.collection("toDo");

const init = () => {
  toDoCollection
    .get()
    .then((response) => {
      response.docs.forEach((doc) => {
        localDb.push(doc);
        render();
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

const render = () => {
  $("#cardList").empty();
  if (localDb.length === 0) {
    $("#cardList").append(
      $(`<li class="list-group-item d-flex flex-column align-items-center">
            <img width="200px" src="./empty.svg">
            <p class="text-center">No To Do List Available</p>
            </li>`)
    );
  }
  localDb.forEach((item) => {
    $("#cardList").append(
      $(`<li class="list-group-item d-flex" id="list${item.id}">
       <span>${item.data().name}</span>
       <button class="btn btn-danger ms-auto" onclick="deleteList('${
         item.id
       }')">Delete</button>
       </li>`)
    );
  });
};

const deleteList = (id) => {
  localDb = localDb.filter(function (todo) {
    if (todo.id === id) {
      todo.ref.delete();
    }
    return todo.id !== id;
  });
  render();
};

$("#toDoForm").submit((e) => {
  e.preventDefault();
  let name = $("#todo").val();
  let newToDo = {
    name,
  };
  if (name) {
    toDoCollection
      .add(newToDo)
      .then((response) => response.get())
      .then((response) => {
        localDb.push(response);
        render();
      });
    $("#todo").val("");
  }
});

$(document).ready(() => {
  init();
});
