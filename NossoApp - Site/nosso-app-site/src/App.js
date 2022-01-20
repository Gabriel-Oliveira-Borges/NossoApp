import './styles/App.css';
import React from 'react';
import Backend from './Backend/Backend';
import Apk from './BUILDS/app-debug.apk';
import Ipa from './BUILDS/Payload.ipa';

function download(url) {
  const a = document.createElement('a')
  a.href = url
  a.download = url.split('/').pop()
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
}

class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      loading: false,
      password: null,
      loggedIn: false,
      isPasswordCorrect: true,
    }
  }

  checkPassword = async () => {
    this.setState({loading: true});
    if (await Backend.isPasswordCorrect(this.state.password)) {
      this.setState({loggedIn: true, isPasswordCorrect: true});
    } else {
      this.setState({isPasswordCorrect: false});
    }

    this.setState({loading: false});
  }

  render() {
      const { loading, isPasswordCorrect, loggedIn } = this.state;

      if (loggedIn) {
        return (
          <div className="Container">
            <p className='Download' onClick={() => download(Apk)}>Android</p>
            {/* Assim ele funcionaria, mas eu precisaria hostear o .ipa em algum lugar e mudar o link. É o único jeito */}
            {/* <a href="itms-services://?action=download-manifest&url=https://localhost:3000/manifest.plist">Install App</a> <br/> */}
            <p className='Download' onClick={() => download(Ipa)}>IOS</p>
          </div>
        )
      } else {
      return (
        <div className="Container">
          <p>Digite a senha para acessar o aplicativo:</p>
          { loading && <p className='Warning'>Carregando</p> }
          { !loading && !isPasswordCorrect && <p className='Warning'>Senha incorreta</p> }
          <input value={this.state.password} type="password" onChange={({target}) => this.setState({password: target.value})}/>
          <button onClick={this.checkPassword} type="submit">Entrar</button>
        </div>
    );
      }

  }
}

export default App;
