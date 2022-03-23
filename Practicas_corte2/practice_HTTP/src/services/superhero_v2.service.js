const SuperheroModel = require('../models/superhero_v2.model');

class SuperheroService {
  /* Promesas y funciones asincronicas
  Una funcion asincronica devuelve una promesa
  JS es un lenguaje subproceso (que solo ejecuta un hilo) -> solo hace una cosa a la vez */
  async createSuperhero(superheroV2) {
    superheroV2.save();
    return superheroV2;
  }
  async listSuperheroes() {
    return SuperheroModel.find();
  }
  async showSuperhero(superheroId) {
    return SuperheroModel.findById({ _id: superheroId });
  }
  async editSuperhero(superheroId, superhero, realname, superpower) {
    return SuperheroModel.findByIdAndUpdate({ _id: superheroId }, {superhero, realname, superpower}).then(
      (superheroFind) => {
        if (!superheroFind) throw Error('No se encontró el superheroe');
      }
    );
  }
  async removeSuperhero(superheroId) {
    const superhero_remove = SuperheroModel.findById({ _id: superheroId });
    return SuperheroModel.deleteOne(superhero_remove);
  }
}

module.exports = SuperheroService;
