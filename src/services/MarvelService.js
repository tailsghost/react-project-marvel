class MarvelService {
  _apiBase = "https://gateway.marvel.com:443/v1/public/";
  _apiKey = "apikey=5db19af5902b50782ab4c7e56f69f287";
  _randomOffset = Math.floor(Math.random() * 1500);

  getResourse = async (url) => {
    let res = await fetch(url);
    if (!res.ok) {
      throw new Error(`Could not fench ${url}, tatus: ${res.status}`);
    }
    return await res.json();
  };

  getAllCharacters = async () => {
    const res = await this.getResourse(
      `${this._apiBase}characters?limit=9&offset=${this._randomOffset}&${this._apiKey}`
    );
    return res.data.results.map(this._transformCharacter);
  };

  getCharacters = async (id) => {
    const res = await this.getResourse(
      `${this._apiBase}characters/${id}?${this._apiKey}`
    );
    return this._transformCharacter(res.data.results[0]);
  };

  maxLengthDescription = (des) => {
    const lengthDescription = des.slice(0, 100);
    if (lengthDescription.length > des.length) {
      return des;
    } else {
      return lengthDescription + "...";
    }
  };

  _transformCharacter = (char) => {
    return {
      id: char.id,
      name: char.name,
      description: char.description
        ? this.maxLengthDescription(char.description)
        : `У данного персонажа нет описания`,
      thumbnail: char.thumbnail.path + "." + char.thumbnail.extension,
      homepage: char.urls[0].url,
      wiki: char.urls[1].url,
      comics: char.comics.items,
    };
  };
}

export default MarvelService;
