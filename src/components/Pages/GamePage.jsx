import { useState, useCallback, useRef, useEffect } from "react";
import { Chessboard } from "react-chessboard";
import { Chess } from "chess.js";
import pc from "../../assets/Auth/images/logos/pc.png";
import think from "../../assets/Auth/images/logos/thinking.jpeg";
import "../../css/GamePage.css";
import ClipLoader from "../ClipLoader";

const GamePage = () => {
  const [game, setGame] = useState(new Chess());
  const [moveLog, setMoveLog] = useState([]);
  const [difficulty, setDifficulty] = useState("easy");
  const [isThinking, setIsThinking] = useState(false);

  const evaluateBoard = (game) => {
    const materialValues = {
      p: 100, // Pawn
      n: 320, // Knight
      b: 330, // Bishop
      r: 500, // Rook
      q: 900, // Queen
      k: 20000, // King
    };

    const positionalBonus = {
      p: [
        [0, 0, 0, 0, 0, 0, 0, 0],
        [50, 50, 50, 50, 50, 50, 50, 50],
        [10, 10, 20, 30, 30, 20, 10, 10],
        [5, 5, 10, 25, 25, 10, 5, 5],
        [0, 0, 0, 20, 20, 0, 0, 0],
        [5, -5, -10, 0, 0, -10, -5, 5],
        [5, 10, 10, -20, -20, 10, 10, 5],
        [0, 0, 0, 0, 0, 0, 0, 0],
      ],
    };

    const board = game.board();
    let evaluation = 0;

    for (let row = 0; row < board.length; row++) {
      for (let col = 0; col < board[row].length; col++) {
        const square = board[row][col];
        if (square) {
          const value = materialValues[square.type];
          const multiplier = square.color === "w" ? 1 : -1;

          // Material value
          evaluation += value * multiplier;

          // Positional bonus for pawns
          if (square.type === "p") {
            const posRow = square.color === "w" ? row : 7 - row;
            evaluation += positionalBonus.p[posRow][col] * multiplier;
          }
        }
      }
    }

    return game.turn() === "w" ? evaluation : -evaluation;
  };

  const getBestMoveWithMinimax = (depth) => {
    const alphabeta = (game, depth, alpha, beta, maximizingPlayer) => {
      if (depth === 0 || game.isGameOver()) {
        return evaluateBoard(game);
      }

      const moves = game.moves({ verbose: true });
      if (maximizingPlayer) {
        let maxEval = -Infinity;
        for (let move of moves) {
          game.move(move.san);
          const score = alphabeta(game, depth - 1, alpha, beta, false);
          game.undo();
          maxEval = Math.max(maxEval, score);
          alpha = Math.max(alpha, score);
          if (beta <= alpha) break; // Beta cut-off
        }
        return maxEval;
      } else {
        let minEval = Infinity;
        for (let move of moves) {
          game.move(move.san);
          const score = alphabeta(game, depth - 1, alpha, beta, true);
          game.undo();
          minEval = Math.min(minEval, score);
          beta = Math.min(beta, score);
          if (beta <= alpha) break; // Alpha cut-off
        }
        return minEval;
      }
    };

    const moves = game.moves({ verbose: true });
    let bestMove = null;
    let bestValue = -Infinity;

    for (let move of moves) {
      game.move(move.san);
      const moveValue = alphabeta(game, depth - 1, -Infinity, Infinity, false);
      game.undo();
      if (moveValue > bestValue) {
        bestValue = moveValue;
        bestMove = move.san;
      }
    }

    return bestMove;
  };

  const onDrop = useCallback(
    (sourceSquare, targetSquare) => {
      const piece = game.get(sourceSquare);
      if (piece && piece.color === "b") {
        // Eğer taş bilgisayara aitse, hamleyi engelle
        return false;
      }

      try {
        const move = game.move({
          from: sourceSquare,
          to: targetSquare,
          promotion: "q",
        });

        if (move) {
          setGame(new Chess(game.fen()));
          updateMoveLog(move.san, "Player");
          setTimeout(makeComputerMove, 500);
          return true;
        }
      } catch (error) {
        return false;
      }
      return false;
    },
    [game]
  );

  const makeComputerMove = () => {
    setIsThinking(true); // Bilgisayar düşünmeye başlıyor
    const possibleMoves = game.moves();

    if (possibleMoves.length === 0) {
      setIsThinking(false);
      return;
    }

    let move;
    if (difficulty === "easy") {
      const randomIndex = Math.floor(Math.random() * possibleMoves.length);
      move = possibleMoves[randomIndex];
    } else if (difficulty === "medium") {
      move = getBestMoveWithMinimax(2);
    } else if (difficulty === "hard") {
      move = getBestMoveWithMinimax(4);
    }

    setTimeout(() => {
      game.move(move);
      setGame(new Chess(game.fen()));
      updateMoveLog(move, "Computer");
      setIsThinking(false); // Bilgisayar hamlesini yaptı
    }, 1000); // Bilgisayarın düşünme süresi
  };

  const updateMoveLog = (move, player) => {
    setMoveLog((prev) => [...prev, `${player}: ${move}`]);
  };

  const resetGame = () => {
    setGame(new Chess());
    setMoveLog([]);
  };

  const getGameStatus = () => {
    if (game.isGameOver()) {
      if (game.isCheckmate()) return "Checkmate!";
      if (game.isDraw()) return "Draw!";
      if (game.isStalemate()) return "Stalemate!";
      return "Game Over!";
    }
    if (game.inCheck()) return "Check!";
    return `${game.turn() === "w" ? "White" : "Black"} to move`;
  };
  const [isLoading, setIsLoading] = useState(true);

  // Sayfa yüklendikten 1 saniye sonra isLoading'i false yap
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 700); // 1 saniye sonra isLoading'i false yap

    // Temizleme işlemi (unmount olduğunda zamanlayıcıyı temizle)
    return () => clearTimeout(timer);
  }, []); // Boş bağımlılık dizisi ile component mount olduğunda çalışır

  if (isLoading) {
    return (
      <div
        style={{
          textAlign: "center",
          padding: "20px",
        }}
      >
        <ClipLoader color="#4caf50" loading={true} size={50} />
        <div>Loading, please wait...</div>
      </div>
    );
  }
  return (
    <div className="game-page">
      <div className="chessboard-container">
        <div className="chessboard">
          <Chessboard
            position={game.fen()}
            onPieceDrop={onDrop}
            boardWidth={450}
            customBoardStyle={{
              borderRadius: "4px",
              boxShadow: "0 2px 10px rgba(0, 0, 0, 0.3)",
            }}
            customDarkSquareStyle={{ backgroundColor: "#779952" }}
            customLightSquareStyle={{ backgroundColor: "#edeed1" }}
          />
        </div>
        <div className="chess-btn-group">
          <div className="difficulty-buttons">
            <h3>Seviye Seçin</h3>
            <button
              onClick={() => setDifficulty("easy")}
              className={difficulty === "easy" ? "selected" : ""}
            >
              Easy
            </button>
            <button
              onClick={() => setDifficulty("medium")}
              className={difficulty === "medium" ? "selected" : ""}
            >
              Medium
            </button>
            <button
              onClick={() => setDifficulty("hard")}
              className={difficulty === "hard" ? "selected" : ""}
            >
              Hard
            </button>
          </div>
          <div style={{ width: "100%" }}>
            <button onClick={resetGame} className="reset-game-button">
              New Game
            </button>
          </div>{" "}
          <p className="game-status">{getGameStatus()}</p>
        </div>
        <div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <h2>
              Oyuncu vs
              <span
                style={{
                  marginLeft: "7px",
                  position: "relative",
                  width: "30px",
                  height: "30px",
                }}
              >
                <img
                  src={pc}
                  width={30}
                  alt="PC"
                  style={{
                    position: "absolute",
                    transition: "all 0.3s ease-in-out",
                    opacity: !isThinking ? 1 : 0,
                    transform: !isThinking ? "scale(1)" : "scale(0.5)",
                  }}
                />
                <img
                  src={think}
                  width={30}
                  alt="Thinking"
                  style={{
                    position: "absolute",
                    transition: "all 0.3s ease-in-out",
                    opacity: isThinking ? 1 : 0,
                    transform: isThinking ? "scale(1)" : "scale(0.5)",
                  }}
                />
              </span>
            </h2>
          </div>
          <div className="move-log-container">
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontStyle: "italic",
              }}
            >
              Move Log
            </div>
            <div>
              {moveLog.map((log, index) => (
                <p key={index}>{log}</p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GamePage;
