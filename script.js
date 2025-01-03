const output = document.getElementById("output");
const add_ceo_name = document.getElementById("add_ceo_name");
const add_ceo_email = document.getElementById("add_ceo_email");
const add_ceo_company = document.getElementById("add_ceo_company");
const emailAlert = document.getElementById("emailAlert");
const edit_ceo_id = document.getElementById("edit_ceo_id");
const edit_ceo_name = document.getElementById("edit_ceo_name");
const edit_ceo_email = document.getElementById("edit_ceo_email");
const edit_ceo_company = document.getElementById("edit_ceo_company");
const emailModalAlert = document.getElementById("emailModalAlert");
const closeButton = document.getElementById('closeButton');
const myViewModal = document.getElementById('myViewModal');
const myInput = document.getElementById('myInput');
const view_ceo_name = document.getElementById('view_ceo_name');
const view_ceo_email = document.getElementById('view_ceo_email');
const view_ceo_company = document.getElementById('view_ceo_company');
const alert = document.getElementById('alert');
const alert_modal = document.getElementById('alert_modal');

const ceos = [];

// show all added CEOs
const showCeos = () => {
    alertHide(true);
    output.innerHTML = "";
    ceos.forEach(ceo => {
        output.hidden = false;
        let id = ceos.indexOf(ceo);
        if (id >= 0) {
            output.innerHTML += `<div class="row">
                                    <div class="col col-xl-8 col-lg-7 col-md-6 col-12">
                                        <b>` + ceo.company + `</b>
                                    </div>
                                    <div class="col col-xl-4 col-lg-5 col-md-6 col-12" id="manupulateButton">
                                        <button id='editBtn' class='btn btn-outline-primary btn-view' type="button" data-bs-toggle="modal" data-bs-target="#exampleUpdateModal" onclick='editCeo("` + id + `")'>Update</button>
                                        <button id='viewBtn' class='btn btn-outline-secondary btn-view' type="button" data-bs-toggle="modal" data-bs-target="#exampleViewModal" onclick='viewCeo("` + id + `")'>View</button>
                                        <button id='deleteBtn' class='btn btn-outline-danger btn-view' onclick='deleteCeo("` + id + `")'>Delete</button>
                                    </div>
                                </div>
                                <hr>`;
        }
    });
    if (output.innerHTML == "") {
        output.hidden = true;
    }
}

// clear content of the input tag all time
const clearInput = () => {
    add_ceo_name.value = " ";
    add_ceo_email.value = " ";
    add_ceo_company.value = " ";
}

// show alert for empty space of input tag to add CEO
const showAddAlert = () => {
    alert.innerHTML = `<div class="alert alert-danger alert-dismissible fade show" id="alert" role="alert">
        <strong>Error!</strong> You should fill up the fields below.
        <button type="button" class="btn-close" data-bs-dismiss="alert" onClick="alertHide(true)" aria-label="Close"></button>
      </div>`;
}

// show alert for empty space of input tag to update CEO
const showUpdateAlert = () => {
    alert_modal.innerHTML = `<div class="alert alert-danger alert-dismissible fade show" id="alert" role="alert">
        <strong>Error!</strong> You should fill up the fields below.
        <button type="button" class="btn-close" data-bs-dismiss="alert" onClick="alertModalHide(true)" aria-label="Close"></button>
      </div>`;
}

// show or hide the alert message to add CEO
const alertHide = (check) => {
    alert.hidden = check;
}

// show or hide the alert message to update CEO
const alertModalHide = (check) => {
    alert_modal.hidden = check;
}

// validate email
const validateEmail = (email) => {
    const pattern = /\S+@\S+\.\S+/;
    return pattern.test(email);
}

// check email validation on add
const emailValidationOnAdd = (e) => {
    const ceo_email = e.target.value;
    if (validateEmail(ceo_email) || ceo_email == "") {
        emailAlert.innerHTML = "";
    }
    else {
        emailAlert.innerHTML = "Please enter a valid email";
    }
}

// add CEOs with validation
const addCeo = () => {
    const ceo_name = add_ceo_name.value;
    const ceo_email = add_ceo_email.value;
    const ceo_company = add_ceo_company.value;
    alertHide(true);
    if (ceo_name != "" && ceo_email != "" && ceo_company != "") {
        if (validateEmail(ceo_email)) {
            const add_ceoOb = {
                name: ceo_name,
                email: ceo_email,
                company: ceo_company
            }
            ceos.push(add_ceoOb);
            clearInput();
            showCeos();
        }
    }
    else {
        showAddAlert();
        alertHide(false);
    }
}

// check email validation on update
const emailValidationOnUpdate = (e) => {
    const ceo_email = e.target.value;
    if (validateEmail(ceo_email) || ceo_email == "") {
        emailModalAlert.innerHTML = "";
    }
    else {
        emailModalAlert.innerHTML = "Please enter a valid email";
    }
}

// fetch single CEO
const fetch_single_CEO = (ceo_id) => {
    if (ceo_id >= 0 && ceo_id < ceos.length) {
        const ceo = ceos[ceo_id];
        return [ceo.name, ceo.email, ceo.company];
    }
    return null;
}

// to update CEOs
const editCeo = (ceo_id) => {
    alertModalHide(true);
    let getCEO = fetch_single_CEO(ceo_id);
    edit_ceo_id.value = ceo_id;
    edit_ceo_name.value = getCEO[0];
    edit_ceo_email.value = getCEO[1];
    edit_ceo_company.value = getCEO[2];
}

const updateCeo = () => {
    const ceo_id = edit_ceo_id.value;
    const ceo_name = edit_ceo_name.value;
    const ceo_email = edit_ceo_email.value;
    const ceo_company = edit_ceo_company.value;
    alertModalHide(true);
    if (ceo_name != "" && ceo_email != "" && ceo_company != "") {
        if (validateEmail(ceo_email)) {
            const edit_ceoOb = {
                name: ceo_name,
                email: ceo_email,
                company: ceo_company
            }
            ceos[ceo_id] = edit_ceoOb;
            showCeos();
            closeButton.click();
        }
    }
    else {
        showUpdateAlert();
        alertModalHide(false);
    }
}

// to view a specific CEO
const viewCeo = (ceo_id) => {
    let getCEO = fetch_single_CEO(ceo_id);
    view_ceo_name.innerHTML = getCEO[0];
    view_ceo_email.innerHTML = getCEO[1];
    view_ceo_company.innerHTML = getCEO[2];
}

// to delete CEOs
const deleteCeo = (ceo_id) => {
    const result = confirm("Are you sure to delete ? ");
    if (result) {
        ceos.splice(ceo_id, 1);
        showCeos();
    }
}

showCeos();

// modal section
myViewModal.addEventListener('shown.bs.modal', function () {
    myInput.focus()
})
