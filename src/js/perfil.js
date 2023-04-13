
const URL = 'https://jsonplaceholder.typicode.com/users'
const num = Math.round(Math.random() * 10)

const $mainPerfil = document.querySelector('.main__perfil')

const fetching = async num => {
    const res = await fetch(URL)
    const data = await res.json()

    const persona = data.filter( i => i.id === num)

    $mainPerfil.innerHTML = `
        <div class="main__perfil--info">  
            <p class="label"> Usuario: </p>
            <p class="dato"> ${persona[0].username}</p>
        </div>

        <div class="hr"></div>
        
        <div class="main__perfil--info"> 
            <p class="label"> Nombre: </p>
            <p class="dato"> ${persona[0].name} </p>
        </div>
        
        <div class="hr"></div>
        
        <div class="main__perfil--info">  
            <p class="label"> Correo electrónico: </p>
            <p class="dato"> ${persona[0].email} </p>
        </div>
        
        <div class="hr"></div>
        
        <div class="main__perfil--info"> 
            <p class="label"> Ciudad: </p>
            <p class="dato"> ${persona[0].address.city} </p>
        </div>
        
        <div class="hr"></div>
        
        <div class="main__perfil--info"> 
            <p class="label"> Calle: </p>
            <p class="dato"> ${persona[0].address.street} </p>
        </div>
        
        <div class="hr"></div>

        <div class="main__perfil--info"> 
            <p class="label"> Teléfono: </p>
            <p class="dato"> ${persona[0].phone} </p>
        </div>
    
    `
    
    
    
}


fetching(num)

