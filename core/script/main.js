function getContact() {
  $(".list-contact.popup").empty()

  $.ajax({
    url: "https://randomuser.me/api?results=5&exc=login%2Cregistered%2Cid%2Cnat&nat=us&noinfo",
    type: "GET",
    dataType: "json",
    success: function (res) {
      console.log(res);
      renderDataContact(res.results, ".list-contact.popup")
      $("#ModalContact").modal("show")
    },
    error: function (xhr, ajaxOptions, thrownError) {
      alert(xhr.status);
      alert(thrownError);
    }
  })
}

function renderDataContact(data, selector) {
  let listContact = ""

  data.map((item, index) => {
    listContact += `
      <li class="shadow-sm">
        <a href="javascript:void(0)" class="contact-item" data-contact='${JSON.stringify(item)}' onclick="addContact(this)">
          <img src="${item.picture.thumbnail}" alt="" class="contact-item_image">
          <span class="contact-item_name">${item.name.first} ${item.name.last}</span>
        </a>
      </li>
    `
  })

  $(selector).append(listContact)
}

function addContact(el) {
  const dataContact = $(el).data("contact")

  let listContact = `
    <li class="shadow-sm">
      <a href="javascript:void(0)" class="contact-item" data-contact='${JSON.stringify(dataContact)}' onclick="showDetail(this)">
        <img src="${dataContact.picture.thumbnail}" alt="" class="contact-item_image">
        <span class="contact-item_name">${dataContact.name.first} ${dataContact.name.last}</span>
      </a>
    </li>
  `

  $(".list-contact.main").append(listContact)
  $("#ModalContact").modal("hide")
}

function showDetail(el) {
  const dataContact = $(el).data("contact")
  console.log(dataContact);

  const detailContactEl = `
    <div class="contact-detail">
      <img src="${dataContact.picture.large}" alt="" class="img-fluid">
      <h4 class="modal-title detial-name">${dataContact.name.first} ${dataContact.name.last}</h4>

      <div class="contact-detail_box mb-2">
        <ul class="list-style-none">
          <li>
            <span class="contact-detail_label">Lahir</span>
            <div class="contact-detail_value">
              <span class="contact-detail_data">${dataContact.dob.date}</span>
            </div>
          </li>
          <li>
            <span class="contact-detail_label">Jenis Kelamin</span>
            <div class="contact-detail_value">
              <span class="contact-detail_data">${dataContact.gender}</span>
            </div>
          </li>
        </ul>
      </div>

      <div class="contact-detail_box mb-2">
        <ul class="list-style-none">
          <li>
            <span class="contact-detail_label">Surel</span>
            <div class="contact-detail_value">
              <span class="contact-detail_data">${dataContact.email}</span>
            </div>
          </li>
          <li>
            <span class="contact-detail_label">Telepon</span>
            <div class="contact-detail_value">
              <span class="contact-detail_data">${dataContact.phone}</span>
            </div>
          </li>
          <li>
            <span class="contact-detail_label">Seluler</span>
            <div class="contact-detail_value">
              <span class="contact-detail_data">${dataContact.cell}</span>
            </div>
          </li>
        </ul>
      </div>

      <div class="contact-detail_box mb-2">
        <ul class="list-style-none">
          <li>
            <span class="contact-detail_label">Tempat Tinggal</span>
            <div class="contact-detail_value">
              <span class="contact-detail_data">${dataContact.location.street.number} ${dataContact.location.street.name}</span>
              <span class="contact-detail_data">${dataContact.location.city}</span>
              <span class="contact-detail_data">${dataContact.location.state}</span>
              <span class="contact-detail_data">${dataContact.location.postcode}</span>
            </div>
          </li>
          <li>
            <span class="contact-detail_label">Koordinat</span>
            <div class="contact-detail_value">
              <span class="contact-detail_data">${dataContact.location.coordinates.latitude}, ${dataContact.location.coordinates.longitude}</span>
            </div>
          </li>
        </ul>
      </div>
    </div>
  `
  $("#ModalContactDetail .modal-body").empty()
  $("#ModalContactDetail .modal-body").append(detailContactEl)
  $("#ModalContactDetail").modal("show")
}

