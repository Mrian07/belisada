export function CustomAlert() {
    this.show = function (dialog) {
        const winW = window.innerWidth;
        const winH = window.innerHeight;
        const dialogOverlay = document.getElementById('dialog-overlay');
        const dialogBox = document.getElementById('dialog-box');

        dialogOverlay.style.display = 'block';
        dialogOverlay.style.height = winH + 'px';
        dialogBox.style.left = ((winW / 2) - (550 / 2)) + 'px';
        dialogBox.style.top = '100px';
        dialogBox.style.display = 'block';

        document.getElementById('dialog-box-head').innerHTML = 'Acknowledge This Message';
        document.getElementById('dialog-box-body').innerHTML = dialog;
        document.getElementById('dialog-box-foot').innerHTML = '<button class="btn-alert-ok" onclick="Alert.ok()">OK</button>';
    }
    this.ok = function () {
        this.hide();
    }
    this.hide = function () {
        document.getElementById('dialog-box').style.display = 'none';
        document.getElementById('dialog-overlay').style.display = 'none';
    }
}

// function CustomAlert() {
//     this.show = function (dialog) {
//         const winW = window.innerWidth;
//         const winH = window.innerHeight;
//         const dialogOverlay = document.getElementById('dialog-overlay');
//         const dialogBox = document.getElementById('dialog-box');

//         dialogOverlay.style.display = 'block';
//         dialogOverlay.style.height = winH + 'px';
//         dialogBox.style.left = ((winW / 2) - (550 / 2)) + 'px';
//         dialogBox.style.top = '100px';
//         dialogBox.style.display = 'block';

//         document.getElementById('dialog-box-head').innerHTML = 'Acknowledge This Message';
//         document.getElementById('dialog-box-body').innerHTML = dialog;
//         document.getElementById('dialog-box-foot').innerHTML = '<button class="btn-alert-ok" onclick="Alert.ok()">OK</button>';
//     };
//     // this.test = () => {
//     //     console.log('aaaaa');
//     // };
//     this.ok = function () {
//         this.hide();
//     };
//     this.hide = function () {
//         document.getElementById('dialog-box').style.display = 'none';
//         document.getElementById('dialog-overlay').style.display = 'none';
//     };
// }

// export let ca = {
//     alert: new CustomAlert()
// };
// const Alert = new CustomAlert();

export function CustomConfirm() {
    this.show = function (dialog, op, id) {
        const winW = window.innerWidth;
        const winH = window.innerHeight;
        const dialogOverlay = document.getElementById('dialog-overlay');
        const dialogBox = document.getElementById('dialog-box');

        dialogOverlay.style.display = 'block';
        dialogOverlay.style.height = winH + 'px';
        dialogBox.style.left = ((winW / 2) - (550 / 2)) + 'px';
        dialogBox.style.top = '100px';
        dialogBox.style.display = 'block';

        document.getElementById('dialog-box-head').innerHTML = 'Confirm that action';
        document.getElementById('dialog-box-body').innerHTML = dialog;
        document.getElementById('dialog-box-foot').innerHTML =
        '<button onclick="Confirm.yes(\'' + op + '\',\'' + id + '\')">Yes</button> <button onclick="Confirm.no()">No</button>';
    }

    this.no = function () {
        this.hide();
        return false;
    }

    this.yes = function (op, id) {

        // if (op === 'delete_post') {
        //     deletePost(id);
        // }
        this.hide();
        return true;
    }

    this.hide = function () {
        document.getElementById('dialog-box').style.display = 'none';
        document.getElementById('dialog-overlay').style.display = 'none';
    }
}