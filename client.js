document.addEventListener("DOMContentLoaded", function(_e) {





    // socket ouverte vers le client
    var sock = io();
    let devices = [];

    let firmwares= [];
    let patients=[];
    let combinaisons = {};


    // receive lists
    sock.on("UpdateLists", (_devices,_firmwares,_patients) => {
       devices = _devices;
       firmwares = _firmwares;
       patients = _patients;
       console.log("lists updated");
       // update the lists on the page
        UpdateLists();
    });


    sock.on("UpdateCombinaisons", (_combinaisons) => {
       combinaisons =_combinaisons;
        console.log("lists updated");
        // update the lists on the page
        UpdateCombinaisons();
    });
    sock.on("ERROR_DECLARER", () => {
       alert("error declarer");
    });
    sock.on("ERROR_ASSOCIER", () => {
       alert("error associer");
    });
    sock.on("ERROR_DISSOCIER", () => {
        alert("error DISSOCIER");
    });
    sock.on("ERROR_UPDATE", () => {
        alert("error update");
    });
// update lists function
    function UpdateLists(){
        let listsDOM = document.getElementById("lists");
        listsDOM.innerText = "";
        let p_devices = document.createElement("p");
        let p_firmwares = document.createElement("p");
        let p_patients = document.createElement("p");

        p_devices.innerText = "Devices : ";
        devices.forEach(function (device){
           p_devices.innerText+= device +" ,";
        });
        p_devices.innerText =p_devices.innerText.slice(0,-1);

        p_firmwares.innerText = "Firmwares : ";
        firmwares.forEach(function (firmware){
            p_firmwares.innerText+= firmware +" ,";
        });
        p_firmwares.innerText =p_firmwares.innerText.slice(0,-1);

        p_patients.innerText = "Patients : ";
        patients.forEach(function (patient){
            p_patients.innerText+= patient +" ,";
        });
        p_patients.innerText= p_patients.innerText.slice(0,-1);

        listsDOM.appendChild(p_devices);
        listsDOM.appendChild(p_firmwares);
        listsDOM.appendChild(p_patients);

    }

    // update combination function
    function UpdateCombinaisons(){
        let combinaisonsDOM = document.getElementById("combinaisons");
        combinaisonsDOM.innerText = "Combinaisons : ";



        Object.keys(combinaisons).forEach(function (device){
            let combi = document.createElement("p");
           combi.innerText+= device + " ,"+combinaisons[device].firmware + " ,"+ combinaisons[device].patient ;
            combinaisonsDOM.appendChild(combi);
        });



    }



    document.getElementById("btnDeclarer").addEventListener("click",function (_e){
        let popup = document.createElement("div");
        popup.id="popup";
        let selectDevice = document.createElement("select");
        selectDevice.id="selectDevice";

        devices.forEach(function (device){
            let option = document.createElement("option");
            option.text =device

            selectDevice.add(option)

        })
        popup.appendChild(selectDevice);

        let selectFirmware = document.createElement("select");
        selectFirmware.id="selectFirmware";

        firmwares.forEach(function (firmware){
            let option = document.createElement("option");
            option.text =firmware

            selectFirmware.add(option)

        })
        popup.appendChild(selectFirmware);



        let btnSend = document.createElement("input");
        btnSend.value = "send";
        btnSend.type="button";
        btnSend.addEventListener("click",function (_e){
            sock.emit("DECLARER", selectDevice.value, selectFirmware.value);
            popup.remove();
        });

        popup.appendChild(btnSend);
        document.body.appendChild(popup);
    })
    document.getElementById("btnAssocier").addEventListener("click",function (_e){
        let popup = document.createElement("div");
        popup.id="popup";
        let selectDevice = document.createElement("select");
        selectDevice.id="selectDevice";

        devices.forEach(function (device){
            let option = document.createElement("option");
            option.text =device

            selectDevice.add(option)

        })
        popup.appendChild(selectDevice);

        let selectPatient = document.createElement("select");
        selectPatient.id="selectPatient";

        patients.forEach(function (patient){
            let option = document.createElement("option");
            option.text =patient

            selectPatient.add(option)

        })
        popup.appendChild(selectPatient);



        let btnSend = document.createElement("input");
        btnSend.value = "send";
        btnSend.type="button";
        btnSend.addEventListener("click",function (_e){
            sock.emit("ASSOCIER", selectDevice.value, selectPatient.value);
            popup.remove();
        });

        popup.appendChild(btnSend);
        document.body.appendChild(popup);
    })
    document.getElementById("btnDissocier").addEventListener("click",function (_e){
        let popup = document.createElement("div");
        popup.id="popup";
        let selectDevice = document.createElement("select");
        selectDevice.id="selectDevice";

        devices.forEach(function (device){
            let option = document.createElement("option");
            option.text =device

            selectDevice.add(option)

        })
        popup.appendChild(selectDevice);

        let selectPatient = document.createElement("select");
        selectPatient.id="selectPatient";

        patients.forEach(function (patient){
            let option = document.createElement("option");
            option.text =patient

            selectPatient.add(option)

        })
        popup.appendChild(selectPatient);



        let btnSend = document.createElement("input");
        btnSend.value = "send";
        btnSend.type="button";
        btnSend.addEventListener("click",function (_e){
            sock.emit("DISSOCIER", selectDevice.value, selectPatient.value);
            popup.remove();
        });

        popup.appendChild(btnSend);
        document.body.appendChild(popup);
    })
    document.getElementById("btnUpdateFirmware").addEventListener("click",function (_e){
        let popup = document.createElement("div");
        popup.id="popup";
        let selectDevice = document.createElement("select");
        selectDevice.id="selectDevice";

        devices.forEach(function (device){
            let option = document.createElement("option");
            option.text =device

            selectDevice.add(option)

        })
        popup.appendChild(selectDevice);

        let selectFirmware = document.createElement("select");
        selectFirmware.id="selectFirmware";

        firmwares.forEach(function (firmware){
            let option = document.createElement("option");
            option.text =firmware

            selectFirmware.add(option)

        })
        popup.appendChild(selectFirmware);



        let btnSend = document.createElement("input");
        btnSend.value = "send";
        btnSend.type="button";
        btnSend.addEventListener("click",function (_e){
            sock.emit("UPDATE_FIRMWARE", selectDevice.value, selectFirmware.value);
            popup.remove();
        });

        popup.appendChild(btnSend);
        document.body.appendChild(popup);
    })



});
