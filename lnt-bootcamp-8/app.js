var todos = [];

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

let toDoCollection = db.collection("todos");

const init = () => {
  toDoCollection.get().then((response) => {
    response.docs.forEach((item) => {
      todos.push(item);
    });
    render();
  });
};

const render = () => {
  $("#toDoList").empty();
  todos.forEach((todo) => {
    $("#toDoList").append(
      $(`<li class="list-group-item d-flex">${todo.data().title}
      <button class="btn btn-danger ms-auto" onclick="deleteToDo('${
        todo.id
      }')">Delete</button>
      </li>`)
    );
  });
};

$("#toDoForm").submit((event) => {
  event.preventDefault();
  const inputToDo = $("#todo").val();
  let newToDo = {
    title: inputToDo,
  };
  if (inputToDo !== "") {
    toDoCollection
      .add(newToDo)
      .then((response) => response.get())
      .then((response) => {
        todos.push(response);
        render();
        $("#todo").val("");
        const toastSuccess = window.document.getElementById("liveToast");
        var toast = new bootstrap.Toast(toastSuccess);
        toast.show();
      });
  }
});

const deleteToDo = (id) => {
  todos = todos.filter((todo) => {
    if (todo.id === id) {
      todo.ref.delete();
    }
    return todo.id !== id;
  });
  render();
};

$(document).ready(() => {
  init();
});
