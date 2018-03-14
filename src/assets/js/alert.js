function CustomAlert() {
    this.show = function (dialog) {
        var winW = window.innerWidth;
        var winH = window.innerHeight;
        var dialogOverlay = document.getElementById('dialog-overlay');
        var dialogBox = document.getElementById('dialog-box');

        dialogOverlay.style.display = "block";
        dialogOverlay.style.height = winH + "px";
        dialogBox.style.left = ((winW / 2) - (550 / 2)) + "px";
        dialogBox.style.top = "100px";
        dialogBox.style.display = "block";

        document.getElementById('dialog-box-head').innerHTML = "Acknowledge This Message";
        document.getElementById('dialog-box-body').innerHTML = dialog;
        document.getElementById('dialog-box-foot').innerHTML = '<button onclick="Alert.ok()">OK</button>';
    }
    this.ok = function () {
        this.hide();
    }
    this.hide = function () {
        document.getElementById('dialog-box').style.display = "none";
        document.getElementById('dialog-overlay').style.display = "none";
    }
}

var Alert = new CustomAlert();

// =============================================================================================

function deletePost(id) {
    var db_id = id.replace("post_", "");
    // Run Ajax request here to delete post from database
    document.body.removeChild(document.getElementById(id));
}

function CustomConfirm() {
    this.show = function (dialog, op, id) {
        var winW = window.innerWidth;
        var winH = window.innerHeight;
        var dialogOverlay = document.getElementById('dialog-overlay');
        var dialogBox = document.getElementById('dialog-box');

        dialogOverlay.style.display = "block";
        dialogOverlay.style.height = winH + "px";
        dialogBox.style.left = ((winW / 2) - (550 / 2)) + "px";
        dialogBox.style.top = "100px";
        dialogBox.style.display = "block";

        document.getElementById('dialog-box-head').innerHTML = "Confirm that action";
        document.getElementById('dialog-box-body').innerHTML = dialog;
        document.getElementById('dialog-box-foot').innerHTML =
            '<button onclick="Confirm.yes(\'' + op + '\',\'' + id + '\')">Yes</button> <button onclick="Confirm.no()">No</button>';
    }
    this.no = function () {
        this.hide();
    }
    this.yes = function (op, id) {
        if (op == "delete_post") {
            deletePost(id);
        }
        this.hide();
    }
    this.hide = function () {
        document.getElementById('dialog-box').style.display = "none";
        document.getElementById('dialog-overlay').style.display = "none";
    }
}

var Confirm = new CustomConfirm();

// =============================================================================================

function changeText(val) {
    document.getElementById('status').innerHTML = val;
}

function doStuff(val) {
    document.body.style.background = val;
}

function CustomPrompt() {
    this.show = function (dialog, func) {
        var winW = window.innerWidth;
        var winH = window.innerHeight;
        var dialogOverlay = document.getElementById('dialog-overlay');
        var dialogBox = document.getElementById('dialog-box');

        dialogOverlay.style.display = "block";
        dialogOverlay.style.height = winH + "px";
        dialogBox.style.left = ((winW / 2) - (550 / 2)) + "px";
        dialogBox.style.top = "100px";
        dialogBox.style.display = "block";

        document.getElementById('dialog-box-head').innerHTML = "A value is required";
        document.getElementById('dialog-box-body').innerHTML = dialog;
        document.getElementById('dialog-box-body').innerHTML += '<br><input id="prompt_value1">';
        document.getElementById('dialog-box-foot').innerHTML = '<button onclick="Prompt.ok(\'' + func + '\')">OK</button> <button onclick="Prompt.cancel()">Cancel</button>';
    }
    this.cancel = function () {
        this.hide();
    }
    this.ok = function (func) {
        var prompt_value1 = document.getElementById('prompt_value1').value;
        window[func](prompt_value1);
        this.hide();
    }
    this.hide = function () {
        document.getElementById('dialog-box').style.display = "none";
        document.getElementById('dialog-overlay').style.display = "none";
    }
}
var Prompt = new CustomPrompt();