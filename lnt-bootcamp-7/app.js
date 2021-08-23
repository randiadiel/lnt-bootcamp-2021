// const API_BASE_URL =
//   "https://43fhbb0zh1.execute-api.us-east-1.amazonaws.com/prod";

// const populateData = (results) => {
//   console.log(results);
//   $("#scheduleList").empty();
//   results.forEach((result) => {
//     $("#scheduleList").append(
//       $(
//         `<div> On day ${result?.id}, We will learn ${result?.title} which is ${result?.description} on ${result?.datetime}</div>`
//       )
//     );
//   });
// };

// $(document).ready(() => {
//   $.get({
//     url: API_BASE_URL + "/schedules",
//     contentType: "application/json",
//     dataType: "json",
//     success: populateData,
//   });
//   $("#send").click(() => {
//     $.post({
//       url: API_BASE_URL + "/schedules",
//       contentType: "application/json",
//       dataType: "json",
//       data: JSON.stringify({
//         title: "Module 1: Hello World",
//         description: "lorem ipsum dolor sit amet.",
//         datetime: "2021-08-02 19:20:00",
//       }),
//       success: (data) => {
//         console.log(data);
//       },
//     });
//   });
// });

$(document).ready(() => {
  const BASE_API_URL =
    "https://43fhbb0zh1.execute-api.us-east-1.amazonaws.com/prod";
  $("#scheduleList").empty();
  const populateData = (results) => {
    results.forEach((result) => {
      $("#scheduleList").append(
        $(
          `<li>On session ${result.id}, We will learn about ${result.title} which is ${result.description} -> ${result.datetime}</li>`
        )
      );
    });
  };
  const getData = () => {
    $.get({
      url: BASE_API_URL + "/schedules",
      contentType: "application/json",
      dataType: "json",
      success: populateData,
    });
  };
  getData();
  $("#sendScheduleButton").click(() => {
    let newSchedule = {
      title: $("#titleInput").val(),
      description: $("#descInput").val(),
      datetime: $("#dateInput").val(),
    };
    $.post({
      url: BASE_API_URL + "/schedules",
      contentType: "application/json",
      dataType: "json",
      data: JSON.stringify(newSchedule),
      success: (data) => {
        console.log(data);
      },
    });
    getData();
    $(".form-control").val("");
    $("#successAlert").removeClass("d-none");
  });
});
