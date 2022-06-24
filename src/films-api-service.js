import ApiService from './framework/api-service.js';

const Method = {
  GET: 'GET',
  PUT: 'PUT',
  POST: 'POST',
  DELETE: 'DELETE',
};

export default class FilmsApiService extends ApiService {
  get films() {
    return this._load({url: 'movies'})
      .then(ApiService.parseResponse);
  }

  updateFilm = async (movie) => {
    const updated = this.#adaptToServer(movie);
    const response = await this._load({
      url: `movies/${movie.id}`,
      method: Method.PUT,
      body: JSON.stringify(updated),
      headers: new Headers({'Content-Type': 'application/json'}),
    });

    const parsedResponse = await ApiService.parseResponse(response);

    return parsedResponse;
  };

  getComments(id) {
    return this._load({url: `comments/${id}`})
      .then(ApiService.parseResponse);
  }

  addComment = async (data, id)=>{
    const response = await this._load({
      url: `comments/${id}`,
      method: Method.POST,
      body: JSON.stringify(data),
      headers: new Headers({'Content-Type': 'application/json'}),
    });
    const parsedResponse = await ApiService.parseResponse(response);

    return parsedResponse;
  };

  deleteComment = async (id) =>{
    const response = await this._load({
      url: `comments/${id}`,
      method: Method.DELETE,
    });

    return response;
  };

  #adaptToServer = (film) => {
    const adaptedFilm = {...film,
      'film_info': film['filmInfo'],
      'user_details': film['userDetails']
    };

    adaptedFilm['film_info']['alternative_title'] = film.filmInfo.alternativeTitle;
    adaptedFilm['film_info']['age_rating'] = film.filmInfo.ageRating;
    adaptedFilm['film_info']['total_rating'] = film.filmInfo.totalRating;
    adaptedFilm['film_info']['release']['release_country'] = film.filmInfo.release.releaseCountry;
    adaptedFilm['user_details']['already_watched'] = film.userDetails.alreadyWatched;
    adaptedFilm['user_details']['watching_date'] = film.userDetails.watchingDate;

    delete adaptedFilm['filmInfo'];
    delete adaptedFilm['film_info']['alternativeTitle'];
    delete adaptedFilm['film_info']['ageRating'];
    delete adaptedFilm['film_info']['totalRating'];
    delete adaptedFilm['film_info']['release']['releaseCountry'];
    delete adaptedFilm['userDetails'];
    delete adaptedFilm['user_details']['alreadyWatched'];
    delete adaptedFilm['user_details']['watchingDate'];
    return adaptedFilm;
  };
}
