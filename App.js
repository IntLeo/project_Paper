import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Constants from 'expo-constants';

import {TextInput ,Button} from 'react-native-paper';
import * as React from 'react';

export default class App extends React.Component {

  state = {
    peso: 0,
    altura: 0,
    imc: 0,
    legenda: 'Indeterminado',
    cor: '#bdc3c7',
  };

  calcularIMC = () => {
    let resultado = this.state.peso / (this.state.altura * this.state.altura);

    if (isNaN(resultado)){
      resultado = '0';
    }
    this.setState({
      imc: Math.ceil(resultado)
    });

    if(resultado <= 0){
      this.setState({
        legenda: 'Preencha os Campos',
        cor: '#bdc3c7',

    });
    } else if(resultado < 18.5) {
      this.setState({
        legenda: 'Abaixo do peso',
        cor: '#e74c3c'
      });
    } else if (resultado >= 18.5 && resultado < 25) {
      this.setState({
        legenda: 'Peso normal',
        cor: '#2ecc71'
      });
    } else if (resultado >= 25 && resultado < 30) {
      this.setState({
        legenda: 'Sobrepeso I',
        cor: '#f1c40f'
      });
    } else if (resultado >= 30 && resultado < 40) {
      this.setState({
        legenda: 'Obesidade II',
        cor: 'rgba(230,126,34,0.82)'
      });
    }else{
      this.setState({
        legenda: 'Obesidade III',
        cor: '#ff9000'
      });
    }
  }

  render(){
    return (
        <View style={styles.app}>
          <Text style={styles.legenda}>Calculadora de IMC</Text>

          <View style={[styles.painel, {backgroundColor: this.state.cor}]}>
            <Text style={styles.resultado}>{this.state.imc}</Text>
            <Text style={styles.diagnostico}>{this.state.legenda}</Text>
          </View>

          <View>
            <TextInput
                style={styles.peso}
                label="Peso"
                onChangeText={valor => {
                  this.setState({peso: valor.replace(',', '.')});
                }}
            />
            <TextInput
                style={styles.altura}
                label="Altura"
                onChangeText={(valor) => {
                  this.setState({altura: valor.replace(',', '.')});
                }}
            />
            <Button mode="contained" style={styles.btn} onPress={this.calcularIMC}>
              Calcular
            </Button>
          </View>
        </View>
    );
  }
}



const styles = StyleSheet.create({
  app: {
    marginTop:200,
    padding: 10,
  },
  painel: {
    alignSelf: 'center',
    borderRadius: 5,
    width: 200,
    marginVertical: 10,
    padding: 8,
  },
  legenda: {
    textAlign: 'center',
    fontWeight: 'bold',
  },
  resultado: {
    textAlign: 'center',
    fontSize: 22,
    fontWeight: 'bold',
  },
  diagnostico: {
    textAlign: 'center',
    fontSize: 16,
  },
  peso: {
    marginVertical: 10,
    backgroundColor: 'white',
  },
  altura: {
    marginVertical: 10,
    backgroundColor: 'white',
  },
  btn:{
    backgroundColor: "#000",
  }
});