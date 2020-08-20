let urlPro = 'http://localhost:3000/Produtos/'
let urlCa = 'http://localhost:3000/Carrinho/'

axios.get(urlPro)
.then( ({data}) => {
    console.log(data)
    criarCard (data)
    adicionarEventoNoBotao ()
    
})

function criarCard (produtos){
    let cards = document.getElementById('cards')
    produtos.forEach(produto => {
        cards.innerHTML += `<div class="card col-lg-3 produto" id='produto${produto.id}'>

        <article>
          <div>
            <img src="${produto.foto}" alt="case" class='imagem-produto'>
          </div>
          <i class="heart">
            <img width="20" src="http://www.onlygfx.com/wp-content/uploads/2017/08/red-watercolor-heart-2-1-300x267.png"
              alt="">
          </i>

          <button class='btn' data-id='${produto.id}'>
            <img width="30" src="https://image.flaticon.com/icons/svg/711/711947.svg" alt="lil truck">
          </button>
        </article>
        <article class="price">
          <h2>${produto.preco}</h2>
          <div>
            Quantidade:
            <input type="number" class="qtde" style="width: 150px">
          </div>
        </article>
        <article class="description">
          <p>${produto.nome}</p>
        </article>
      </div>`
    })
}

function buscarProduto(id){
  return new Promise((resolve, reject)=>{
    axios.get(urlPro)
    .then (({data}) =>{
      let produto = data.find(produto =>{
        return produto.id === id
      })
      resolve(produto)
    })
  })
}

function adicionarEventoNoBotao (){
    let botoes = document.querySelectorAll('.produto .btn')
    botoes.forEach(botao =>{
        botao.addEventListener('click', ()=> {
            let id = parseInt(botao.getAttribute('data-id'))
            let produtoel = document.getElementById(`produto${id}`)
            let quantidade = produtoel.querySelector('.qtde').value
            buscarProduto(id).then (produto => {
              adicionarProdutoAoCarrinho({...produto, quantidade, total: quantidade * produto.preco})
            })
        })
    })
}



function adicionarProdutoAoCarrinho(produto){
    if(produto.quantidade > 0){
        alert(`Você adicionou ${produto.quantidade} ${produto.nome}(s) ao seu carrinho`)
        axios.post(urlCa, produto) 
        .then(res => {
          valorTotalDoCarrinho()
        })
    } else{
        alert('Você não definiu a quantidade desejada!')
    }
}

function valorTotalDoCarrinho () {
  axios.get(urlCa) 
  .then(res => {
    let soma = 0
    for(i=0; i<carrinho.length; i++){
      let produtoAtual = res.data[i]
      let valorDoProdutoAtual = produtoAtual.preco * produtoAtual.quantidade
      soma = soma + valorDoProdutoAtual
    }
    document.getElementById('valor-total').value = soma
  })
}

// window.onload = function (){
//   let botoes = document.querySelectorAll('.produto .btn')
//   botoes.forEach(botao =>{
//       botao.addEventListener('click', ()=> {
//         let qtdeProduto = document.getElementById
//         axios.get(urlPro)
//         .then(res =>{

//         })
// }