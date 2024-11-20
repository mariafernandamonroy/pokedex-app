import { Component, OnInit, signal } from '@angular/core';
import { PokeService } from '../../services/poke.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css'],
  imports: [CommonModule, FormsModule, RouterModule],
  standalone: true,
})
export class PokemonListComponent implements OnInit {
  pokemonList = signal<any[]>([]);
  searchQuery = '';
  offset: number = 0;
  limit: number = 20;
  totalCount: number = 0;
  totalPages: number = 0;
  currentPage: number = 1;

  constructor(protected pokeService: PokeService) {}

  ngOnInit(): void {
    this.loadPokemon();
  }

  protected getRouterLink(name: string): string {
    return `/pokemon/${name}`;
  }

  // loadPokemon(): void {
  //   this.pokeService.getPokemonList(this.offset, this.limit).subscribe({
  //     next: (data) => {
  //       this.pokemonList.set([...this.pokemonList(), ...data.results]);

  //       this.offset += this.limit;
  //     },
  //     error: (err) => console.error('Failed to load Pokémon', err),
  //   });
  // }

  loadPokemon(): void {
    this.pokeService.getPokemonList(this.offset, this.limit).subscribe({
      next: (data) => {
        this.totalCount = data.count;
        this.totalPages = Math.ceil(this.totalCount / this.limit);
        this.pokemonList.set(data.results);
      },
      error: (err) => console.error('Failed to load Pokémon', err),
    });
  }

  loadMorePokemons(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.offset = this.limit * (this.currentPage - 1);
      this.loadPokemon();
    }
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.offset = this.limit * (page - 1);
      this.loadPokemon();
    }
  }

  public getFavs() {
    const favs = localStorage.getItem('favorites');
    if (!favs) return [];
    return JSON.parse(favs);
  }

  searchPokemon(): void {
    if (this.searchQuery.trim()) {
      this.pokeService
        .getPokemonDetails(this.searchQuery.toLowerCase())
        .subscribe({
          next: (pokemon) => {
            this.pokemonList.set([pokemon]);
          },
          error: (err) => console.error('Failed to search Pokémon', err),
        });
    }
  }

  deleteFavorites(): void {
    this.pokeService.deleteFavorites();
  }

  deleteFavorite(pokemon:any) :void {
    this.pokeService.deleteFromFavorites(pokemon);
  }
}
