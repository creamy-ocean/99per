import { useEffect, useState } from "react";
import Banner from "./Banner";

const SearchForm = ({ tab, profileService, onGetProfiles, onFilter }) => {
  const [games, setGames] = useState([]);
  const [game, setGame] = useState({ type: "game", content: "메이플스토리" });
  const [min, setMin] = useState(20);
  const [max, setMax] = useState(35);
  const [selectedFilter, setSelectedFilter] = useState([]);
  const [isAlert, setIsAlert] = useState(false);
  const [text, setText] = useState("");

  const filters = {
    friends: [
      { type: "gender", title: "성별", contents: ["동성만"] },
      {
        type: "age",
        title: "나이",
        contents: [`${min}~${max}`],
      },
      {
        type: "level",
        title: "숙련도",
        contents: ["뉴비", "초보", "중수", "고수", "초고수"],
      },
      {
        type: "interest",
        title: "관심사",
        contents: ["꾸미기", "레벨링", "랭크/티어", "보스/레이드", "친목"],
      },
    ],
  };

  useEffect(() => {
    profileService
      .getGames()
      .then((games) => setGames(games))
      .catch(setError);
  }, []);

  const setError = (error) => {
    const errorMsg = error.toString();
    if (errorMsg.substr(0, 5) === "Error") {
      setText(errorMsg.substr(7));
    } else {
      setText(errorMsg);
    }
    setIsAlert(true);
    setTimeout(() => {
      setIsAlert(false);
    }, 5000);
  };

  const handleGame = (e) => {
    const { value } = e.target;
    setGame({ type: "game", content: value });
  };

  const handleCheck = (e, type, content) => {
    e.target.checked
      ? setSelectedFilter([...selectedFilter, { type, content }])
      : setSelectedFilter(
          selectedFilter.filter((filter) => {
            return filter.content !== content;
          })
        );
  };

  const handleAge = (e) => {
    const { name, value } = e.target;
    if (name === "min") {
      setMin(value);
    } else {
      setMax(value);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    onFilter([
      game,
      ...selectedFilter,
      { type: "age", content: `${min}~${max}` },
    ]);
  };

  const onReset = (e) => {
    e.preventDefault();
    setSelectedFilter([]);
    setMin(20);
    setMax(35);
    setGame({ type: "game", content: "메이플스토리" });
    document.getElementById("filters-form").reset();
    onGetProfiles();
  };

  return (
    <div className="filters">
      <form id="filters-form">
        <h3>게임</h3>
        <select onChange={handleGame}>
          {games.map((game) => {
            return (
              <option value={game.title} key={game.id}>
                {game.title}
              </option>
            );
          })}
        </select>
        <hr className="filters-line" />
        {filters[tab].map((filter, idx1) => {
          return (
            <div key={idx1}>
              <h3>{filter.title}</h3>
              <ul>
                {/* 나이의 경우에는 체크박스 노출되지 않도록 함 */}
                {!(filter.type === "age") ? (
                  filter.contents.map((content, idx2) => {
                    return (
                      <>
                        <li key={[idx1, idx2]}>
                          <div className="wrapper">
                            <input
                              type="checkbox"
                              id={content}
                              onChange={(e) =>
                                handleCheck(e, filter.type, content, idx2)
                              }
                            />
                            <label htmlFor={content}>{content}</label>
                          </div>
                        </li>
                      </>
                    );
                  })
                ) : (
                  <>
                    <li>
                      <input
                        type="number"
                        name="min"
                        value={min}
                        min="0"
                        max={max}
                        onChange={handleAge}
                      />
                      ~
                      <input
                        type="number"
                        name="max"
                        value={max}
                        min={min}
                        max="100"
                        onChange={handleAge}
                      />
                    </li>
                  </>
                )}
                <hr className="filters-line" />
              </ul>
            </div>
          );
        })}
        {text && <Banner text={text} isAlert={isAlert} transient={true} />}
        <div className="button_box">
          <button htmlFor="submit" onClick={onSubmit}>
            적용
          </button>
          <button htmlFor="button" onClick={onReset}>
            초기화
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchForm;
