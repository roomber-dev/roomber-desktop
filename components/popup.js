let popups = 0;
var popupButtons = [];

function removePopup(id) {
    if(id > popups) return;
    if(id) {
        let popupElement = document.querySelector(`#popup-${id}`);
        let content = document.querySelector(`#popup-${id} .popup-content`);
        let blur = document.querySelector(`#popup-${id} .popup-blur`);

        if(popupElement) {
            content.style = "animation: 0.5s popup-after;";
            blur.style = "animation: 0.5s popup-blur-after;";
            setTimeout(function() {
                popupElement.remove();  
            }, 500);

            popups--
        } else {
            throw Error("Invalid popup ID");
        }
    } else {
        $(".popup").remove();
        popups = 0;
    }
}

function popup(title, text, buttons = [{label: "OK", click: function(popup) { popup.close()}}], blink = false, color = "") {
    popups++
    let id = `popup-${popups}`;
    let t = title;
    if(color != "") {
        t = `<p style='color: ${color}; font-weight: bold;'>${title}</p>`;
    }
    let html = `<div class="popup" id="${id}">
    <div class="popup-content">
        <div class="popup-main">
            <h4>${t}</h4>
            <br>
            <span class="popup-text">
                ${text}
            </span>
        </div>
            <div class="popup-footer">
            </div>
        </div>
        <div class="popup-blur">
        </div>
    </div>`;
    $("#body").append(html);
    let popupElement = document.getElementById(id);
    let popupText = document.querySelector(`#${id} .popup-text`);
    let content = document.querySelector(`#${id} .popup-content`);
    let blur = document.querySelector(`#${id} .popup-blur`);
    content.style = "animation: 0.5s popup-before;";
    blur.style = "animation: 0.5s popup-blur-before;";
    setTimeout(function() {
        content.style.animation = "";
        blur.style.animation = "";
    },500);

    if(blink) {
        popupText.style = '    -moz-transition:all 0.5s ease-in-out; -webkit-transition:all 0.5s ease-in-out; -o-transition:all 0.5s ease-in-out; -ms-transition:all 0.5s ease-in-out; transition:all 0.5s ease-in-out;  -moz-animation:blink normal 1.5s infinite ease-in-out; /* Firefox */ -webkit-animation:blink normal 1.5s infinite ease-in-out; /* Webkit */ -ms-animation:blink normal 1.5s infinite ease-in-out; /* IE */ animation:blink normal 1.5s infinite ease-in-out; /* Opera */'
    }
    let footer = document.querySelector(`#${id} .popup-footer`);
    popupButtons[popups] = {};
    buttons.forEach(function(button) {
        popupButtons[popups][button.label] = button;
        popupButtons[popups][button.label]["popup_id"] = id;
        popupButtons[popups][button.label]["on_click"] = function(button_) {
            button_.click({close: function() {
                let id_ = button_["popup_id"];
                $(`#${id_} .popup-content`).css("animation","0.5s popup-after");
                $(`#${id_} .popup-blur`).css("animation","0.5s popup-blur-after");
                setTimeout(function() {
                    $(`#${id_}`).remove();
                }, 500);
                popups--
            }});
        };
        footer.innerHTML += `
            <button class="button" onclick="popupButtons[${popups}]['${button.label}']['on_click'](popupButtons[${popups}]['${button.label}'])">
                ${button.label}
            </button>
        `;
    });

    return popups;
};

function alert(message) {
    popup("Alert", message);
}

// goodbye repeat() you know for loops exist right?
