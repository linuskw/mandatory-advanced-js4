import React from 'react';
import './App.css';

let gridArray = new Array(7 * 6).fill(0);

class Grid extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      playerColor: "red",
      result: null,
      wrapStyle: null,
    }

    this.renderPlayer = this.renderPlayer.bind(this);
    this.winChecker = this.winChecker.bind(this);
    this.drawChecker = this.drawChecker.bind(this);
    this.resetGame = this.resetGame.bind(this);
  }


  onClickCell(index){
    let cellIndex;
    console.log("You clicked cell: " + index);
    if (!this.state.result) {
      if (gridArray[index + 35] === 0) {
        cellIndex = index + 35;
        this.setState({ clickIndex: this.state.clickIndex + 1 });
        this.renderPlayer(cellIndex)
      } else if (gridArray[index + 28] === 0) {
          cellIndex = index + 28;
          this.setState({ clickIndex: this.state.clickIndex + 1 });
          this.renderPlayer(cellIndex);
      } else if (gridArray[index + 21] === 0) {
          cellIndex = index + 21;
          this.setState({ clickIndex: this.state.clickIndex + 1 });
          this.renderPlayer(cellIndex);
      } else if (gridArray[index + 14] === 0) {
          cellIndex = index + 14;
          this.setState({ clickIndex: this.state.clickIndex + 1 });
          this.renderPlayer(cellIndex);
      } else if (gridArray[index + 7] === 0) {
          cellIndex = index + 7;
          this.setState({ clickIndex: this.state.clickIndex + 1 });
          this.renderPlayer(cellIndex);
      } else if (gridArray[index] === 0) {
          this.renderPlayer(index);
          this.setState({ clickIndex: this.state.clickIndex + 1 });
      }
    }

    console.log(gridArray);
  }

  renderPlayer(cellIndex){
    if (this.state.playerColor === "red") {
      this.setState({ playerColor: "yellow" })
    } else {
      this.setState({ playerColor: "red" })
    }
    gridArray[cellIndex] = this.state.playerColor;
    this.winChecker();
    this.drawChecker();
  }

  winChecker(){
    let winner;
    //Vertical check
    for (let i = 21; i < gridArray.length; i += 7) {
      for (let j = i; j < gridArray.length; j++) {
        if (gridArray[j] !== 0) {
          if (
            gridArray[j] === gridArray[j - 7] &&
            gridArray[j] === gridArray[j - 14] &&
            gridArray[j] === gridArray[j - 21]) {
              console.log("winner column");
              winner = gridArray[j]
          }
        }
      }
    }

    //Horizontal check
    for (let i = 3; i < gridArray.length; i += 8) {
      for (let j = i; j < gridArray.length; j++) {
        if (gridArray[j] !== 0) {
          if (
            gridArray[j] === gridArray[j - 1] &&
            gridArray[j] === gridArray[j - 2] &&
            gridArray[j] === gridArray[j - 3]) {
            console.log("winner row");
            winner = gridArray[j]
          }
        }
      }
    }

    // index = (i * 7 + j) + 21
    //Diagonal descending
    for (let i = 0; i < 3; i += 1) {
      for (let j = 0; j < 4; j++) {
        let index = i * 7 + j
        if (gridArray[index] !== 0) {
          console.log(gridArray[index]);
          if (
            gridArray[index] === gridArray[index + 8] &&
            gridArray[index] === gridArray[index + 16] &&
            gridArray[index] === gridArray[index + 24]) {
            console.log("winner Diagonal descending");
            winner = gridArray[index]
          }
        }
      }
    }

    //Diagonal ascending
    for (let i = 0; i < 3; i += 1) {
      for (let j = 0; j < 4; j++) {
        let index = (i * 7 + j) + 21;
        if (gridArray[index] !== 0) {
          console.log(gridArray[index]);
          if (
            gridArray[index] === gridArray[index - 6] &&
            gridArray[index] === gridArray[index - 12] &&
            gridArray[index] === gridArray[index - 18]) {
            console.log("winner Diagonal ascending");
            winner = gridArray[index]
          }
        }
      }
    }

    console.log(winner);
    if (winner === "red") {
      this.setState({ result: "Red" })
    } else if (winner === "yellow") {
      this.setState({ result: "Yellow" })
    }
  }

  drawChecker(){
    let drawIndex = 0;

    for (let i = 0; i < gridArray.length; i++) {
      if (gridArray[i] !== 0) {
        drawIndex++;
      }
    }

    console.log(drawIndex);
    if (drawIndex === 42) {
      this.setState({ result: "draw" });
    }
  }

  resetGame(){
    console.log("reset");
    for (var i = 0; i < gridArray.length; i++) {
      gridArray[i] = 0;
    }
    this.setState({
      result: null
      })
  }

  render(){
    console.log(this.state.result);
    return(
      <>
      <div className="gridWrap" id={ this.state.wrapStyle }>
        { gridArray.map(((value, index) => {
          return <div
            key={index}
            className="gridCell">
            <div
              id={index}
              className={ value === "red" ? "gridCellInnerRed" : value === "yellow" ? "gridCellInnerYellow" : "gridCellInner"}
              onClick={ !this.state.won ? index <= 6 ? () => { this.onClickCell(index) } : null: null }>
            </div>
          </div>
        })) }
      </div>
      <h1>{ this.state.result === "draw" ? "It's a draw" : this.state.result === "Red" ? this.state.result + " wins!" : this.state.result === "Yellow" ? this.state.result + " wins!" : null }</h1>
      { this.state.result ? <button onClick={ this.resetGame }>Reset</button>: null }
      </>
    )
  }

}


export default Grid;
