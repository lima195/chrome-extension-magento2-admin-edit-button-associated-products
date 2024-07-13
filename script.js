function addM2EditButton() {
    const rows = document.querySelectorAll('div[data-index="associated"] .admin__dynamic-rows.data-grid tbody tr');
    const currentUrl = window.location.href;
    const url = new URL(currentUrl);
    
    rows.forEach(function(row) {
        m2FoundAssociatedProducts = true;
        const idCell = row.querySelector('span[data-index="id"]');
        if (idCell) {
            const id = idCell.innerHTML;
            let newUrl = url.toString().replace(/\/id\/\d+/, `/id/${id}`);
            const updatedUrl = newUrl.toString();

            const productNameCell = row.querySelector('[data-index="name"]');
            if (productNameCell.querySelector('span[data-index="name"]')) {
                const productName = productNameCell.querySelector('span[data-index="name"]').innerHTML;

                const link = document.createElement('a');
                link.textContent = productName;
                link.href = updatedUrl;
                link.target = '_blank';

                productNameCell.innerHTML = '';
                productNameCell.appendChild(link);
                return true;
            }
        }
    });

    return false;
}

function tryToAddURL() {
    // Try to add the edit url
    const result = addM2EditButton();

    // If was not possible to add the button, check if spinner is invisible, then try again
    if (!result) {
        const spinnerVisibility = window.getComputedStyle(document.querySelector('.admin__form-loading-mask')).display !== 'none';
    
        if (!spinnerVisibility) {
            // Only applies if page has associated grouped products
            if (document.querySelector('div[data-index="associated"]')) {
                const rows = document.querySelectorAll('div[data-index="associated"] .admin__dynamic-rows.data-grid tbody tr');
                if (rows && rows.length > 0) {
                    addM2EditButton();
                }
                return true;
            }
        }
    }
    return false;
}

function init() {
    let tries = 0;
    const limit = 5;
    const checkIfPageIsLoaded = setInterval(function() {
        tries++;
        result = tryToAddURL();
    
        // try 5 times, or if screenloader is gone and there is no secction of associated grouped products
        if (result || limit === tries) {
            clearInterval(checkIfPageIsLoaded);
        }
    }, 2000);
}

// Init
init();
