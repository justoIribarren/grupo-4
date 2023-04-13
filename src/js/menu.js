(function(){
    const $openBtn = document.getElementById('open')
    const $closeBtn = document.getElementById('close')
    const $menu = document.getElementById('nav__ul')
    const $linkMenu = document.querySelectorAll('.nav__link')

    $openBtn.addEventListener('click', ()=>{
        $menu.classList.add('nav__activo')
    })

    $closeBtn.addEventListener('click', ()=>{
        $menu.classList.remove('nav__activo')
    })

    $linkMenu.forEach((link) => {
         link.addEventListener('click', ()=>{
            $menu.classList.remove('nav__activo');
        })
    })

})();