var m2FoundAssociatedProducts = false;

function addM2EditButton() {
    if (!m2FoundAssociatedProducts) {
        let rows = document.querySelectorAll('div[data-index="associated"] .admin__dynamic-rows.data-grid tbody tr');
        const currentUrl = window.location.href;
        const url = new URL(currentUrl);
        
        rows.forEach(function(row) {
            m2FoundAssociatedProducts = true;
            let idCell = row.querySelector('span[data-index="id"]');
            if (idCell) {
                let id = idCell.innerHTML;
                let newUrl = url.toString().replace(/\/id\/\d+/, `/id/${id}`);
                const updatedUrl = newUrl.toString();
                
                let button = document.createElement('button');
                button.textContent = 'Edit';
                button.classList.add("action-delete");
                button.onclick = function() {
                    window.open(updatedUrl, '_blank');
                };
                
                let actionDeleteCell = row.querySelector('[data-index="actionDelete"]');
                if (actionDeleteCell) {
                    actionDeleteCell.appendChild(button);
                }
            }
        });
    }
}

function checkM2SpinnerVisibility() {
    var spinner = document.querySelector('[data-role="spinner"]');
    
    if (spinner && window.getComputedStyle(spinner).display !== 'none') {
        console.log("visible");
    } else {
        console.log("not visible");
        addM2EditButton()
        clearInterval(m2ButtonInterval);
    }
}

var m2ButtonInterval = setInterval(checkM2SpinnerVisibility, 1000);
