const closeModal = () => {
    const modal = document.getElementById('modal');
    document.body.classList.remove('no-scroll');
    modal.classList.remove('show-modal');  
}

const openMobileMenu = () => {
    const mobileMenu = document.getElementById('nav-container');
    mobileMenu.classList.toggle('mobile-show');
}

window.onload = () => {

    let itemsInMenu = '';

    const showModal=(e, itemsInMenu)=> {
        const modal = document.getElementById('modal');
        document.body.classList.add('no-scroll');
        modal.classList.add('show-modal');
        const food = e.target.id.slice(e.target.id.indexOf('-')+1,e.target.id.lastIndexOf('-'));
        const foodItem = e.target.id.slice(e.target.id.lastIndexOf('-')+1, e.target.id.length)
        
        
        const modalContainer = `        <div class="modal-container">
        <div class="modal-window">
            <h3 class="modal-window_title">${itemsInMenu[food].MenuItems[foodItem].Name}</h3>
            <p class="modal-window_price">$ ${itemsInMenu[food].MenuItems[foodItem].Price.toFixed(2)}</p>
            <form action="">
                <select name="qty">
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                </select>

                <input type="button" value="Add to Order" class="add-button" id="add-button" onclick="closeModal()">
            </form>

            <div class="close-button" id="close-button" onclick="closeModal()">
                X
            </div>
        </div>
    </div>`

    
    modal.innerHTML = modalContainer;
    }

    const setNavMenu = (navSections) => {
        const navContainer = document.getElementById('nav-container');
        let listContent ='';
        navSections.map((element, index)=>{
            listContent += `<li><a href="#${element.toLowerCase()}">${element}</a></li>`;
        })
        navContainer.innerHTML +=listContent;
    }

    const setMenuSection = (menuItems) => {
        const sectionMenu = document.getElementById('section-menu');
        let menuContent = '';
        
        
        menuItems.map((element, index) =>{
            const menuName = element.Name;
            const menuItems = element.MenuItems;
            let menuItem = '';

            menuItems.map((item, i)=>{
                menuItem += `<div class="menu-section_item" id="item-${index}-${i}">
                <p class="menu-section_item_name">${item.Name}${item.SoldOut===true?`<span class="sold-out">Sold Out</span>`:''}</p>
                
                <p class="menu-section_item_price">$ ${item.Price.toFixed(2)}</p>
            </div>`
            })
            
            menuContent += `<div class="menu-section" id="${menuName.toLowerCase()}" >
            <h2 class="menu-section_title">${menuName}</h2>
                ${menuItem}
            </div>` 
        })
        sectionMenu.innerHTML=menuContent;
    }

    try {
        fetch("https://api.npoint.io/5f458ccb947908d10993", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        })
        .then((res) => res.json())
        .then((data) => {
            
            let navSections = data.MenuSections.map((e)=>{
                return e.Name;
            });
            itemsInMenu = data.MenuSections;

            setNavMenu(navSections);
            setMenuSection(itemsInMenu);

        })
        .then(()=>{
            const itemElement = document.getElementsByClassName('menu-section_item');
            for(item of itemElement){
                item.addEventListener('click', function(e){
                    showModal(e, itemsInMenu);
                })
            }
            
        })
        
    } catch (error) {
        console.info("> error: ", error.message);
    }
    
    
  };