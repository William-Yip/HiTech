var React = require('react');
var ReactDOM = require('react-dom');
require('./styles.css');

//CRUD PRINCIPAL
var Crud = React.createClass({
    getInitialState:function(){
        return({
            cepOutput:[],
            itemEstado:[],
            estabelecimentos:[],
            listagem:[]

        })
    },
    render: function(){
        
        var listagem = this.state.listagem;
        listagem = listagem.map(function(elem,index){
            return(
                <li key={'estab'+index}>
                    <span>  {elem} | {localStorage.getItem(elem)} </span>
                </li>
                
            )
        })
        var cepOutput = this.state.cepOutput;
        cepOutput = cepOutput.map(function(elem, index){
            return(
                <li key={index}>
                    <span className="msg">CEP VÁLIDO ! !</span><br/><br/>
                    <span className="estado">|  Estado : {elem.uf}  |</span>
                    <span className="cidade">|  Cidade : {elem.localidade}  |</span>
                    <span className="bairro">|  Bairro : {elem.bairro}  |</span>
                    <span className="rua">|  Rua : {elem.logradouro}  |</span>
                </li>
            );
        }.bind(this));

        
        return(
            <div>
            <h1 className="title">WEB APP</h1>
            <div id="homepage">
            <h1>CRUD PARA ESTABELECIMENTO</h1>
            <form action="#">
                <input type="text" placeholder="Nome do Estabelecimento" ref="nome" required />
                <input type="text" placeholder="CEP" ref="cep" required />
                <button onClick={this.Verificar}>Verificar CEP</button>
                <button onClick={this.Listar}>Listar Estabelecimentos</button>
                <input onClick={this.Registrar} type="submit" value="Registrar"/>
            </form>
            <ul>{cepOutput}</ul>
            <ul>{listagem}</ul>
            </div>
            <canvas id="myChart"></canvas>
           
            </div>
        );
    },
    //METODOS
    Verificar:function(){
        this.setState({
    // Zerar o array, pois é o output atual.Portanto é só um elemento
           cepOutput:[] 
        })
        fetch(`https://viacep.com.br/ws/${this.refs.cep.value}/json/`)
        .then(data => data.json())
        .then(cep => {
            var newData = this.state.cepOutput.concat([cep]); 
            this.setState({
                cepOutput : newData,
                itemEstado: cep.uf
            });
        })
        
    },

    Registrar:function(e){
        e.preventDefault();
    var nome = this.refs.nome.value;
    var estado = this.state.itemEstado;
    var novoEstabelecimentos = this.state.estabelecimentos;
    novoEstabelecimentos.push(nome)
    this.setState({
        estabelecimentos: novoEstabelecimentos
    })
    localStorage.setItem(nome,estado)
      
    },

    Listar:function(){
        var listagem = this.state.listagem;
        
        //loop no localStorage
        var keys = Object.keys(localStorage);
        keys.forEach(function(key){
           listagem.push(key) 
        });
       this.setState({
           listagem:listagem
       });  
    },

    

});

ReactDOM.render(<Crud />, document.getElementById('crud'));
