const navigateto = url => {
    history.pushState(null, null, url);
    router();
};


const getArticles = (take = 9, skip = 0) => {
    const baseUrl = "http://localhost:3000/api/v1/articles"
    const queryParams = "?take=" + take + "&skip=" + skip
    const URL = baseUrl + queryParams

    const myHeaders = new Headers();
    myHeaders.append('cache-control', 'no-cache');

    const myInit = {
        method: 'GET',
        headers: myHeaders,
    };

    return fetch(URL, myInit)
}

const getCategories = () => {
    const baseUrl = "http://localhost:3000/api/v1/categories"

    const myHeaders = new Headers();
    myHeaders.append('cache-control', 'no-cache');

    const myInit = {
        method: 'GET',
        headers: myHeaders,
    };

    return fetch(baseUrl, myInit)
}


const renderCategoriesInNavbar = () => {
    getCategories()
        .then(response => {
            if (response.ok) {
                return response.json()
            } else {
                console.log(response.statusText)
            }
        })
        .then(jsonResponse => {
            let html = ""
            for (let i = 0; i < jsonResponse.length; i++) {
                html += `<li class="nav-item tm-category-item"><a href="#" class="nav-link tm-category-link">${jsonResponse[i].nom}</a></li>`
            }
            const categories_list = document.querySelector('.tm-category-list')
            categories_list.innerHTML = html
        })
}


const renderArticles = () => {
    getArticles()
        .then(response => {
            if (response.ok) {
                return response.json()
            } else {
                console.log(response.statusText)
            }
        })
        .then(jsonResponse => {
            let html = ""
            for (let i = 0; i < 9; i++) {
                html += `<div class="col-lg-4 col-md-6 col-sm-12 tm-catalog-item">
            <div class="position-relative tm-thumbnail-container">
                <img src="${jsonResponse[i].image}" alt="Image" class="img-fluid tm-catalog-item-img">
                <a href="http://localhost:3000/api/v1/articles/${i+1}" class="position-absolute tm-img-overlay">
                    <i class="fas fa-play tm-overlay-icon"></i>
                </a>
            </div>
            <div class="p-4 tm-bg-gray tm-catalog-item-description">
                <h3 class="tm-text-primary mb-3 tm-catalog-item-title">${jsonResponse[i].titre}</h3>
                <p class="tm-catalog-item-text">${jsonResponse[i].contenu.substring(0,200)}...</p>
            </div>
        </div>`
            }
            const articles_catalog = document.querySelector('.tm-catalog-item-list')
            articles_catalog.innerHTML = html
        })
}


renderCategoriesInNavbar()
renderArticles()

// const testBtn = document.querySelector('.btn')
// const paragraph = document.querySelector('.paragraph')
// const title = document.querySelector('.title')
// testBtn.addEventListener('click', () => {
//     const myHeaders = new Headers();
//     myHeaders.append('cache-control', 'no-cache');
//     const myInit = {
//         method: 'GET',
//         headers: myHeaders
//     };
//     fetch('http://localhost:3000/api/v1/articles?take=10&skip=0')
//         .then(response => {
//             if (response.ok) {
//                 return response.json()
//             } else {
//                 paragraph.innerHTML = response.statusText
//             }
//         })
//         .then(jsonResponse => {
//             title.innerHTML = jsonResponse[0].titre
//             paragraph.innerHTML = jsonResponse[0].contenu
//         })
// });
const router = async() => {
    const routes = [
        { path: "/", view: () => console.log("Viewing Home") },
        { path: "/subscribe", view: () => console.log("Viewing Subscribe") },
        { path: "/Articles", view: () => console.log("Viewing Articles") }

    ];
    const potentialmatch = routes.map(route => {
        return {
            route: route,
            ismatch: location.pathname === route.path
        };
    });
    let match = potentialmatch.find(potentialmatch => potentialmatch.ismatch);
    if (!match) {
        match = {
            route: routes[0],
            ismatch: true
        };
    }
    console.log(match);
};
window.addEventListener("popstate", router)

document.addEventListener("DOMContentLoaded", () => {
    document.body.addEventListener("click", e => {
        if (e.target.matches("[data-link]")) {
            e.preventDefault();
            navigateto(e.target.href);
        }
    })

    router();
});