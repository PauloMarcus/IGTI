import { PayloadAction, Action, configureStore, createSlice } from "@reduxjs/toolkit";
import { useDispatch, TypedUseSelectorHook, useSelector } from "react-redux";

type CellValue = "X" | "O" | "";
type winner = "X" | "O" | "?" | "=";

interface TicTacToeState {
  winner: winner,
  board: CellValue[][],
  nextPlayer: "X" | "O"
}

const TicTacToeStart: TicTacToeState = {
  winner: '?',
  board: [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']

  ],
  nextPlayer: 'X'
}

function win(board: CellValue[][]): winner {
  const players: ("X" | "O")[] = ['X', 'O']
  for (const p of players) {
    for (let i = 0; i < 3; i++) {
      // verifica ganhadores analisando na horizontal
      if (board[i][0] === p && board[i][1] === p && board[i][2] === p) {
        return p
      }
      // verifica ganhadores analisando na vertical
      if (board[0][i] === p && board[1][i] === p && board[2][i] === p) {
        return p
      }
      // verifica ganhadores analisando na diagonal
      if (board[0][0] === p && board[1][1] === p && board[2][2] === p) {
        return p
      }
      // verifica ganhadores analisando na diagonal oposta
      if (board[0][2] === p && board[1][1] === p && board[2][0] === p) {
        return p
      }
    }
  }
  // verifica se o tabuleiro ainda possui células livres
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[i][j] === '') {
        return '?'
      }
    }
  }
  // caso não passe na validação de vencedor ou de células livres, retorna empate
  return '='
}

type ActionPlay = PayloadAction<{ l: number, c: number }>

type ActionReset = Action<'reset'>

export const slice = createSlice({
  name: 'ticTacToe',
  initialState: TicTacToeStart,
  reducers: {
    play: (state, action: ActionPlay) => {
      //usando este serviço não é necessário criar uma cópia do array, pois é possível manipular o state do objeto diretamente

      const { c, l } = action.payload
      // impede a jogada em uma célula já preenchida e verifica se o estado do jogo ainda esta como indefinido (?)
      if (state.board[l][c] !== '' || win(state.board) !== '?') {
        return state
      }
      const nextPlayer = state.nextPlayer

      // coloca a marcação do jogador atual na célula selecionada
      state.board[l][c] = nextPlayer
      state.winner = win(state.board)
      state.nextPlayer =  state.nextPlayer === 'O' ? 'X' : 'O'
    },
    reset: () => {
      return TicTacToeStart
    }
  }
})

function TicTacToeReducer(state = TicTacToeStart, action: ActionReset | ActionPlay): TicTacToeState {
  switch (action.type) {
    case 'play':
      const { c, l } = action.payload
      // impede a jogada em uma célula já preenchida e verifica se o estado do jogo ainda esta como indefinido (?)
      if (state.board[l][c] !== '' || win(state.board) !== '?') {
        return state
      }
      
      const nextPlayer = state.nextPlayer
      // faz uma cópia do array existente, não é permitido fazer um ajuste direto em state
      const newState = state.board.map(row => row.map(cell => cell))

      // coloca a marcação do jogador atual na célula selecionada
      newState[l][c] = nextPlayer

      return {
        winner: win(newState),
        nextPlayer: state.nextPlayer === 'O' ? 'X' : 'O',
        board: newState
      }
    case 'reset':
      return TicTacToeStart
    default:
      return state
  }
}

export const store = configureStore({
  reducer: {
    ticTacToe: slice.reducer
  }
})

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
