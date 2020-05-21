import React from 'react';
import {connect} from 'redux';
import {View, Text, Button} from 'react-native';
import {ChangeStackHandler} from '../../utils/navigation/ChangeStackHandler';

class MediaScreen extends React.Component {
  render() {
    // ver esses estilos:
    // A imagem do café é interessante (em HOME) https://demos.creative-tim.com/material-kit-react-native/index.html#cards
    // Eu posso pegar esse estilo do Elements https://demos.creative-tim.com/argon-react-native/?_ga=2.115459524.334557525.1589952715-1038485479.1587607471
    // e também a imagem para o article (combinando com a imagem do café)
    // Esse cara para fazer a mensagem do começo é interessante tbm https://www.instamobile.io/app-templates/react-native-walkthrough-flow/
    return (
      <View>
        <Text>Media screen drawer</Text>
        <Button
          title="Clica aqui para mudar de stack"
          onPress={ChangeStackHandler.changeToFirstUseNavigation}
        />
      </View>
    );
  }
}

export default /* connect(null, null)( */ MediaScreen /* ) */;
