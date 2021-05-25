const express = require("express");
let app = require('express')();

let http = require('http').createServer(app);
let io = require('socket.io')(http);


// Configuration d'express pour utiliser le répertoire "root"
app.use(express.static('/'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});
app.get('/client.js', (req, res) => {
    res.sendFile(__dirname + '/client.js');
});

/***************************************************************
 *           Gestion des clients et des connexions
 ***************************************************************/

let devices = ["SLB-01","SLB-02","SLB-03"];
let firmwares= ["FW-01","FW-02"];
let patients=["USER-01","USER-02","USER-03"];

let Combinaisons = {};

devices.forEach(function (device){
    Combinaisons[device] = {firmware : "none",patient:"none"};
});

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.emit("UpdateLists",devices,firmwares,patients);
    socket.emit("UpdateCombinaisons",Combinaisons);

    socket.on('DECLARER', function(device, firmware) {
        if (devices.includes(device) && firmwares.includes(firmware)){
            if (Combinaisons[device].firmware ==="none"){
                Combinaisons[device].firmware = firmware;
                socket.emit("UpdateCombinaisons",Combinaisons);
            }else{
                socket.emit("UpdateCombinaisons",Combinaisons);
                socket.emit("ERROR_DECLARER");

            }

        }
    });
    socket.on('ASSOCIER', function(device, patient) {
        if (devices.includes(device) && patients.includes(patient)){
            if (Combinaisons[device].patient ==="none"){
                Combinaisons[device].patient = patient;
                socket.emit("UpdateCombinaisons",Combinaisons);
            }else{
                socket.emit("UpdateCombinaisons",Combinaisons);
                socket.emit("ERROR_ASSOCIER");

            }

        }
    });
    socket.on('DISSOCIER', function(device, patient) {
        if (devices.includes(device) && patients.includes(patient)){
            if (Combinaisons[device].patient ===patient){
                Combinaisons[device].patient = "none";
                socket.emit("UpdateCombinaisons",Combinaisons);
            }else{
                socket.emit("UpdateCombinaisons",Combinaisons);
                socket.emit("ERROR_DISSOCIER");

            }

        }
    });
    socket.on('UPDATE_FIRMWARE', function(device, firmware) {
        if (devices.includes(device) && firmwares.includes(firmware)){
            if (Combinaisons[device].firmware !=="none"  && Combinaisons[device].firmware !== firmware   ){
                Combinaisons[device].firmware = firmware;
                socket.emit("UpdateCombinaisons",Combinaisons);
            }else{
                socket.emit("UpdateCombinaisons",Combinaisons);
                socket.emit("ERROR_UPDATE");

            }

        }
    });
    socket.on("disconnect",function (e){

    });

});







http.listen(  8080, () => {
    console.log('listening on port :8080' );
});
