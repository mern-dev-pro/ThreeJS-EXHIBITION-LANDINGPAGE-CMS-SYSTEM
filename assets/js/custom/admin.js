const BASE_URL = window.location.origin + "/PSG"; //server
// const BASE_URL = window.location.origin //local
$.getJSON(BASE_URL + "/data/info.json", function (json) {
  showJsonInfo(json);
});
$("#save").click(function () {
  var info = {
    "show": {
      "left": {
        "name": $("#show_name_left").val(),
        "link": $("#show_link_left").val(),
        "led_screen_url": ""
      },
      "center": {
        "name": $("#show_name_center").val(),
        "link": $("#show_link_center").val(),
        "led_screen_url": ""
      },
      "right": {
        "name": $("#show_name_right").val(),
        "link": $("#show_link_right").val(),
        "led_screen_url": ""
      }
    },
    "info_counter_link": $("#info_counter_link").val(),
    "banner_link": {
      "left": "",
      "right": ""
    },
    "company_url": $("#company_url").val()
  }

  var file = new File([JSON.stringify(info)], "info.json", {
    type: "text/plain",
  });
  console.log(file)
  var fd = new FormData();
  fd.append('file', file);
  fd.append('filename', 'info.json');
  fd.append('submit', 'json_button')
  console.log(fd);

  $.ajax({
    url: BASE_URL + '/admin/admin.php',
    type: 'post',
    data: fd,
    contentType: false,
    processData: false,
    success: function (response) {
      if (response != 0) {
        alert('file uploaded');
      }
      else {
        alert('file not uploaded');
      }
    },
  });
})
showJsonInfo = (json) => {
  $("#show_name_left").val(json.show.left.name);
  $("#show_link_left").val(json.show.left.link);
  $("#show_name_center").val(json.show.center.name);
  $("#show_link_center").val(json.show.center.link);
  $("#show_name_right").val(json.show.right.name);
  $("#show_link_right").val(json.show.right.link);
  $("#info_counter_link").val(json.info_counter_link);
  $("#company_url").val(json.company_url)
}

function download(filename, filepath) {
  var element = document.createElement('a');
  element.setAttribute('href', filepath);
  element.setAttribute('download', filename);
  document.body.appendChild(element);
  element.click();
}

$("#download_xlsx").click(function () {
  download('booths.xlsx', BASE_URL + "/data/PSG_booths.xlsx")
})
