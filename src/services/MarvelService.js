class MarvelService {
  _apiBase = "https://gateway.marvel.com:443/v1/public/";
  _apiKey = "apikey=5db19af5902b50782ab4c7e56f69f287";

  getResourse = async (url) => {
    let res = await fetch(url);
    if (!res.ok) {
      throw new Error(`Could not fench ${url}, tatus: ${res.status}`);
    }
    return await res.json();
  };

  getAllCharacters = () => {
    return this.getResourse(
      `${this._apiBase}characters?limit=9&offset=210&${this._apiKey}`
    );
  };

  getCharacters = (id) => {
    return this.getResourse(`${this._apiBase}characters/${id}?${this._apiKey}`);
  };
}

export default MarvelService;
