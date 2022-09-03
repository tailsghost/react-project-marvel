import "./charList.scss";
import ErrorMessage from "../errorMessage/ErrorMessage";
import { Component } from "react";
import MarvelService from "../../services/MarvelService";
import Spinner from "../spinner/Spinner";

class CharList extends Component {
  state = {
    chars: {},
    loading: true,
    error: false,
  };

  componentDidMount() {
    this.upDateChars();
  }

  onError = () => {
    this.setState({
      loading: false,
      error: true,
    });
    console.log("Ошибка");
  };

  marverServerlist = new MarvelService();

  onCharsLoading = (chars) => {
    this.setState({
      chars,
      loading: false,
    });
  };

  upDateChars = () => {
    this.marverServerlist
      .getAllCharacters()
      .then(this.onCharsLoading)
      .catch(this.onError);
  };

  render() {
    const { chars, loading, error } = this.state;
    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = !(loading || error) ? (
      <Vier
        char={chars}
        key={chars.name}
      />
    ) : null;

    return (
      <div className="char__list">
        <ul className="char__grid">
          {errorMessage}
          {spinner}
          {content}
        </ul>
        <button className="button button__main button__long">
          <div className="inner">load more</div>
        </button>
      </div>
    );
  }
}

const Vier = ({ char }) => {
  return char.map((item) => {
    let containImg =
      item.thumbnail ===
      "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg"
        ? { objectFit: "fill" }
        : { objectFit: "cover" };
    return (
      <li className="char__item">
        <img
          src={item.thumbnail}
          alt="abyss"
          style={containImg}
        />
        <div className="char__name">{item.name}</div>
      </li>
    );
  });
};

export default CharList;
