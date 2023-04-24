import './index.css'
import { slice, useAppDispatch, useAppSelector } from '../../app/store';


export default function TicTacToe() {

    const state = useAppSelector((state) => state.ticTacToe)
    const dispatch = useAppDispatch()

    const gameState = () => {
        switch (state.winner) {
            case '?':
                return 'Aguardando jogada de ' + state.nextPlayer
            case 'O':
                return 'O venceu!'
            case 'X':
                return 'X venceu!'
            case '=':
                return 'Empate'
            default:
                break;
        }
    }

    return <>
        <div className='container'>
            <div>
                <h1>{gameState()}</h1>
            </div>

            <table className='table'>
                <tbody>
                    {state.board.map((row, l) =>
                        <tr key={l}>{row.map((td, c) =>
                            <td onClick={() => dispatch(slice.actions.play({l, c}))} key={c}>{td}</td>)}
                        </tr>)}
                </tbody>
            </table>
            <button onClick={() => dispatch(slice.actions.reset())}>Reiniciar</button>
        </div>
    </>
}