import { Injectable, BadRequestException, InternalServerErrorException } from '@nestjs/common';  
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { PokemonResponse } from './interfaces/pokemon-response.interfaces';
import { CreatePokemonDto } from 'src/pokemon/dto/create-pokemon.dto';
import { AxiosAdapter } from 'src/common/adapters/axios..adapter';

@Injectable()
export class SeedService {  
  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,

    private readonly http: AxiosAdapter
  ){}
  async executeSeed() {
    await this.pokemonModel.deleteMany({});
    const  data  = await this.http.get<PokemonResponse>('https://pokeapi.co/api/v2/pokemon?limit=300');
    let pokemons: CreatePokemonDto[] =[];
    data.results.forEach(({name, url})=>{
      const segments = url.split('/');
      const no = +segments[segments.length - 2]; 
      pokemons.push({name, no});
    }); 
    try {
      const results = await this.pokemonModel.insertMany(pokemons)
      return results;
    } catch (error) {
      if(error.code === 11000){ 
        throw new BadRequestException(`Pokemon exists in database ${JSON.stringify(error.keyValue)}`);
      }
      console.log(error);
      throw new InternalServerErrorException(`Can't create pokemon, Check server logs`);
    }
    
  } 
}
