import Game from '../Game';
import Header from '../Header';
import toast, {Toaster} from 'react-hot-toast';

function App() {
  return (
    <div className="wrapper">
      <Header />
      <Toaster />
      <div className="game-wrapper">
        <Game />
      </div>
    </div>
  );
}

export default App;
