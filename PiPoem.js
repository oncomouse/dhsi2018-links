const wordsOfPi = [];
const digitsOfPi = [];

const digitOfPiToWord = digit => wordsOfPi[digit];
const mapDigitsOfPiToWords = digits => digits.map(digitOfPiToWord);
const extractDigit = numberOfDigits => digitsOfPi.slice(0, numberOfDigits);
const generatePoem = numberOfDigits => mapDigitsOfPiToWords(extractDigit(numberOfDigits));
class Poem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      numberOfDigits: 10
    }
  }
  updateNumberOfDigits = (ev) => {
    ev.preventDefault();
    ev.stopPropagation();
    this.setState({
      numberOfDigits: ev.target.value
    })
  }
  render() {
    return (<div>
      <Display words={mapDigitsOfPiToWords(extractDigit(numberOfDigits));}/>
      <Form
        eventListener={this.updateNumberOfDigits}
        value={this.state.numberOfDigits}
        min={1}
        max={digitsOfPi.length}
      />
    </div>);
  }
}
const Form = ({eventListener, value, min, max}) => (
  <form>
    <input value={value} onChange={eventListener} type="number" min={min} max={max}/>
  </form>
)
const Display = ({words}) => (
  <p>{words.join(' ')}</p>
)

// React editor component
/*
  UI:
    -List of Buttons: 10, 50, 100
    -<input value={value} onChange={onChange} type="number" min="1" max={digitsOfPi.length-1}/>
*/
// Stylesheets
