 var data = JSON.parse(paginationData);
//console.log(data);

//console.log(pagingData[0].id);
//var i;
//const len = pagingData.id;
//console.log(id.length());

// for(const i = 0; i <= pagingData.id.length(); i++){
  // console.log(pagingData[i].id);
    // const container = document.createElement("div");
// container.className = "parent-container";
// container.innerHTML=` 
// <h1 class="quote">${pagingData[i].id}</h1>
// `;
// document.body.append(container);  
// };
// 













// function getMovies(){
    // fetch("https://ghibliapi.herokuapp.com/films",{
     //  fetch("http://api.alquran.cloud/v1/quran/quran-uthmani",{
        // method: "GET"
    // })
    // .then((data) => {
        // console.log(data);
        // return data.json();
    // })
    // .then((chapter) => loadMovies(chapter));
// }
// function loadChapter(){
    // chapter.forEach((chapter) => {
        // console.log(chapter);
        // 
    // });
// }
//getMovies();
//https://cdn.animenewsnetwork.com/encyclopedia/api.xml?manga=4199 
// fetch('https://urlhaus-api.abuse.ch/v1/urls/recent/')
    // .then(response => response.json())
    // .then(quote => console.log(quote))
// 
    // function getAnime(){
        // fetch("https://ghibliapi.herokuapp.com/films",{
            // method: "GET"
        // })
        // .then((data) =>{
            // console.log(data);
            // return data.json();
        // })
        // catch(err) => console.log("errr");
        
    // }
    // getAnime();
// function loadMovies(chapter){
    // chapter.forEach((chapt)=>{
// 
    // const container = document.createElement("div");
    // container.className = "parent-container";
// 
    // container.innerHTML=`
    // 
    // 
    // <h1 class="quote">${chapt.title}</h1>
    // `;
    // document.body.append(container);
// })
// 
// }
// 
// data.forEach((data)=>{
    // console.log(data.id);
// })
// 



const perPage = 1
const state = {
    page: 1,
    perPage,
    totalPage: Math.ceil(data.length / perPage),
    maxVisibleButtons: 6
}

const html = {
    get(element) {
        return document.querySelector(element)
    }
}

const controls = {
    next() {
        state.page++

        const lastPage = state.page > state.totalPage
        if (lastPage) {
            state.page--
        }
    },
    prev() {
        state.page--

        const firstPage = state.page < 1

        if (firstPage) {
            state.page++
        }
    },
    goTo(page) {
        if (page < 1) {
            page = 1
        }
        state.page = +page

        if (page > state.totalPage) {
            state.page = state.totalPage
        }
    },
    createListeners() {
        html.get('.first').addEventListener('click', () => {
            controls.goTo(1)
            update()
        })

        html.get('.last').addEventListener('click', () => {
            controls.goTo(state.totalPage)
            update()
        })

        html.get('.next').addEventListener('click', () => {
            controls.next()
            update()
        })

        html.get('.prev').addEventListener('click', () => {
            controls.prev()
            update()
        })
    }
}

const list = {
    create(item) {
        console.log(item)

        const div = document.createElement('div')
        div.classList.add('item')
        div.innerHTML = "Change: "+item.id

        html.get('.list').appendChild(div)
    },
    update() {
        html.get('.list').innerHTML = ""

        let page = state.page - 1
        let start = page * perPage
        let end = start + state.perPage

        console.log(data.slice(start, end))

        const paginatedItems = data.slice(start, end)

        paginatedItems.forEach(list.create)

    }
}

const buttons = {
    element: html.get('.numbers') ,
    create(number) { 
        const button = document.createElement('div')
        button.innerHTML = number

        if(state.page == number) {
            button.classList.add('active')
        }

        button.addEventListener('click', (event) => {
            const page = event.target.innerText

            controls.goTo(page)
            update()
        })

        buttons.element.appendChild(button)
    },
    update() {
        buttons.element.innerHTML = ""
        const { maxLeft, maxRight } = buttons.calculateMaxVisible()
        console.log(maxLeft, maxRight)

        for(let page=maxLeft; page <= maxRight; page++) {
            buttons.create(page)
        }
    
    },
    calculateMaxVisible() {
        const { maxVisibleButtons } = state
        let maxLeft = (state.page - Math.floor(maxVisibleButtons / 2))
        let maxRight = (state.page + Math.floor(maxVisibleButtons / 2))
        if (maxLeft < 1) {
            maxLeft = 1
            maxRight = maxVisibleButtons
        }

        if (maxRight > state.totalPage) {
            maxLeft = state.totalPage - (maxVisibleButtons - 1)
            maxRight = state.totalPage

            if(maxLeft < 1) {
                maxLeft = 1
            }
        }

        return { maxLeft, maxRight }
    }
}

function update() {
    list.update()
    buttons.update()
}

function init() {
    update()
    controls.createListeners()
}

init()